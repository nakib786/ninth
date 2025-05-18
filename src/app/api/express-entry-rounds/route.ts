import { NextResponse } from 'next/server';
import { scrapeExpressEntryRounds, ExpressEntryRound } from '@/lib/scraper';

// Cache the data for 1 hour
let cachedData: ExpressEntryRound[] | null = null;
let cacheTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function GET() {
  try {
    // Check if we have fresh cached data
    const now = Date.now();
    if (cachedData && now - cacheTime < CACHE_DURATION) {
      console.log('Returning cached Express Entry rounds data');
      return NextResponse.json({ data: cachedData });
    }

    // If no fresh cached data, scrape the website
    console.log('Scraping fresh Express Entry rounds data');
    const data = await scrapeExpressEntryRounds();
    
    // Cache the new data
    cachedData = data;
    cacheTime = now;
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve Express Entry rounds' },
      { status: 500 }
    );
  }
} 