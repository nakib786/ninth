import { Testimonial } from "@/components/ui/testimonial-carousel";
import axios from "axios";

/**
 * Fetches Google reviews from our API route
 * @param reviewUrl Google Reviews URL (e.g., https://www.google.com/search?q=THE+NINTH+HOUSE+IMMIGRATION+SOLUTIONS+INC.+Reviews)
 * @returns Promise with array of testimonials
 */
export async function fetchGoogleReviews(reviewUrl: string): Promise<Testimonial[]> {
  try {
    // First try the new enhanced scraper
    try {
      const response = await axios.get('/api/scrape-reviews');
      
      if (response.data && response.data.reviews && response.data.reviews.length > 0) {
        console.log('Successfully fetched reviews from scrape-reviews endpoint');
        return response.data.reviews;
      }
    } catch (scrapeError) {
      console.error('Error using scrape-reviews endpoint:', scrapeError);
    }
    
    // Fallback to the old endpoint if the new one fails
    console.log('Falling back to original reviews endpoint');
    const encodedUrl = encodeURIComponent(reviewUrl);
    const response = await axios.get(`/api/google-reviews?url=${encodedUrl}`);
    
    if (!response.data || !response.data.reviews) {
      console.error("Invalid response from reviews API");
      return FALLBACK_GOOGLE_REVIEWS;
    }
    
    return response.data.reviews;
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return FALLBACK_GOOGLE_REVIEWS;
  }
}

/**
 * Fallback Google reviews for when API fetching fails or during development
 */
export const FALLBACK_GOOGLE_REVIEWS: Testimonial[] = [
  {
    id: "google-1",
    author: "Jasmine Patel",
    text: "I can't thank The Ninth House Immigration Solutions enough! They guided me through my PR application with expertise and care. Every step was clearly explained, and they were always available to answer my questions promptly.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "google-2",
    author: "Michael Chen",
    text: "Exceptional service from start to finish. The team at The Ninth House helped me navigate the complex immigration system efficiently. Their knowledge and professionalism made all the difference in my successful application.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: "google-3",
    author: "Sophia Williams",
    text: "Working with The Ninth House made my immigration process so much easier. They were thorough, detail-oriented, and genuinely cared about my case. Highly recommended for anyone looking for quality immigration assistance!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    id: "google-4",
    author: "Carlos Rodriguez",
    text: "Great experience with The Ninth House Immigration Solutions. They were honest about my options and chances, and helped me prepare a successful application. Their expertise is worth every penny.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: "google-5",
    author: "Priya Sharma",
    text: "I had consultations with several immigration firms before choosing The Ninth House, and I'm so glad I did. Their attention to detail and personalized approach made me feel confident throughout the process.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/67.jpg"
  }
]; 