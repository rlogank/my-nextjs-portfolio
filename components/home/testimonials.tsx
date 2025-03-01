import React from "react";
import { testimonials } from "@/lib/constants";
import SectionHeading from "../section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <section id="testimonials">
      <div>
        <SectionHeading
          title="Testimonials"
          description="What my clients say about me."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="rounded-3xl bg-background">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span>{testimonial.name}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, index) => {
                      return (
                        <FaStar key={`star-${testimonial.name}-${index}`} />
                      );
                    })}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                {testimonial.feedback}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
