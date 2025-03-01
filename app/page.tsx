"use client";

import Projects from "@/components/home/projects";
import Hero from "@/components/home/hero";
import Skills from "@/components/home/skills";
import Testimonials from "@/components/home/testimonials";
import Contact from "@/components/home/contact";
import dynamic from "next/dynamic";

const Orbs = dynamic(() => import("@/components/orbs"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Orbs />
      <Hero />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
  );
}
