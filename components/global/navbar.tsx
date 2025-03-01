"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme/theme-toggle";
import Logo from "../logo";
import { navLinks } from "@/lib/constants";

const Navbar = () => {
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50">
        <div className="bg-background p-4 transition-all duration-500">
          <div className="mx-auto flex max-w-screen-xl items-center justify-between">
            <Logo />
            <div className="flex gap-1">
              <div className="hidden gap-1 lg:flex">
                {navLinks.quickLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.name}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                  >
                    <Button variant="ghost">{link.name}</Button>
                  </Link>
                ))}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[76px]" />
    </>
  );
};

export default Navbar;
