"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Role = "admin" | "subadmin1" | "subadmin2";

type User = {
  id: string;
  name: string;
  role: Role;
  avatar?: string | null;
};

type Message = {
  id: string;
  threadId: string;
  from: User;
  to: User[];
  body: string;
  createdAt: string;
};

type Thread = {
  id: string;
  subject: string;
  participants: string[];
  lastMessageAt: string;
  status: "open" | "closed";
  assignedTo?: string | null;
  snippet?: string;
};

const mockUsers: Record<string, User> = {
  admin: { id: "admin", name: "School Admin", role: "admin" },
  sub1: { id: "sub1", name: "Admission Handler", role: "subadmin1" },
  sub2: { id: "sub2", name: "Portfolio Handler", role: "subadmin2" },
};

const nowISO = () => new Date().toISOString();

const mockThreads: Thread[] = [
  {
    id: "t1",
    subject: "New student admission query",
    participants: ["sub1", "admin"],
    lastMessageAt: nowISO(),
    status: "open",
    assignedTo: "sub1",
    snippet: "Parent asking about admission for Grade 5...",
  },
  {
    id: "t2",
    subject: "Portfolio update required",
    participants: ["sub2", "admin"],
    lastMessageAt: nowISO(),
    status: "open",
    assignedTo: "sub2",
    snippet: "Please update last semester achievements...",
  },
];

const mockMessages: Message[] = [
  {
    id: "m1",
    threadId: "t1",
    from: mockUsers["sub1"],
    to: [mockUsers["admin"]],
    body: "A parent is asking for admission details for Grade 5. Please advise.",
    createdAt: nowISO(),
  },
  {
    id: "m2",
    threadId: "t2",
    from: mockUsers["sub2"],
    to: [mockUsers["admin"]],
    body: "Portfolio needs updating with new student achievements.",
    createdAt: nowISO(),
  },
];

function pretendNetworkDelay(ms = 250) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchThreads(): Promise<Thread[]> {
  await pretendNetworkDelay();
  return [...mockThreads].sort((a, b) =>
    a.lastMessageAt < b.lastMessageAt ? 1 : -1
  );
}

async function fetchMessages(threadId: string): Promise<Message[]> {
  await pretendNetworkDelay();
  return mockMessages.filter((m) => m.threadId === threadId);
}

async function apiSendMessage(
  threadId: string | null,
  from: User,
  to: User[],
  subject: string | null,
  body: string,
  assignedTo?: string
) {
  await pretendNetworkDelay(200);
  if (!threadId) {
    const newThread: Thread = {
      id: `t${Math.random().toString(36).slice(2, 9)}`,
      subject: subject || body.slice(0, 40) || "(no subject)",
      participants: [from.id, ...to.map((u) => u.id)],
      lastMessageAt: new Date().toISOString(),
      status: "open",
      assignedTo: assignedTo ?? null,
      snippet: body.slice(0, 140),
    };
    mockThreads.unshift(newThread);
    const newMessage: Message = {
      id: `m${Math.random().toString(36).slice(2, 9)}`,
      threadId: newThread.id,
      from,
      to,
      body,
      createdAt: new Date().toISOString(),
    };
    mockMessages.push(newMessage);
    return { thread: newThread, message: newMessage };
  } else {
    const newMessage: Message = {
      id: `m${Math.random().toString(36).slice(2, 9)}`,
      threadId,
      from,
      to,
      body,
      createdAt: new Date().toISOString(),
    };
    mockMessages.push(newMessage);

    const thread = mockThreads.find((t) => t.id === threadId);
    if (thread) {
      thread.lastMessageAt = newMessage.createdAt;
      thread.snippet = body.slice(0, 140);
    }

    return { thread, message: newMessage };
  }
}

