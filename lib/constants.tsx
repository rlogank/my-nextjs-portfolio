import {
  SiBigcommerce,
  SiCloudflare,
  SiExpress,
  SiGoogle,
  SiGoogleanalytics,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiOpenai,
  SiPagespeedinsights,
  SiReact,
  SiShopify,
  SiTailwindcss,
  SiTypescript,
  SiWordpress,
} from "react-icons/si";

import fnstats from "@/public/images/portfolio/fnstats.png";
import freebieflow from "@/public/images/portfolio/freebieflow.png";
import linknote from "@/public/images/portfolio/linknote.png";
import paragontools from "@/public/images/portfolio/paragontools.png";
import summarize from "@/public/images/portfolio/summarize.png";
import venturawebdesign from "@/public/images/portfolio/venturawebdesign.png";
import { MdOutlineDesignServices } from "react-icons/md";
import { TbPaint } from "react-icons/tb";
import { PiNetwork } from "react-icons/pi";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

export const skills = [
  {
    name: "UX/UI Design",
    icon: <TbPaint />,
    description: "I design intuitive and engaging user interfaces, focusing on user experience to create visually appealing and functional designs.",
  },
  {
    name: "Web Design",
    icon: <MdOutlineDesignServices />,
    description: "I create visually appealing and user-friendly websites, ensuring a seamless blend of aesthetics and functionality.",
  },
  {
    name: "APIs and GraphQL",
    icon: <PiNetwork />,
    description: "I develop and integrate RESTful APIs and GraphQL for efficient data exchange, enhancing application performance and scalability.",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    description:
      "I use TypeScript to write clean, maintainable code, leveraging its strong typing system to catch errors early and enhance collaboration.",
  },
  {
    name: "React",
    icon: <SiReact />,
    description:
      "I have mastered React and leverage its component-based architecture to build high-performance, scalable, and interactive user interfaces.",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    description: "I excel in using Next.js to create server-rendered and static applications, ensuring robust performance and seamless scalability.",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    description:
      "I expertly use Tailwind CSS to design responsive and clean interfaces, streamlining my styling process and maintaining consistency across projects.",
  },
  {
    name: "OpenAI",
    icon: <SiOpenai />,
    description:
      "I integrate OpenAI’s cutting-edge tools into my applications, harnessing advanced AI capabilities to enhance functionality and user experience.",
  },
  {
    name: "JavaScript",
    icon: <SiJavascript />,
    description:
      "With deep expertise in JavaScript, I create dynamic, interactive web experiences and solve complex problems using modern scripting techniques.",
  },
  {
    name: "MongoDB",
    icon: <SiMongodb />,
    description:
      "I specialize in managing unstructured data with MongoDB, designing flexible and scalable database solutions that support dynamic web applications.",
  },
  {
    name: "Express.js",
    icon: <SiExpress />,
    description:
      "I build robust backend services and APIs with Express.js, focusing on efficiency and clean code to handle complex server-side logic.",
  },
  {
    name: "SEO",
    icon: <SiGoogle />,
    description:
      "I implement advanced SEO strategies to improve organic search visibility, combining technical expertise with up-to-date optimization practices.",
  },
  {
    name: "Analytics",
    icon: <SiGoogleanalytics />,
    description:
      "I utilize Google Analytics to gain detailed insights into user behavior, allowing me to make data-driven decisions that enhance user engagement.",
  },
  {
    name: "PageSpeed",
    icon: <SiPagespeedinsights />,
    description: "I use PageSpeed Insights to fine-tune the performance of my applications, ensuring fast load times and a superior user experience.",
  },
  {
    name: "Cloudflare",
    icon: <SiCloudflare />,
    description: "I leverage Cloudflare’s services to secure my applications and optimize content delivery, ensuring both speed and reliability.",
  },
  {
    name: "WordPress",
    icon: <SiWordpress />,
    description: "I build customizable and robust websites with WordPress, using my expertise to tailor solutions that meet diverse business needs.",
  },
  {
    name: "Shopify",
    icon: <SiShopify />,
    description:
      "I design and manage efficient online stores using Shopify, utilizing its flexible platform to create seamless e-commerce experiences.",
  },
  {
    name: "BigCommerce",
    icon: <SiBigcommerce />,
    description:
      "I develop robust e-commerce solutions with BigCommerce, leveraging its powerful features to deliver highly customizable online storefronts.",
  },
];

