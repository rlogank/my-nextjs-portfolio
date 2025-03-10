"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative z-10 mb-12" id="hero">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center px-4">
        <h2 className="mx-auto mb-7 max-w-[666px] text-center text-4xl font-bold sm:text-6xl lg:text-7xl">
          Web developer,<br/> software engineer,<br/> AI API Builder.
        </h2>
        <p className="mx-auto mb-7 max-w-2xl text-center text-lg">
          With 15+ years of experience, I am a passionate full-stack web
          developer specializing in making clean, performant applications with
          modern frameworks and libraries.
        </p>
        <div className="flex gap-2">
          <Link href="mailto:rlogank@icloud.com">
            <Button className="mx-auto">Contact me</Button>
          </Link>
          <a href="logan-keene-resume.pdf" target="_blank" rel="noreferrer">
            <Button variant="ghost" className="mx-auto hover:bg-transparent">
              See my resume <FaArrowRight className="!w-3" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
