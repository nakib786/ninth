"use client";

import { useEffect, useState } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Testimonial as AnimatedTestimonial } from "@/components/ui/animated-testimonials";
import { FALLBACK_GOOGLE_REVIEWS, fetchGoogleReviews } from "@/lib/google-reviews";
import { convertGoogleReviewsToAnimatedFormat } from "@/lib/testimonial-adapter";

interface AnimatedReviewsSectionProps {
  reviewUrl?: string;
  className?: string;
}

export default function AnimatedReviewsSection({
  reviewUrl = "https://www.google.com/search?q=THE+NINTH+HOUSE+IMMIGRATION+SOLUTIONS+INC.+Reviews",
  className,
}: AnimatedReviewsSectionProps) {
  const [testimonials, setTestimonials] = useState<AnimatedTestimonial[]>(
    convertGoogleReviewsToAnimatedFormat(FALLBACK_GOOGLE_REVIEWS)
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        setIsLoading(true);
        const reviews = await fetchGoogleReviews(reviewUrl);
        if (reviews && reviews.length > 0) {
          setTestimonials(convertGoogleReviewsToAnimatedFormat(reviews));
        }
      } catch (error) {
        console.error("Failed to load reviews:", error);
        // Fallback to static reviews
        setTestimonials(convertGoogleReviewsToAnimatedFormat(FALLBACK_GOOGLE_REVIEWS));
      } finally {
        setIsLoading(false);
      }
    }

    loadReviews();
  }, [reviewUrl]);

  if (isLoading) {
    return (
      <section className={`py-24 overflow-hidden ${className || ""}`}>
        <div className="container mx-auto flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  return (
    <AnimatedTestimonials
      title="Experience Excellence in Immigration Services"
      subtitle="Here's what our clients are saying about The Ninth House Immigration Solutions Inc. - your trusted partner on the journey to Canada."
      badgeText="Verified Google Reviews"
      testimonials={testimonials}
      trustedCompanies={[]}
      className={className}
    />
  );
} 