import { skills } from "@/lib/constants";
import SectionHeading from "../section-heading";

export default function Skills() {
  return (
    <section id="skills">
      <div>
        <SectionHeading
          title="My Skills"
          description="My favorite tools to help me get the job done effectively."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div
              className="rounded-3xl border bg-background p-8"
              key={skill.name}
            >
              <span className="mb-3 block text-xl">{skill.icon}</span>
              <h3 className="mb-2 text-lg font-bold leading-none">
                {skill.name}
              </h3>
              <p className="text-sm opacity-60">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