export default function TaskManagementPage({ role = "admin" as Role } = {}) {
  const [currentUser] = useState<User>(mockUsers["admin"]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingThreads, setLoadingThreads] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const [newSubject, setNewSubject] = useState("");
  const [newBody, setNewBody] = useState("");
  const [assignedTo, setAssignedTo] = useState<string>("sub1");
  const [replyBody, setReplyBody] = useState("");
  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadingThreads(true);
      const data = await fetchThreads();
      setThreads(data);
      setLoadingThreads(false);
    })();
  }, []);

  async function openThread(thread: Thread) {
    setSelectedThread(thread);
    setLoadingMessages(true);
    const msgs = await fetchMessages(thread.id);
    setMessages(msgs);
    setLoadingMessages(false);
  }

  async function handleCreateThread() {
    const userToAssign = mockUsers[assignedTo];
    const res = await apiSendMessage(
      null,
      currentUser,
      [userToAssign],
      newSubject,
      newBody,
      assignedTo
    );

    if (res?.thread) {
      setThreads((prev: Thread[]) => {
        const exists = prev.find((t) => t.id === res.thread!.id);
        if (exists) {
          return prev.map((thread) =>
            thread.id === res.thread!.id ? { ...thread, ...res.thread! } : thread
          );
        } else {
          return [...prev, res.thread!];
        }
      });
    }

    // reset modal inputs
    setNewSubject("");
    setNewBody("");
    setAssignedTo("sub1");
    setIsNewThreadOpen(false);
  }

  async function handleReply() {
    if (!selectedThread) return;
    const recipients = selectedThread.participants
      .filter((pid: string) => pid !== currentUser.id)
      .map((id: string) => mockUsers[id]);

    const res = await apiSendMessage(
      selectedThread.id,
      currentUser,
      recipients,
      null,
      replyBody
    );

    if (res?.message) {
      setMessages((prev: Message[]) => [...prev, res.message!]);
      setReplyBody("");
    }
  }

  return (
    <div className="flex flex-col h-[90vh]">
      {/* TOP NAVBAR */}
      <header className="relative rounded-xl p-4 shadow-md overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5 dark:from-blue-600/10 dark:to-blue-600/10 blur-xl" />
        <div className="relative flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Task Management</h1>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 border rounded-lg shadow-md overflow-hidden mt-2">
        {/* LEFT: Thread List (Inbox) */}
        <div className="w-1/3 border-r bg-gray-50">
          <div className="p-4 flex justify-between items-center">
            <h2 className="font-bold text-lg text-blue-600">Admin Inbox</h2>
            <Dialog open={isNewThreadOpen} onOpenChange={setIsNewThreadOpen}>
              <DialogTrigger asChild>
                <Button className="bg-indigo-600 text-white">New</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Task Subject"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                  />
                  <Textarea
                    placeholder="Task Description"
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                  />
                  <Select
                    onValueChange={(val) => setAssignedTo(val)}
                    defaultValue="sub1"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Assign to role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sub1">Admission Handler</SelectItem>
                      <SelectItem value="sub2">Portfolio Handler</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleCreateThread}
                    className="bg-green-600 text-white"
                  >
                    Create
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="overflow-y-auto h-full">
            {loadingThreads ? (
              <p className="p-4">Loading...</p>
            ) : (
              threads.map((t) => (
                <div
                  key={t.id}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-100 ${
                    selectedThread?.id === t.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => openThread(t)}
                >
                  <div className="font-semibold">{t.subject}</div>
                  <div className="text-xs text-gray-500">{t.snippet}</div>
                  <div className="text-xs text-gray-400">{t.status}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT: Message Panel */}
        <div className="flex-1 flex flex-col">
          {selectedThread ? (
            <>
              <div className="p-4 border-b">
                <h2 className="font-bold text-lg">{selectedThread.subject}</h2>
                <p className="text-sm text-gray-500">
                  Assigned to:{" "}
                  {selectedThread.assignedTo
                    ? mockUsers[selectedThread.assignedTo]?.name
                    : "Unassigned"}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
                {loadingMessages ? (
                  <p>Loading messages...</p>
                ) : (
                  messages.map((m) => (
                    <div key={m.id} className="border rounded-md p-2">
                      <div className="font-semibold">{m.from.name}</div>
                      <div>{m.body}</div>
                      <div className="text-xs text-gray-400">{m.createdAt}</div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-4 border-t flex gap-2">
                <Textarea
                  placeholder="Type your reply..."
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                />
                <Button onClick={handleReply} className="bg-blue-600 text-white">
                  Send
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a thread to view messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
