"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  rating: number;
  image?: string;
}

interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

// Placeholder Google testimonials to use until API integration is completed
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    author: "John Smith",
    text: "The immigration consultant was extremely helpful in guiding me through the entire process. They were knowledgeable, responsive, and made what seemed like an overwhelming process much more manageable.",
    rating: 5,
  },
  {
    id: "2",
    author: "Maria Rodriguez",
    text: "I had an excellent experience working with this consultant. They were professional, thorough, and helped me navigate all the complex paperwork. Highly recommend their services!",
    rating: 5,
  },
  {
    id: "3",
    author: "Ahmed Hassan",
    text: "The team was very responsive and provided clear guidance throughout my application process. Their expertise was invaluable and I'm grateful for their assistance.",
    rating: 4,
  },
  {
    id: "4",
    author: "Sarah Chen",
    text: "I appreciate the personalized service and attention to detail. The consultant was patient in explaining every step and ensured all my documents were properly prepared.",
    rating: 5,
  },
];

export function TestimonialCarousel({
  testimonials = DEFAULT_TESTIMONIALS,
  autoPlay = true,
  interval = 5000,
  className,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      nextTestimonial();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      <div className="overflow-hidden rounded-lg bg-background p-6 shadow-md">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold mb-1">What Our Clients Say</h3>
          <p className="text-muted-foreground">From verified Google Reviews</p>
        </div>

        <div className="relative h-64">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={cn(
                      "mx-0.5",
                      i < testimonials[currentIndex].rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <blockquote className="text-center">
                <p className="text-lg italic mb-4">&ldquo;{testimonials[currentIndex].text}&rdquo;</p>
                <footer className="font-medium">
                  {testimonials[currentIndex].image && (
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].author}
                      className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                    />
                  )}
                  <cite className="not-italic">{testimonials[currentIndex].author}</cite>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex
                    ? "bg-primary w-4"
                    : "bg-primary/30 hover:bg-primary/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 