"use client";

import { useEffect, useState } from "react";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { Testimonial } from "@/components/ui/testimonial-carousel";
import { FALLBACK_GOOGLE_REVIEWS, fetchGoogleReviews } from "@/lib/google-reviews";

interface ReviewsSectionProps {
  reviewUrl?: string;
  className?: string;
}

export default function ReviewsSection({
  reviewUrl = "https://g.co/kgs/R1yZbxd",
  className,
}: ReviewsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_GOOGLE_REVIEWS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        setIsLoading(true);
        // Note: Direct fetching from Google reviews URL will likely fail due to CORS
        // In a real application, this would be handled via a server-side API
        const reviews = await fetchGoogleReviews(reviewUrl);
        if (reviews && reviews.length > 0) {
          setTestimonials(reviews);
        }
      } catch (error) {
        console.error("Failed to load reviews:", error);
        // Fallback to static reviews
        setTestimonials(FALLBACK_GOOGLE_REVIEWS);
      } finally {
        setIsLoading(false);
      }
    }

    loadReviews();
  }, [reviewUrl]);

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground mt-2">
            Read what our clients have to say about our services
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="p-6 overflow-visible rounded-lg border border-gray-200 shadow-md dark:border-gray-800">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        )}
        
        <div className="mt-8 text-center">
          <a 
            href={reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline"
          >
            <span>View all reviews on Google</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 