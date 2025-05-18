'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock blog post data
const blogPosts = [
  {
    id: 1,
    title: 'Latest Express Entry Draw Results',
    excerpt: 'The latest Express Entry draw saw 4,500 invitations issued with a minimum CRS score of 471. Find out what this means for your application.',
    author: 'Jane Smith',
    date: 'February 15, 2025',
    category: 'Express Entry',
    image: '/images/blog/express-entry.jpg',
    tags: ['Express Entry', 'CRS', 'Immigration']
  },
  {
    id: 2,
    title: 'Ontario PNP Announces New Tech Draw',
    excerpt: 'Ontario&apos;s Provincial Nominee Program has announced a new Tech Draw targeting IT professionals. Learn about eligibility requirements and how to apply.',
    author: 'Jane Smith',
    date: 'February 10, 2025',
    category: 'Provincial Programs',
    image: '/images/blog/ontario-pnp.jpg',
    tags: ['Ontario', 'PNP', 'Technology', 'Immigration']
  },
  {
    id: 3,
    title: 'Family Sponsorship Changes for 2025',
    excerpt: 'Important changes to Family Sponsorship programs have been announced for 2025. Find out how these changes might affect your sponsorship application.',
    author: 'Jane Smith',
    date: 'February 5, 2025',
    category: 'Family Sponsorship',
    image: '/images/blog/family-sponsorship.jpg',
    tags: ['Family Sponsorship', 'Immigration', 'Policy Changes']
  },
  {
    id: 4,
    title: 'Work Permit Extensions During COVID-19 Recovery',
    excerpt: 'IRCC has announced new measures to help temporary workers extend their status during the ongoing COVID-19 recovery phase.',
    author: 'Jane Smith',
    date: 'January 28, 2025',
    category: 'Work Permits',
    image: '/images/blog/work-permit.jpg',
    tags: ['Work Permits', 'COVID-19', 'IRCC', 'Temporary Residents']
  },
  {
    id: 5,
    title: 'Study Permit Processing Times Improve',
    excerpt: 'Recent data shows that study permit processing times have improved significantly in the past quarter. What this means for international students.',
    author: 'Jane Smith',
    date: 'January 20, 2025',
    category: 'Study Permits',
    image: '/images/blog/study-permit.jpg',
    tags: ['Study Permits', 'International Students', 'Processing Times']
  },
  {
    id: 6,
    title: 'Rural Immigration Pilot Program Success Stories',
    excerpt: 'The Rural and Northern Immigration Pilot is helping communities attract and retain newcomers. Read success stories from participants across Canada.',
    author: 'Jane Smith',
    date: 'January 15, 2025',
    category: 'Pilot Programs',
    image: '/images/blog/rural-immigration.jpg',
    tags: ['Rural Immigration', 'Northern Immigration', 'Pilot Programs']
  }
];

// Categories for filtering
const categories = [
  'All',
  'Express Entry',
  'Provincial Programs',
  'Family Sponsorship',
  'Work Permits',
  'Study Permits',
  'Pilot Programs'
];

export default function BlogPosts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Blog & Immigration Updates
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay up-to-date with the latest immigration news, policy changes, and expert insights.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">Search</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    selectedCategory === category
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">Subscribe</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get the latest immigration updates delivered to your inbox.
            </p>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
            />
            <button
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Subscribe
            </button>
          </div>
        </div>
        
        <div className="md:col-span-3">
          {filteredPosts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No articles found matching your criteria. Try adjusting your search or category selection.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full"
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                    {/* Placeholder for post image */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                      <span>Image: {post.image}</span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-indigo-800 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-3">
                      {post.category}
                    </span>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      <Link href={`/blog/${post.id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700">
                    <Link 
                      href={`/blog/${post.id}`}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                    >
                      Read Article →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
          
          {filteredPosts.length > 0 && (
            <div className="mt-10 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <button className="px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Previous
                </button>
                <button className="px-3 py-2 border-t border-b border-gray-300 dark:border-gray-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                  1
                </button>
                <button className="px-3 py-2 border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  2
                </button>
                <button className="px-3 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 