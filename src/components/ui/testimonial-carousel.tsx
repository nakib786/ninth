"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/gradient-button";

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

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      nextTestimonial();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, nextTestimonial]);

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
      <div className="overflow-hidden rounded-lg bg-background p-4 sm:p-6 shadow-md">
        <div className="text-center mb-4">
          <h3 className="text-xl sm:text-2xl font-bold mb-1">What Our Clients Say</h3>
          <p className="text-sm sm:text-base text-muted-foreground">From verified Google Reviews</p>
        </div>

        <div className="relative min-h-[240px] sm:h-64">
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
              <blockquote className="text-center px-2 sm:px-4">
                <p className="text-sm sm:text-lg italic mb-4 line-clamp-5 sm:line-clamp-none overflow-hidden break-words">&ldquo;{testimonials[currentIndex].text}&rdquo;</p>
                <footer className="font-medium">
                  {testimonials[currentIndex].image && (
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].author}
                      width={40}
                      height={40}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto mb-2 object-cover"
                    />
                  )}
                  <cite className="not-italic text-sm sm:text-base">{testimonials[currentIndex].author}</cite>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-4 gap-2">
          <GradientButton
            onClick={prevTestimonial}
            className={cn(
              "min-w-0 p-1.5 sm:p-2 rounded-full", 
              "flex items-center justify-center"
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-4 sm:size-5" />
          </GradientButton>
          <div className="flex items-center gap-1">
            {testimonials.map((_, index) => (
              <GradientButton
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "min-w-0 h-2 rounded-full transition-all",
                  index === currentIndex
                    ? "w-4"
                    : "w-2"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <GradientButton
            onClick={nextTestimonial}
            className={cn(
              "min-w-0 p-1.5 sm:p-2 rounded-full", 
              "flex items-center justify-center"
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-4 sm:size-5" />
          </GradientButton>
        </div>
      </div>
    </div>
  );
} 