import { Metadata } from 'next';
import Link from 'next/link';
import { CalendarIcon, NewspaperIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Updates | IRCC Consultant Portal',
  description: 'Latest immigration news, RSS feeds, and consultant insights',
};

export default function UpdatesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Immigration Updates
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay up-to-date with the latest immigration news, policy changes, and expert insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link 
            href="/updates/news" 
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <NewspaperIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <h2 className="ml-3 text-2xl font-bold text-gray-900 dark:text-gray-100">News</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Official IRCC news, policy updates, and press releases from Canada&apos;s immigration authorities.
            </p>
          </Link>
          
          <Link 
            href="/updates/blog" 
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <CalendarIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <h2 className="ml-3 text-2xl font-bold text-gray-900 dark:text-gray-100">Blog</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Expert insights, analysis, and guidance on Canadian immigration pathways and processes.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
} 