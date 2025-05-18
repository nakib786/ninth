import { NextResponse } from 'next/server';

// Helper to determine category from content or URL
function guessCategory(title = '', link = '') {
  const titleLower = title.toLowerCase();
  const linkLower = link.toLowerCase();
  
  if (titleLower.includes('statement') || linkLower.includes('statement')) {
    return 'Statements';
  }
  
  if (titleLower.includes('speaking notes') || linkLower.includes('speaking-notes')) {
    return 'Speeches';
  }
  
  if (
    titleLower.includes('advisory') || 
    linkLower.includes('advisory') || 
    titleLower.includes('to participate') || 
    linkLower.includes('to-participate')
  ) {
    return 'Media advisories';
  }
  
  return 'News releases';
}

export async function GET() {
  try {
    // Alternative implementation to fetch IRCC news - request more items (500 instead of 50)
    const apiUrl = 'https://api.io.canada.ca/io-server/gc/news/en/v2?dept=departmentofcitizenshipandimmigration&sort=publishedDate&orderBy=desc&publishedDate%3E=2021-07-23&pick=500&format=atom&atomtitle=Immigration,%20Refugees%20and%20Citizenship%20Canada';
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      cache: "no-store",
      next: { revalidate: 0 } // Ensures fresh data on each request
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.text();
    
    // Parse the Atom feed using a different approach than the main route
    const items = [];
    let counter = 1;
    
    // Find all entry tags
    const entryMatches = data.match(/<entry>[\s\S]*?<\/entry>/g);
    
    if (!entryMatches || entryMatches.length === 0) {
      throw new Error("No entries found in the RSS feed");
    }
    
    console.log(`Found ${entryMatches.length} entries in the RSS feed (alt method)`);
    
    // Process all entries - don't limit to 20 anymore
    for (let i = 0; i < entryMatches.length; i++) {
      const entry = entryMatches[i];
      
      // Find the title - improved regex to handle CDATA and special characters
      const titleMatch = entry.match(/<title[^>]*>([\s\S]*?)<\/title>/);
      const title = titleMatch 
        ? titleMatch[1]
            .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
            .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
            .trim()
        : '';
      
      // Find the link
      const linkMatch = entry.match(/href="([^"]+)"/);
      const link = linkMatch ? linkMatch[1].trim() : '';
      
      // Find the summary/description
      const summaryMatch = entry.match(/<summary[^>]*>([\s\S]*?)<\/summary>/);
      const description = summaryMatch 
        ? summaryMatch[1]
            .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
            .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
            .trim()
        : '';
      
      // Find the published date - improved regex to handle all date formats
      const dateMatch = entry.match(/<published>([\s\S]*?)<\/published>/);
      let publishedDate = dateMatch ? dateMatch[1].trim() : '';
      
      // Try alternative date field if published is not available
      if (!publishedDate) {
        const updatedMatch = entry.match(/<updated>([\s\S]*?)<\/updated>/);
        publishedDate = updatedMatch ? updatedMatch[1].trim() : '';
      }
      
      if (title && link) {
        items.push({
          id: `news-${counter}`,
          title,
          description,
          publishedDate,
          link,
          category: guessCategory(title, link)
        });
        
        counter++;
      }
    }
    
    if (items.length === 0) {
      throw new Error("No valid news items could be extracted from the RSS feed");
    }
    
    console.log(`Successfully extracted ${items.length} news items from the RSS feed (alt method)`);
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Failed to fetch IRCC news feed (alt method):', error);
    return NextResponse.json(
      { error: "Failed to fetch IRCC news feed. Please try again later." },
      { status: 500 }
    );
  }
} 