'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock data for immigration pathways
const immigrationPathways = [
  {
    id: 'express-entry',
    name: 'Express Entry',
    description: 'A system used to manage applications for permanent residence from skilled workers.',
    eligibility: 'Skilled workers with foreign work experience or Canadian education/work experience.',
    processingTime: '6-8 months',
    fee: 'CAD $1,325 - $1,500',
    steps: [
      'Create an Express Entry profile',
      'Receive an Invitation to Apply (ITA)',
      'Submit a complete application',
      'Receive permanent residence status'
    ]
  },
  {
    id: 'family-sponsorship',
    name: 'Family Sponsorship',
    description: 'Programs that allow Canadian citizens and permanent residents to sponsor family members for immigration.',
    eligibility: 'Spouses, partners, children, parents, grandparents, and other eligible relatives.',
    processingTime: '12-36 months (varies by relationship)',
    fee: 'CAD $1,050 - $1,500',
    steps: [
      'Submit sponsorship application',
      'Submit application for permanent residence',
      'Attend interview (if required)',
      'Complete medical and security checks',
      'Receive permanent residence status'
    ]
  },
  {
    id: 'provincial-nominee',
    name: 'Provincial Nominee Program (PNP)',
    description: 'Programs run by provinces and territories to nominate immigrants who wish to settle in a particular province.',
    eligibility: 'Varies by province/territory and specific stream.',
    processingTime: '15-19 months',
    fee: 'CAD $1,325 + provincial fees (varies)',
    steps: [
      'Apply to a specific provincial program',
      'Receive provincial nomination',
      'Apply for permanent residence',
      'Complete medical and security checks',
      'Receive permanent residence status'
    ]
  },
  {
    id: 'atlantic-immigration',
    name: 'Atlantic Immigration Program',
    description: 'A pathway to permanent residence for skilled foreign workers and international graduates who want to work and live in Atlantic Canada.',
    eligibility: 'Skilled workers and international graduates with a job offer from a designated employer in Atlantic Canada.',
    processingTime: '6-12 months',
    fee: 'CAD $1,325',
    steps: [
      'Get a job offer from a designated employer',
      'Get an endorsement certificate',
      'Apply for permanent residence',
      'Complete medical and security checks',
      'Receive permanent residence status'
    ]
  },
  {
    id: 'rural-northern',
    name: 'Rural and Northern Immigration Pilot',
    description: 'A community-driven program that helps spread the benefits of economic immigration to smaller communities.',
    eligibility: 'Skilled workers with a job offer in a participating community.',
    processingTime: '12-18 months',
    fee: 'CAD $1,325',
    steps: [
      'Get a job offer in a participating community',
      'Get community recommendation',
      'Apply for permanent residence',
      'Complete medical and security checks',
      'Receive permanent residence status'
    ]
  },
  {
    id: 'start-up-visa',
    name: 'Start-up Visa Program',
    description: 'A program that targets immigrant entrepreneurs with innovative business ideas.',
    eligibility: 'Entrepreneurs with a qualifying business and support from a designated organization.',
    processingTime: '12-16 months',
    fee: 'CAD $1,575',
    steps: [
      'Get a letter of support from a designated organization',
      'Prove language proficiency',
      'Show proof of funds',
      'Apply for permanent residence',
      'Receive permanent residence status'
    ]
  }
];

export default function ImmigrationPathways() {
  const [expandedPathway, setExpandedPathway] = useState<string | null>(null);
  
  const togglePathway = (id: string) => {
    setExpandedPathway(expandedPathway === id ? null : id);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Immigration Pathways to Canada
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore the various immigration programs and pathways available for permanent residence in Canada.
          Click on each pathway to learn more about eligibility requirements and application processes.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {immigrationPathways.map((pathway, index) => (
          <motion.div
            key={pathway.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => togglePathway(pathway.id)}
                className="w-full p-5 flex items-center justify-between text-left"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {pathway.name}
                </h2>
                <svg
                  className={`h-5 w-5 text-gray-500 transition-transform ${expandedPathway === pathway.id ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {expandedPathway === pathway.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-5"
                >
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {pathway.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                        Eligibility
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {pathway.eligibility}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                        Processing Time
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {pathway.processingTime}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                        Application Fee
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {pathway.fee}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Application Process
                    </h3>
                    <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {pathway.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="flex justify-end">
                    <Link 
                      href={`/points-calculator?program=${pathway.id}`}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                    >
                      Check Eligibility with Points Calculator →
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10">
        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Need Help Choosing the Right Pathway?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Immigration can be complex. As a licensed immigration consultant, I can assess your profile and recommend the best pathway for your unique situation.
          </p>
          <Link 
            href="/about-us#contact"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Contact Us for a Consultation
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 