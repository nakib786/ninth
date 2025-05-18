import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch the IRCC news feed from the official API - request more items (500 instead of 50)
    const response = await fetch(
      "https://api.io.canada.ca/io-server/gc/news/en/v2?dept=departmentofcitizenshipandimmigration&sort=publishedDate&orderBy=desc&publishedDate%3E=2021-07-23&pick=500&format=atom&atomtitle=Immigration,%20Refugees%20and%20Citizenship%20Canada",
      {
        headers: {
          "Accept": "application/json, text/plain, */*",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        },
        cache: "no-store",
        next: { revalidate: 0 } // Ensures fresh data on each request
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch IRCC feed:", response.status, response.statusText);
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }

    // Parse the XML/Atom feed
    const xmlText = await response.text();
    
    // Simple parsing for titles, links, descriptions, and dates
    const newsItems = [];
    let id = 1;

    // First, extract entry blocks from the feed content
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let entryMatch;
    const entries = [];
    
    while ((entryMatch = entryRegex.exec(xmlText)) !== null) {
      entries.push(entryMatch[1]);
    }
    
    if (entries.length === 0) {
      throw new Error("No entries found in the RSS feed");
    }
    
    console.log(`Found ${entries.length} entries in the RSS feed`);
    
    for (const entry of entries) {
      // Extract title - improve regex to handle CDATA and special characters
      const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/.exec(entry);
      const title = titleMatch 
        ? titleMatch[1]
            .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
            .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
            .trim()
        : '';
      
      // Extract link
      const linkMatch = /<link[^>]*href=["']([\s\S]*?)["'][^>]*>/.exec(entry);
      const link = linkMatch ? linkMatch[1].trim() : '';
      
      // Extract description/summary
      const summaryMatch = /<summary[^>]*>([\s\S]*?)<\/summary>/.exec(entry);
      const description = summaryMatch 
        ? summaryMatch[1]
            .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
            .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
            .trim()
        : '';
      
      // Extract published date - improved extraction
      const publishedMatch = /<published>([\s\S]*?)<\/published>/.exec(entry);
      let publishedDate = publishedMatch ? publishedMatch[1].trim() : '';
      
      // Alternative date field (some entries might use updated instead of published)
      if (!publishedDate) {
        const updatedMatch = /<updated>([\s\S]*?)<\/updated>/.exec(entry);
        publishedDate = updatedMatch ? updatedMatch[1].trim() : '';
      }
      
      // Extract department name to further identify category
      const deptMatch = /<department>([\s\S]*?)<\/department>/.exec(entry);
      const department = deptMatch ? deptMatch[1].trim() : "Immigration, Refugees and Citizenship Canada";
      
      // Determine category based on patterns in title and link
      let category = "News releases"; // Default
      
      if (title.toLowerCase().includes("statement") || link.toLowerCase().includes("statement")) {
        category = "Statements";
      } else if (title.toLowerCase().includes("speaking notes") || link.toLowerCase().includes("speaking-notes")) {
        category = "Speeches";
      } else if (
        title.toLowerCase().includes("advisory") || 
        link.toLowerCase().includes("advisory") ||
        title.toLowerCase().includes("to participate") || 
        link.toLowerCase().includes("to-participate")
      ) {
        category = "Media advisories";
      }
      
      if (title && link) {
        newsItems.push({
          id: `news-${id}`,
          title,
          description,
          publishedDate,
          link,
          category,
          department
        });
        id++;
      }
    }
    
    // Make sure we're getting a reasonable number of items from the feed
    if (newsItems.length === 0) {
      throw new Error("No valid news items could be extracted from the RSS feed");
    }
    
    console.log(`Successfully extracted ${newsItems.length} news items from the RSS feed`);
    
    // Return all items from the feed
    return NextResponse.json(newsItems);
  } catch (error) {
    console.error("Error fetching IRCC news feed:", error);
    // Return proper error response instead of fallback
    return NextResponse.json(
      { error: "Failed to fetch IRCC news feed. Please try again later." },
      { status: 500 }
    );
  }
} 