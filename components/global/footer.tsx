"use client";

import { navLinks } from "@/lib/constants";
import Logo from "../logo";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pb-24">
      <div className="grid justify-between gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 lg:max-w-sm">
          <Logo />
          <p className="mt-3 max-w-lg">
            With 15+ years of experience, I am a passionate full-stack web
            developer specializing in making clean, performant applications with
            modern frameworks and libraries.
          </p>
        </div>
        {Object.keys(navLinks).map((key) => (
          <div key={key}>
            <h2 className="mb-3 font-bold">
              {key === "quickLinks" ? "Quick Links" : "Socials"}
            </h2>
            {key === "quickLinks" ? (
              <ul>
                {navLinks[key as keyof typeof navLinks].map((link) => (
                  <li key={link.name} className="mb-1">
                    {link.href.startsWith("#") ? (
                      <a
                        href={link.href}
                        onClick={(e) =>
                          handleSmoothScroll(e, link.href.slice(1))
                        }
                      >
                        {"icon" in link ? link.icon : link.name}
                      </a>
                    ) : (
                      <Link href={link.href} aria-label={link.name}>
                        {"icon" in link ? link.icon : link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex gap-4 text-lg">
                {navLinks[key as keyof typeof navLinks].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    {"icon" in link ? link.icon : link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <div>
          <h3 className="mb-3 font-bold">Information</h3>
          <FaLocationDot className="mr-2 inline-block" /> Florida, United States
        </div>
      </div>
    </section>
  );
};

export default Footer;
