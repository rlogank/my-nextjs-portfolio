import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import SectionHeading from "../section-heading";
import { projects } from "@/lib/constants";
import Link from "next/link";

export default function Projects() {
  return (
    <section id="projects">
      <div>
        <SectionHeading
          title="Selected Works"
          description="Some of the websites and web apps I've built."
        />
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              href={project.url}
              target="_blank"
              key={project.name}
              rel="noopener noreferrer"
              aria-label={project.name}
              className="flex flex-col justify-between rounded-3xl border bg-background p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="mb-2 font-bold leading-none">
                    {project.name}
                  </h3>
                </div>

                <p className="text-sm opacity-60">{project.description}</p>
                <div className="mb-4 mt-2 flex flex-wrap gap-1">
                  {project.type.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="border-black/10 bg-background dark:border-white/5 dark:bg-secondary"
                    >
                      {t}
                    </Badge>
                  ))}
                  {project.stack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="border-black/10 bg-background dark:border-white/5 dark:bg-secondary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <Image
                src={project.image}
                alt={project.name}
                className="aspect-video w-full rounded-2xl object-cover object-top shadow"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
