"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { SiX } from "react-icons/si";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();
  const [, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const socialLinks = [
    {
      name: "GitHub",
      link: "https://github.com/rlogank",
      icon: <FaGithub />,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/rlogank/",
      icon: <FaLinkedin />,
    },
    {
      name: "X",
      link: "https://x.com/rlogank",
      icon: <SiX />,
    },
    {
      name: "Email",
      link: "mailto:rlogank@icloud.com",
      icon: <FaEnvelope />,
    },
  ];

  interface ContactFormData {
    name: string;
    email: string;
    message: string;
  }

  const sendEmail = async (data: ContactFormData) => {
    try {
      setSubmitStatus("loading");

      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to send message");
      }

      setSubmitStatus("success");
      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible.",
      });
      reset();
    } catch (error: unknown) {
      setSubmitStatus("error");
      let errorMessage = "An error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(`Error: ${errorMessage}`);
      console.error(error);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex items-center"
    >
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="lg:w-1/2">
            <h2 className="mb-3 text-3xl font-bold tracking-tight lg:text-4xl">
              {"Let's talk"}
            </h2>
            <p className="text-sm opacity-60 lg:text-base">
              My inbox is always open. Whether you have a question or just want
              to say hi, I will get back to you!
            </p>
            <div className="mt-6 flex gap-2.5">
              {socialLinks.map((socialLink) => {
                return (
                  <Link
                    key={socialLink.link}
                    href={socialLink.link}
                    target="_blank"
                    aria-label={socialLink.name}
                  >
                    <Button
                      variant="secondary"
                      size="icon"
                      aria-label={socialLink.name}
                    >
                      {socialLink.icon}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <form autoComplete="off" onSubmit={handleSubmit(sendEmail)}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex w-full flex-col gap-1 lg:w-1/2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium opacity-75"
                  >
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    autoComplete="new-password"
                    {...register("name", { required: true })}
                    className={`w-full ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <span className="text-red-500">Name is required</span>
                  )}
                </div>
                <div className="flex w-full flex-col gap-1 lg:w-1/2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium opacity-75"
                  >
                    Email
                  </Label>
                  <Input
                    autoComplete="new-password"
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                    id="email"
                    className={`w-full ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <span className="text-red-500">
                      {errors.email.type === "required"
                        ? "Email is required"
                        : "Invalid email address"}
                    </span>
                  )}
                </div>
              </div>
              <div className="my-5 flex flex-col gap-1">
                <Label
                  htmlFor="message"
                  className="text-sm font-medium opacity-75"
                >
                  Message
                </Label>
                <Textarea
                  autoComplete="new-password"
                  id="message"
                  {...register("message", { required: true })}
                  className={`w-full resize-none ${errors.message ? "border-red-500" : ""}`}
                  rows={5}
                />
                {errors.message && (
                  <span className="text-red-500">Message is required</span>
                )}
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={clsx(
                    isSubmitting ? "cursor-not-allowed opacity-70" : "",
                    "ml-auto",
                  )}
                >
                  {isSubmitting ? "Sending..." : "Send"}{" "}
                  {!isSubmitting && <FaChevronRight />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
