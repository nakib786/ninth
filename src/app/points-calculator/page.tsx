'use client';

import Link from 'next/link';
import ExpressEntryCalculator from '@/components/calculator/ExpressEntryCalculator';

export default function PointsCalculatorPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Express Entry Points Calculator</h1>
      <p className="mb-8">
        Calculate your Comprehensive Ranking System (CRS) score for Express Entry immigration to Canada.
      </p>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <ExpressEntryCalculator />
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          href="/points-calculator/official-format" 
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          View Results in Official IRCC Format
        </Link>
      </div>
    </div>
  );
} 