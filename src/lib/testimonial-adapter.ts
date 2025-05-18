import { Testimonial as GoogleTestimonial } from "@/components/ui/testimonial-carousel";
import { Testimonial as AnimatedTestimonial } from "@/components/ui/animated-testimonials";
import { FALLBACK_GOOGLE_REVIEWS } from "@/lib/google-reviews";

/**
 * Converts Google review format to the animated testimonial format
 * @param googleReviews Array of Google review format testimonials
 * @returns Array of testimonials in the animated format
 */
export function convertGoogleReviewsToAnimatedFormat(
  googleReviews: GoogleTestimonial[] = FALLBACK_GOOGLE_REVIEWS
): AnimatedTestimonial[] {
  return googleReviews.map((review, index) => {
    return {
      id: parseInt(review.id.replace(/\D/g, '') || index.toString()),
      name: review.author,
      role: "Client",
      company: "The Ninth House Immigration Solutions Inc.",
      content: review.text,
      rating: review.rating,
      avatar: review.image || `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${(index + 1) * 10}.jpg`
    };
  });
}

/**
 * Immigration consultation companies and organizations to display in the trusted section
 */
export const TRUSTED_COMPANIES = [
  "Immigration, Refugees and Citizenship Canada",
  "Canadian Bar Association",
  "Canadian Immigration Lawyers Association",
  "Immigration Consultants of Canada Regulatory Council",
  "Canada Border Services Agency"
]; 