'use client';

import Link from "next/link";
import { Hero } from "@/components/layout/Hero";
import AnimatedReviewsSection from "@/components/animated-reviews-section";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            How I Can Help You
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Eligibility Assessment
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get a comprehensive assessment of your eligibility for various Canadian immigration programs.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Application Preparation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Expert guidance through the application process, ensuring all documents are properly prepared and submitted.
              </p>
            </div>
            
            <div className="glass-effect p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Settlement Services
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Support and resources to help you successfully settle in Canada, including housing, employment, and community integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <AnimatedReviewsSection 
        reviewUrl="https://www.google.com/search?q=THE+NINTH+HOUSE+IMMIGRATION+SOLUTIONS+INC.+Reviews" 
      />

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Ready to Start Your Canadian Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Take the first step towards your new life in Canada. Explore immigration pathways and find the perfect program for your situation.
          </p>
          <Link
            href="/immigration-pathways"
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Explore Immigration Pathways
          </Link>
        </div>
      </section>
    </main>
  );
}
