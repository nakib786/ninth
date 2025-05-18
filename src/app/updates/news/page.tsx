'use client';

import { useState, useEffect } from 'react';
import { CalendarIcon, TagIcon, ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  publishedDate: string;
  link: string;
  category?: string;
}

interface ArticleContent {
  id: string;
  content: string;
  publishedAt: string;
}

// Add this function to get colors based on category
const getCategoryColors = (category: string) => {
  switch(category?.toLowerCase()) {
    case 'news releases':
      return {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-800 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-800'
      };
    case 'statements':
      return {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-800 dark:text-green-300',
        border: 'border-green-200 dark:border-green-800'
      };
    case 'speeches':
      return {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-800 dark:text-purple-300',
        border: 'border-purple-200 dark:border-purple-800'
      };
    case 'media advisories':
      return {
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-800 dark:text-orange-300',
        border: 'border-orange-200 dark:border-orange-800'
      };
    default:
      return {
        bg: 'bg-gray-100 dark:bg-gray-800',
        text: 'text-gray-800 dark:text-gray-300',
        border: 'border-gray-200 dark:border-gray-700'
      };
  }
};

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [articleContents, setArticleContents] = useState<Record<string, ArticleContent>>({});
  const [loadingArticles, setLoadingArticles] = useState<Record<string, boolean>>({});
  
  // Add search state
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<NewsItem[]>([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [displayedPages, setDisplayedPages] = useState<number[]>([]);

  // Fetch article content
  const fetchArticleContent = async (id: string, link: string) => {
    try {
      setLoadingArticles(prev => ({ ...prev, [id]: true }));
      
      const response = await fetch(`/api/article-content?id=${id}&link=${encodeURIComponent(link)}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch article content");
      }
      
      const data = await response.json();
      
      setArticleContents(prev => ({
        ...prev,
        [id]: data
      }));
    } catch (err) {
      console.error('Error fetching article content:', err);
    } finally {
      setLoadingArticles(prev => ({ ...prev, [id]: false }));
    }
  };

  // Toggle expanded state for a news item
  const toggleExpanded = async (id: string, link: string) => {
    const newExpandedState = !expandedItems[id];
    
    setExpandedItems(prev => ({
      ...prev,
      [id]: newExpandedState
    }));
    
    // If expanding and we don't have the content yet, fetch it
    if (newExpandedState && !articleContents[id]) {
      await fetchArticleContent(id, link);
    }
  };

  useEffect(() => {
    const fetchRssFeed = async () => {
      try {
        setLoading(true);
        
        // Try the main API endpoint first
        let response = await fetch('/api/rss-feed');
        
        if (!response.ok) {
          console.warn("Primary RSS feed failed, trying alternative...");
          // If the first endpoint fails, try the alternative
          response = await fetch('/api/rss-feed-alt');
          
          if (!response.ok) {
            throw new Error("All RSS feed endpoints failed");
          }
        }
        
        const data = await response.json();
        
        if (data.error) {
          // Handle API error response
          throw new Error(data.error);
        }
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
          console.warn("No news items returned");
          setError('No news items available at this time. Please check back later.');
        } else if (Array.isArray(data)) {
          // Primary API endpoint returned an array of items
          console.log(`Loaded ${data.length} news items from primary API`);
          setNewsItems(data);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (err) {
        console.error('Error fetching RSS feed:', err);
        setError(err instanceof Error ? err.message : 'Failed to load news items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRssFeed();
  }, []);

  // New useEffect for search filtering
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(newsItems);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = newsItems.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          (item.category && item.category.toLowerCase().includes(query))
        );
      });
      setFilteredItems(filtered);
    }
    // Reset to first page when search changes
    setCurrentPage(1);
  }, [searchQuery, newsItems]);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    if (!dateString) return "Date unavailable";
    
    // Very explicit regex pattern for IRCC date format: YYYY-MM-DDThh:mm:ss-hh:mm or similar formats
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateString);
    if (match) {
      const year = match[1];
      const month = parseInt(match[2]);
      const day = match[3];
      
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      // Handle any potential out-of-range month numbers
      const monthName = monthNames[Math.min(Math.max(0, month - 1), 11)];
      
      return `${monthName} ${parseInt(day)}, ${year}`;
    }
    
    // Fallback for any other date format
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    } catch (e) {
      console.error("Date parsing failed:", e);
    }
    
    // Ultimate fallback - return the raw date string
    return dateString || "Date unavailable";
  };

  // Pagination calculation - use filteredItems instead of newsItems
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Update displayed pages when current page or total pages change
  useEffect(() => {
    const calculateDisplayedPages = () => {
      // Always show first and last page
      const pages: number[] = [];
      
      // Handle edge case of no pages
      if (totalPages <= 0) return [1];
      
      // If 9 or fewer pages, show all
      if (totalPages <= 9) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
        return pages;
      }
      
      // Always add page 1
      pages.push(1);
      
      // Calculate range around current page - show more pages around current
      let startPage = Math.max(2, currentPage - 3);
      let endPage = Math.min(totalPages - 1, currentPage + 3);
      
      // Adjust if at beginning
      if (currentPage <= 5) {
        startPage = 2;
        endPage = Math.min(totalPages - 1, 8);
      }
      
      // Adjust if at end
      if (currentPage >= totalPages - 4) {
        startPage = Math.max(2, totalPages - 7);
        endPage = totalPages - 1;
      }
      
      // Add ellipsis at beginning if needed
      if (startPage > 2) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis at end if needed
      if (endPage < totalPages - 1) {
        pages.push(-2); // -2 represents ellipsis at end
      }
      
      // Always add last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
      
      return pages;
    };
    
    setDisplayedPages(calculateDisplayedPages());
  }, [currentPage, totalPages]);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Additional navigation functions
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  
  // Handle large jumps for pagination
  const jumpForward = () => {
    if (currentPage + 10 <= totalPages) {
      setCurrentPage(currentPage + 10);
    } else {
      setCurrentPage(totalPages);
    }
  };
  
  const jumpBackward = () => {
    if (currentPage - 10 >= 1) {
      setCurrentPage(currentPage - 10);
    } else {
      setCurrentPage(1);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Modern News Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl mb-12">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-indigo-900/30" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000" />
        </div>
        
        <div className="relative px-6 py-12 md:py-20 md:px-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-4 border border-white/20">
              IRCC Official Updates
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="block">Latest Immigration</span>
              <span className="block">News & Updates</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-xl">
              Stay informed with the latest announcements, policy changes, and important updates from Immigration, Refugees and Citizenship Canada.
            </p>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg transform rotate-6 scale-105"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6 overflow-hidden">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-auto text-xs text-white/70">ircc.news.canada.ca</div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-white/20 rounded-full w-3/4"></div>
                  <div className="h-4 bg-white/20 rounded-full"></div>
                  <div className="h-4 bg-white/20 rounded-full w-5/6"></div>
                  <div className="h-4 bg-white/20 rounded-full w-1/2"></div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 mr-3 flex-shrink-0"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-white/20 rounded-full"></div>
                    <div className="h-3 bg-white/20 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modern Search Bar */}
        <div className="relative px-6 pb-10 md:px-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-2 max-w-3xl mx-auto flex items-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mx-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              className="bg-transparent w-full text-white placeholder-blue-200 border-0 focus:ring-0 focus:outline-none py-3"
              placeholder="Search IRCC news and announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-white/70 hover:text-white mr-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-2.5 font-medium transition-colors shadow-md"
              onClick={() => {
                // Focus on search results if query exists
                if (searchQuery.trim()) {
                  document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2" id="search-results">
              Official IRCC News
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Latest news and updates from Immigration, Refugees and Citizenship Canada.
            </p>
          </div>
          {filteredItems.length !== newsItems.length && (
            <div className="mt-4 md:mt-0 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg flex items-center">
              <span className="font-medium">{filteredItems.length} results</span>
              <span className="mx-2">for</span>
              <span className="font-bold">&ldquo;{searchQuery}&rdquo;</span>
              <button 
                onClick={() => setSearchQuery('')}
                className="ml-3 text-sm underline hover:text-blue-800 dark:hover:text-blue-200"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-6">
            <p className="text-red-700 dark:text-red-400">{error}</p>
            <p className="mt-2 text-sm text-red-600 dark:text-red-300">
              Please check back later or view the news directly at{' '}
              <a href="https://www.canada.ca/en/immigration-refugees-citizenship/news.html" className="underline" target="_blank" rel="noopener noreferrer">
                IRCC News
              </a>
            </p>
          </div>
        ) : newsItems.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">No news items available at the moment.</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 text-center">
            <p className="text-amber-700 dark:text-amber-400">No results found for &ldquo;{searchQuery}&rdquo;</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-3 text-sm text-amber-600 dark:text-amber-300 underline hover:text-amber-800 dark:hover:text-amber-200"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {currentItems.map((item) => (
                <article key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleExpanded(item.id, item.link);
                      }}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-between"
                    >
                      <span>{item.title}</span>
                      {expandedItems[item.id] ? 
                        <ChevronUpIcon className="h-5 w-5 ml-2 flex-shrink-0" /> : 
                        <ChevronDownIcon className="h-5 w-5 ml-2 flex-shrink-0" />
                      }
                    </a>
                  </h2>
                  <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-4 gap-4">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{formatDate(item.publishedDate)}</span>
                    </div>
                    {item.category && (
                      <div className="flex items-center">
                        <TagIcon className="h-4 w-4 mr-1" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColors(item.category).bg} ${getCategoryColors(item.category).text} border ${getCategoryColors(item.category).border}`}>
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {item.description}
                  </p>
                  
                  {expandedItems[item.id] && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {loadingArticles[item.id] ? (
                        <div className="flex justify-center py-6">
                          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                      ) : articleContents[item.id] ? (
                        <div 
                          className="prose prose-indigo max-w-none dark:prose-invert ircc-content"
                          dangerouslySetInnerHTML={{ __html: articleContents[item.id].content }}
                        />
                      ) : (
                        <div className="prose dark:prose-invert max-w-none">
                          <p className="italic text-sm">
                            For complete article details, please visit the official IRCC website by clicking the link below.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => toggleExpanded(item.id, item.link)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium inline-flex items-center"
                    >
                      {expandedItems[item.id] ? "Collapse" : "Expand"}
                      {expandedItems[item.id] ? 
                        <ChevronUpIcon className="w-4 h-4 ml-1" /> : 
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                      }
                    </button>
                    
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium inline-flex items-center"
                    >
                      Read on IRCC Website
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
            
            {/* Enhanced pagination controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6 mt-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                      currentPage === 1 
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                        : 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                      currentPage === totalPages 
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                        : 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, filteredItems.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredItems.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      {/* First page button */}
                      <button
                        onClick={goToFirstPage}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                          currentPage === 1 
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                            : 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                        title="First page"
                      >
                        <span className="sr-only">First page</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M9.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Jump backward button (for large page sets) */}
                      {totalPages > 10 && (
                        <button
                          onClick={jumpBackward}
                          disabled={currentPage <= 10}
                          className={`relative inline-flex items-center px-2 py-2 ${
                            currentPage <= 10
                              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                              : 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                          title="Jump back 10 pages"
                        >
                          <span className="sr-only">Jump back 10 pages</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                      
                      {/* Previous page button */}
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 ${
                          currentPage === 1 
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                            : 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      
                      {/* Enhanced page numbers */}
                      {displayedPages.map((pageNum, idx) => {
                        // Render ellipsis
                        if (pageNum < 0) {
                          return (
                            <span
                              key={`ellipsis-${idx}`}
                              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
                            >
                              ...
                            </span>
                          );
                        }
                        
                        // Render page number
                        return (
                          <button
                            key={pageNum}
                            onClick={() => paginate(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                              currentPage === pageNum
                                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-500 dark:border-indigo-500'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      {/* Next page button */}
                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 ${
                          currentPage === totalPages 
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                            : 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      
                      {/* Jump forward button (for large page sets) */}
                      {totalPages > 10 && (
                        <button
                          onClick={jumpForward}
                          disabled={currentPage > totalPages - 10}
                          className={`relative inline-flex items-center px-2 py-2 ${
                            currentPage > totalPages - 10
                              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                              : 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                          title="Jump forward 10 pages"
                        >
                          <span className="sr-only">Jump forward 10 pages</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                      
                      {/* Last page button */}
                      <button
                        onClick={goToLastPage}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                          currentPage === totalPages 
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                            : 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                        title="Last page"
                      >
                        <span className="sr-only">Last page</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 000 1.414z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M10.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L14.586 10l-4.293 4.293a1 1 0 000 1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
            
            {/* Show total articles count */}
            {filteredItems.length > 0 && (
              <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                Displaying a total of {filteredItems.length} articles from IRCC
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
} 