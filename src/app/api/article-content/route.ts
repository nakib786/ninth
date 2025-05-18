import { NextResponse } from 'next/server';

// Fallback content when fetch fails
const defaultContent = {
  content: `<p>The full content of this article is not available at the moment.</p>
  <p>Please visit the official IRCC website to read the complete article.</p>
  <p>For the most accurate and up-to-date information, we recommend visiting the <a href="https://www.canada.ca/en/immigration-refugees-citizenship/news.html" target="_blank" rel="noopener noreferrer">official IRCC news page</a>.</p>`,
  publishedAt: new Date().toISOString()
};

export async function GET(request: Request) {
  try {
    // Get the article ID and link from the URL search params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const link = searchParams.get('link');
    
    // If no ID provided or invalid ID, return an error
    if (!id) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      );
    }
    
    // If link is provided, attempt to fetch the actual content from IRCC website
    if (link && link.includes('canada.ca')) {
      try {
        // Fetch the article page from IRCC
        const response = await fetch(link, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          },
          cache: 'no-store',
          next: { revalidate: 0 }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch article content: ${response.status}`);
        }
        
        const html = await response.text();
        
        // Extract the main content from the fetched HTML
        // Target the main content section of IRCC pages
        let mainContent = '';
        
        // Look for the main content container
        const contentRegex = /<main[^>]*class="[^"]*container[^"]*"[^>]*>([\s\S]*?)<\/main>/i;
        const contentMatch = contentRegex.exec(html);
        
        if (contentMatch && contentMatch[1]) {
          // Further refine to get just the article content section
          const articleRegex = /<div[^>]*class="[^"]*mwsgeneric-base-html[^"]*"[^>]*>([\s\S]*?)<\/div>/i;
          const articleMatch = articleRegex.exec(contentMatch[1]);
          
          if (articleMatch && articleMatch[1]) {
            mainContent = articleMatch[1];
          } else {
            // Fallback to main content if specific article content section not found
            mainContent = contentMatch[1];
          }
          
          // Clean up the content for better display
          // Remove unnecessary elements like navigation, headers, etc.
          mainContent = mainContent
            .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
            .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
            .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<form[^>]*>[\s\S]*?<\/form>/gi, '')
            .replace(/\s{2,}/g, ' ')
            .trim();
          
          // Extract publication date if possible
          const dateRegex = /<time[^>]*datetime="([^"]*)"[^>]*>/i;
          const dateMatch = dateRegex.exec(html);
          const publishedAt = dateMatch ? dateMatch[1] : new Date().toISOString();
          
          return NextResponse.json({
            id,
            content: mainContent,
            publishedAt
          });
        }
      } catch (error) {
        console.error('Error fetching article from IRCC website:', error);
        // Continue to fallback if fetch fails
      }
    }
    
    // Return default content if fetch failed or no link provided
    return NextResponse.json({
      id,
      ...defaultContent
    });
  } catch (error) {
    console.error('Error processing article content request:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve article content' },
      { status: 500 }
    );
  }
} 