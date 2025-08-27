"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, School, CalendarDays, FileSearch, BookOpen, Headphones, Landmark, CheckCircle2, ChevronRight, MessageCircle, Phone } from "lucide-react";
import { SignIn } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StudentPortalHomepage() {
  const [appId, setAppId] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [role, setRole] = useState("applicant");

  const handleCheckStatus = async () => {
    if (!appId.trim()) return setStatus("Please enter an Application ID");
    setStatus("Checking...");
    setTimeout(() => {
      setStatus(appId === "12345" ? "✅ Accepted" : "⏳ Under Review");
    }, 600);
  };
/**
 * NEXT STEPS (images):
 * Put your real school images in /public/images and keep the same names used below,
 * or change the "src" values to your own file names/URLs.
 * - /public/images/hero.jpg            (campus or students hero)
 * - /public/images/stats-1.jpg         (classroom)
 * - /public/images/stats-2.jpg         (graduation)
 * - /public/images/stats-3.jpg         (partners/event)
 * - /public/images/stats-4.jpg         (admission desk)
 * - /public/images/prog-it.jpg         (IT Lab)
 * - /public/images/prog-biz.jpg        (Business class)
 * - /public/images/prog-arts.jpg       (Arts studio)
 * - /public/images/prog-eng.jpg        (Engineering workshop)
 * - /public/images/roadmap-1.jpg       (admission)
 * - /public/images/roadmap-2.jpg       (orientation)
 * - /public/images/roadmap-3.jpg       (graduation)
 * - /public/images/roadmap-4.jpg       (career)
 * - /public/images/testimonial-1.jpg   (alumni 1)
 * - /public/images/testimonial-2.jpg   (alumni 2)
 * - /public/images/testimonial-3.jpg   (alumni 3)
 * - /public/images/event-1.jpg         (notice/event 1)
 * - /public/images/event-2.jpg         (notice/event 2)
 * - /public/images/event-3.jpg         (notice/event 3)
 */
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-whitebeacon /80 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="School Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-lg">Beacon House School</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#programs" className="hover:text-indigo-600">Programs</a>
            <a href="#roadmap" className="hover:text-indigo-600">Journey</a>
            <a href="#portfolio" className="hover:text-indigo-600">Success</a>
            <a href="#admission" className="hover:text-indigo-600">Admissions</a>
            <a href="#events" className="hover:text-indigo-600">Events</a>

            <Button size="sm">Apply Now</Button>
          </div>
        </div>
      </nav>

      {/* HERO with IMAGE BACKGROUND */}
      <section className="bg-white">
  <div className="mx-auto max-w-7xl px-4 py-24 md:py-32">
    <div className="flex flex-col md:flex-row items-center gap-12">
      {/* Left side: Text Content */}
      <div className="md:w-1/2">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
          Transform Your School Into a Digital‑First Institution
        </h1>
        <p className="mt-4 max-w-2xl text-lg/7 text-gray-600">
          Showcase real success, simplify admissions, and guide every student from application to career—on one platform.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {/* Ensure you have a valid Button component here */}
          {/* <Button size="lg" className="shadow">Check Eligibility</Button>
          <Button size="lg" variant="secondary">Explore Programs</Button> */}
        </div>
      </div>
      {/* Right side: Image */}
      <div className="relative md:w-1/2 h-80 md:h-[400px] w-full mt-8 md:mt-0">
        <Image
          src="/images/hero.jpg"
          alt="Hero Image"
          fill
          priority
          className="object-cover rounded-lg shadow-lg"
        />
      </div>
      </div>


          {/* Inline status checker */}
          <div id="admission" className="mt-10 w-full max-w-lg rounded-2xl bg-white/95 p-4 text-gray-900 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <FileSearch className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold">Admission Status</h3>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Enter Application ID (e.g., 12345)" value={appId} onChange={(e)=>setAppId(e.target.value)} />
              <Button onClick={handleCheckStatus}>Check</Button>
            </div>
            {status && <p className="mt-2 text-sm font-medium">Status: {status}</p>}
          </div>
        </div>
      </section>

      {/* TRUST STATS — IMAGE TILES */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold">Trusted by Students, Backed by Results</h2>
        <p className="text-center text-gray-600 mt-2">Real outcomes, powered by modern admissions.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            {img:"/images/stats-1.jpeg", label:"Students Enrolled", value:"10,000+"},
            {img:"/images/stats-2.jpeg", label:"Growth in Admissions", value:"65%"},
            {img:"/images/stats-3.jpeg", label:"Academic Partners", value:"25+"},
            {img:"/images/stats-4.jpeg", label:"Less Processing Time", value:"80%"},
          ].map((s)=> (
            <div key={s.label} className="relative overflow-hidden rounded-2xl shadow group">
              <Image src={s.img} alt={s.label} width={800} height={600} className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <div className="text-2xl font-extrabold">{s.value}</div>
                <div className="text-sm opacity-90">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SPLIT with IMAGE */}
      <section className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-bold mb-3">Who We Are</h3>
          <p className="text-gray-600">We help schools showcase strengths online and streamline admissions. A modern blend of design, automation, and accessible guidance—built for students, parents, and staff alike.</p>
          <Button className="mt-6">Uncover More</Button>
        </div>
        <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden">
          <Image src="/images/stats-1.jpeg" alt="Classroom" fill className="object-cover" />
        </div>
      </section>

      {/* PROGRAMS with IMAGE CARDS */}
      <section id="programs" className="bg-gray-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h3 className="text-center text-3xl font-extrabold">Your Pathway to Success</h3>
          <p className="text-center text-gray-600 mt-1">Choose from career‑focused programs designed to guide you step by step.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {[
              { title: "Information Technology", img: "/images/prog-it.jpeg" },
              { title: "Business & Management", img: "/images/prog-biz.jpeg" },
              { title: "Creative Arts", img: "/images/prog-arts.jpeg" },
              { title: "Engineering & Technology", img: "/images/prog-eng.jpeg" },
            ].map((p) => (
              <Card key={p.title} className="rounded-3xl overflow-hidden border-0 shadow">
                <div className="relative h-48">
                  <Image src={p.img} alt={p.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button size="sm" className="w-full">View Roadmap</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP with IMAGE ICONS */}
      <section id="roadmap" className="mx-auto max-w-7xl px-4 py-14">
        <h3 className="text-center text-3xl font-extrabold">Your Journey</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {[
            { title: "Admission", img: "/images/roadmap-1.jpeg" },
            { title: "Orientation", img: "/images/roadmap-2.jpeg" },
            { title: "Graduation", img: "/images/roadmap-3.jpeg" },
            { title: "Career", img: "/images/roadmap-4.png" },
          ].map((r) => (
            <div key={r.title} className="rounded-2xl overflow-hidden shadow border">
              <div className="relative h-40">
                <Image src={r.img} alt={r.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white font-semibold">{r.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUCCESS STORIES / TESTIMONIALS */}
      <section id="portfolio" className="bg-gray-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h3 className="text-center text-3xl font-extrabold">Alumni Success</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { name: "Aimen Khan", role: "Software Engineer", img: "/images/testimonial-1.jpeg" },
              { name: "Hassan Ali", role: "Product Manager", img: "/images/testimonial-2.jpeg" },
              { name: "Sara Iqbal", role: "UI/UX Designer", img: "/images/testimonial-3.jpeg" },
            ].map((t) => (
              <Card key={t.name} className="rounded-3xl overflow-hidden">
                <CardContent className="p-6 flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={t.img} alt={t.name} />
                    <AvatarFallback>{t.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-gray-600">{t.role}</div>
                    <p className="text-sm mt-2">“This school shaped my journey and set me up for success.”</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS & UPDATES with IMAGE CARDS */}
      <section id="events" className="mx-auto max-w-7xl px-4 py-14">
        <h3 className="text-center text-3xl font-extrabold">News & Updates</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { title: "Admission Deadline: 30 Sept", img: "/images/event-1.jpeg" },
            { title: "Orientation Week: 5 Oct", img: "/images/event-2.jpeg" },
            { title: "Sports Day: 15 Oct", img: "/images/event-3.jpeg" },
          ].map((e) => (
            <div key={e.title} className="rounded-3xl overflow-hidden shadow border">
              <div className="relative h-48">
                <Image src={e.img} alt={e.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white font-semibold">{e.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SCHOLARSHIP + SUPPORT */}
      <section className="bg-indigo-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Scholarship Eligibility Quiz</h3>
            <p className="text-white/90 mt-1">Find out if you qualify in under 60 seconds.</p>
          </div>
          <div className="flex md:justify-end gap-3">
            <Button className="bg-white text-indigo-600 hover:bg-white/90">
              View Criteria
            </Button>
            <Button className="bg-white text-indigo-600 hover:bg-white/90">Start Quiz</Button>
            <Button className="bg-white text-indigo-600 hover:bg-white/90">Download Guide</Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-semibold"><School className="h-5 w-5"/>Beacon House School</div>
            <p className="text-sm mt-2 text-gray-400">A digital growth platform for schools—portfolio + admissions + guidance.</p>
          </div>
          <div>
            <div className="font-semibold mb-2">Quick Links</div>
            <ul className="space-y-1 text-sm text-gray-400">
              <li><a href="#programs" className="hover:text-white">Programs</a></li>
              <li><a href="#admission" className="hover:text-white">Admissions</a></li>
              <li><a href="#events" className="hover:text-white">Events</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Support</div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="gap-2"><MessageCircle className="h-4 w-4"/>WhatsApp</Button>
              <Button variant="secondary" size="sm" className="gap-2"><Phone className="h-4 w-4"/>Call</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">© 2025 Champion School. All rights reserved.</div>
      </footer>
    </div>
  );
}