export const projects = [
  {
    name: "Linknote",
    url: "https://linknote.io",
    type: ["App", "Fun"],
    description: "An app to easily create and share notes. Full markdown support.",
    stack: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Vercel", "Shadcn UI"],
    image: linknote,
    externalClient: false,
  },
  {
    name: "Ventura Web Design",
    url: "https://venturawebdesign.com",
    type: ["Website", "Client"],
    description: "A website for a web design and marketing agency.",
    stack: ["React", "Next.js", "Tailwind CSS", "Vercel", "GraphQL"],
    image: venturawebdesign,
    externalClient: true,
  },
  {
    name: "FreebieFlow",
    url: "https://freebieflow.com",
    type: ["App", "Website", "Ecommerce", "Client"],
    description: "An app that finds heavily discounted Amazon items.",
    stack: ["React", "Tailwind CSS", "MongoDB", "Express.js"],
    image: freebieflow,
    externalClient: false,
  },
  {
    name: "Paragon Tools",
    url: "https://paragontools.io",
    type: ["App", "Fun"],
    description: "Get full YouTube transcripts despite YouTube discontinuing the API.",
    stack: ["React", "Next.js", "Tailwind CSS", "OpenAI API", "Shadcn UI"],
    image: paragontools,
    externalClient: false,
  },
  {
    name: "FNStats.io",
    url: "https://fnstats.io",
    type: ["App", "Fun"],
    description: "See the latest Fortnite item shop. Updates daily.",
    stack: ["React", "Next.js", "Tailwind CSS", "Fortnite API", "Vercel", "Shadcn UI"],
    image: fnstats,
    externalClient: false,
  },
  {
    name: "Summarize YT",
    url: "https://summarize-yt.com",
    type: ["App", "Fun"],
    description: "Summarize YouTube videos using AI.",
    stack: ["React", "Next.js", "Tailwind CSS", "OpenAI API", "Shadcn UI"],
    image: summarize,
    externalClient: false,
  },
];

export const testimonials = [
  {
    name: "Eric S.",
    feedback:
      "Of the two major projects we hired Logan for, he delivered high-quality code, beautiful UX/UI, and exceeded our expectations. We highly recommend him for any project.",
  },
  {
    name: "Teddy M.",
    feedback:
      "Logan is a hard working and dedicated individual I hired to create a front-end interface.",
  },
  {
    name: "Raymond K.",
    feedback:
      "Logan was very helpful, patient, and took every route to fix my website issue. He successfully fixed the problem with me on the phone, and with his guidance, I was able to see and learn from him. Would hire him again and recommend him.",
  },
  {
    name: "Michael K.",
    feedback:
      "I hired Logan to give my website a 'facelift.' He came back with a beautiful and clean fully new design that looked better than all of the other 10 designs that I was evaluating at the time. And he implemented it in a day. Logan's skills are impressive, and I would highly recommend him!",
  },
  {
    name: "Alex R.",
    feedback:
      "Logan transformed our outdated website into a modern, user-friendly experience. His innovative approach and commitment to quality really set him apart.",
  },
  {
    name: "Sarah W.",
    feedback:
      "Working with Logan was an absolute pleasure. His technical expertise and creative insights not only solved our challenges but also elevated our project to a whole new level.",
  },
];

export const navLinks = {
  quickLinks: [
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ],
  socials: [
    { name: "GitHub", href: "https://github.com/rlogank", icon: <FaGithub /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/rlogank/", icon: <FaLinkedin /> },
    { name: "X", href: "https://x.com/rlogank", icon: <SiX /> },
    { name: "Email", href: "mailto:rlogank@icloud.com", icon: <FaEnvelope /> },
  ],
};
