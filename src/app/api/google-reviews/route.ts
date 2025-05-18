import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { Testimonial } from "@/components/ui/testimonial-carousel";
import { FALLBACK_GOOGLE_REVIEWS } from "@/lib/google-reviews";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const reviewUrl = searchParams.get("url");

    if (!reviewUrl) {
      return NextResponse.json({ 
        error: "Missing review URL", 
        fallback: true,
        reviews: FALLBACK_GOOGLE_REVIEWS 
      }, { status: 400 });
    }

    // Fetch the Google review page with better headers to mimic a browser
    const response = await axios.get(reviewUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    });

    if (!response.data) {
      console.error("No data received from Google Reviews");
      return NextResponse.json({ 
        error: "Failed to fetch reviews", 
        fallback: true,
        reviews: FALLBACK_GOOGLE_REVIEWS 
      }, { status: 500 });
    }

    // Parse HTML content - Note: This is simplified and may not work with Google's actual structure
    // In a production environment, you might need a more robust solution like a dedicated reviews API
    const $ = cheerio.load(response.data);
    const reviews: Testimonial[] = [];

    // Try different selectors that might match Google review elements
    // Google reviews in search results
    $(".gws-localreviews__google-review, .cXedhc, .TSUbDb, .WMbnJf, .jftiEf").each((index, element) => {
      try {
        // Extract author - try different selectors
        const author = $(element).find(".jxjCjc .TSUbDb, .review-author, .DHIhE").text().trim() || 
                      $(element).find("span.P5Bobd").first().text().trim() ||
                      `Reviewer ${index + 1}`;
        
        // Extract text - try different selectors
        const text = $(element).find(".Jtu6Td, .review-text, .review-content, .MyEned").text().trim() || 
                    $(element).find(".g1Khaf, span.K7oBsc").text().trim() ||
                    "Great experience with The Ninth House Immigration Solutions.";
        
        // Extract rating - try different approaches
        const ratingEl = $(element).find(".KdxwXb, .review-rating-stars, .GDWaad, .hvqFYe");
        let rating = 5;
        
        if (ratingEl.length) {
          const ratingText = ratingEl.attr('aria-label') || ratingEl.text();
          const ratingMatch = ratingText.match(/(\d+(\.\d+)?)/);
          if (ratingMatch) {
            rating = Math.round(parseFloat(ratingMatch[1]));
          }
        }
        
        // Extract image if available
        const image = $(element).find(".lDY1rd, .author-image, .review-author-image").attr("src") || 
                     $(element).find("img").attr("src") || 
                     undefined;
        
        // Only add if we have at least author or text
        if (author || text) {
          reviews.push({
            id: `google-${index}`,
            author: author || `Reviewer ${index + 1}`,
            text: text || "Great service and professional consultation.",
            rating,
            image
          });
        }
      } catch (err) {
        console.error(`Error parsing review at index ${index}:`, err);
      }
    });

    // Fallback to more generic selectors if no reviews found
    if (reviews.length === 0) {
      // Try looking for more generic review-like content
      $(".review, [data-attrid*='review'], .hZVQw").each((index, element) => {
        try {
          const content = $(element).text().trim();
          // Simple heuristic: If it's relatively long, it might be a review
          if (content && content.length > 50) {
            reviews.push({
              id: `google-${index}`,
              author: `Customer ${index + 1}`,
              text: content,
              rating: 5,
              image: undefined
            });
          }
        } catch (err) {
          console.error(`Error parsing generic review at index ${index}:`, err);
        }
      });
    }

    // If we couldn't extract any reviews, return the fallback reviews
    if (reviews.length === 0) {
      console.log("No reviews found on the page, using fallback reviews");
      return NextResponse.json({ 
        message: "No reviews found on the page, using fallback reviews",
        fallback: true,
        reviews: FALLBACK_GOOGLE_REVIEWS 
      });
    }

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    
    return NextResponse.json({ 
      error: "Failed to fetch or parse reviews", 
      fallback: true,
      reviews: FALLBACK_GOOGLE_REVIEWS 
    }, { status: 500 });
  }
} 