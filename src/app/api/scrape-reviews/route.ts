import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import axios from "axios";
import { Testimonial } from "@/components/ui/testimonial-carousel";
import { FALLBACK_GOOGLE_REVIEWS } from "@/lib/google-reviews";

// Direct URLs that might contain reviews
const REVIEW_URLS = [
  "https://www.google.com/search?q=THE+NINTH+HOUSE+IMMIGRATION+SOLUTIONS+INC.+Reviews",
  "https://www.google.com/maps/place/The+Ninth+House+Immigration+Solutions+Inc./@43.6509939,-79.3959749,17z/data=!4m8!3m7!1s0x89d4cb33393aaa23:0x52a494e11e8ffa29!8m2!3d43.6509939!4d-79.3933946!9m1!1b1!16s%2Fg%2F11ts8l0jqt?entry=ttu"
];

export async function GET() {
  try {
    const allReviews: Testimonial[] = [];
    let successfulFetch = false;

    // Try each URL in order until we get reviews
    for (const url of REVIEW_URLS) {
      try {
        console.log(`Attempting to fetch reviews from: ${url}`);

        // Use different headers to look more like a browser
        const response = await axios.get(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Sec-Ch-Ua": '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": "Windows",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1"
          },
          timeout: 10000
        });

        const $ = cheerio.load(response.data);

        // Extract reviews from Google Maps/Places
        if (url.includes("maps")) {
          // Google Maps review elements
          $(".jftiEf, .MyEned, .DU9Pgb, .lHfZwe").each((i, el) => {
            try {
              const reviewEl = $(el);
              const author = reviewEl.find(".d4r55, .YvjgZd, .TSUbDb").text().trim();
              const text = reviewEl.find(".wiI7pd, .MyEned, .Jtu6Td").text().trim();
              const ratingText = reviewEl.find(".kvMYJc, .hCCjke").attr("aria-label") || "5 stars";
              const ratingMatch = ratingText.match(/(\d+)/);
              const rating = ratingMatch ? parseInt(ratingMatch[0], 10) : 5;
              const imageEl = reviewEl.find("img.NBa7we, img.YQ4gaf");
              const image = imageEl.length ? imageEl.attr("src") : undefined;

              // Only add if we have meaningful content
              if ((author || text) && text.length > 5) {
                allReviews.push({
                  id: `google-maps-${i}`,
                  author: author || `Reviewer ${i + 1}`,
                  text: text || "Great immigration consultation service!",
                  rating,
                  image
                });
              }
            } catch (err) {
              console.error(`Error parsing maps review ${i}:`, err);
            }
          });
        } else {
          // Google Search review elements - multiple different selectors
          // First approach - localreviews
          $(".gws-localreviews__google-review").each((i, el) => {
            try {
              const author = $(el).find(".jxjCjc .TSUbDb").text().trim();
              const text = $(el).find(".Jtu6Td").text().trim();
              const ratingStr = $(el).find(".KdxwXb").attr("aria-label") || "5";
              const rating = parseInt(ratingStr.match(/\d+/)?.[0] || "5", 10);
              const image = $(el).find(".lDY1rd").attr("src");

              if (author || text) {
                allReviews.push({
                  id: `google-search-${i}`,
                  author: author || `Reviewer ${i + 1}`,
                  text: text || "Great immigration consultation service!",
                  rating,
                  image
                });
              }
            } catch (err) {
              console.error(`Error parsing search review ${i}:`, err);
            }
          });

          // Second approach - generic divs with review-like content
          if (allReviews.length === 0) {
            // Looking for blocks that might contain reviews
            $("div").each((i, el) => {
              const $el = $(el);
              const content = $el.text().trim();
              
              // Simple heuristic: looking for stars mention or rating patterns
              if (
                (content.includes("star") || content.includes("⭐") || /\d+\s*\/\s*5/.test(content)) && 
                content.length > 50 && 
                content.length < 1000
              ) {
                // Likely a review
                try {
                  // Try to find author name - often near beginning or after a hyphen
                  let author = "";
                  let text = content;
                  
                  // Look for patterns that might indicate an author
                  const patterns = [
                    /^([A-Z][a-z]+ [A-Z][a-z]+)/, // First Last format at beginning
                    /-\s*([A-Z][a-z]+ [A-Z][a-z]+)/, // After a hyphen
                    /by\s+([A-Z][a-z]+ [A-Z][a-z]+)/ // After "by"
                  ];
                  
                  for (const pattern of patterns) {
                    const match = content.match(pattern);
                    if (match && match[1]) {
                      author = match[1];
                      // Remove author from text if found
                      text = content.replace(match[0], "").trim();
                      break;
                    }
                  }
                  
                  // Extract rating
                  let rating = 5;
                  const ratingMatch = content.match(/(\d+(\.\d+)?)\s*\/\s*5|(\d+)\s*stars?|(\d+)\s*⭐/i);
                  if (ratingMatch) {
                    const ratingStr = ratingMatch[1] || ratingMatch[3] || ratingMatch[4];
                    if (ratingStr) {
                      rating = Math.round(parseFloat(ratingStr));
                      if (rating < 1 || rating > 5) rating = 5; // Sanity check
                    }
                  }
                  
                  // Add to reviews if it looks legit
                  if (text.length > 20) {
                    allReviews.push({
                      id: `extracted-${i}`,
                      author: author || `Customer ${i + 1}`,
                      text,
                      rating,
                      image: undefined
                    });
                  }
                } catch (err) {
                  console.error(`Error extracting review from text content ${i}:`, err);
                }
              }
            });
          }
        }

        // If we found reviews, we're done
        if (allReviews.length > 0) {
          console.log(`Successfully extracted ${allReviews.length} reviews from ${url}`);
          successfulFetch = true;
          break;
        }
      } catch (error) {
        console.error(`Error fetching from ${url}:`, error instanceof Error ? error.message : String(error));
      }
    }

    // Use fallback if no reviews found
    if (allReviews.length === 0) {
      console.log("No reviews found, using fallback reviews");
      return NextResponse.json({ 
        message: "Could not extract reviews from any sources, using fallback reviews",
        fallback: true,
        reviews: FALLBACK_GOOGLE_REVIEWS
      });
    }

    return NextResponse.json({ 
      reviews: allReviews, 
      source: successfulFetch ? "live" : "fallback" 
    });
  } catch (error) {
    console.error("Error in review scraping route:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ 
      error: "Failed to fetch reviews",
      fallback: true,
      reviews: FALLBACK_GOOGLE_REVIEWS 
    }, { status: 500 });
  }
} 