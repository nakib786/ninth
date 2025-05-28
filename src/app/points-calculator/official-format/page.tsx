'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CRSResults, getSavedCRSResults, getSampleCRSResults } from '@/components/calculator/data/calculatorUtils';

export default function OfficialFormatPage() {
  const [result, setResult] = useState<CRSResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get results from localStorage first
    const savedResults = getSavedCRSResults();
    
    if (savedResults) {
      setResult(savedResults);
    } else {
      // If no saved results, use sample data
      setResult(getSampleCRSResults());
    }
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Loading results...</h1>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">No results available</h1>
        <p>Please complete the calculator first.</p>
        <Link href="/points-calculator" className="text-blue-600 hover:underline">
          Go to Calculator
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Express Entry Results</h1>
        <div className="flex-shrink-0">
          <Link
            href="/points-calculator"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Calculator
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Comprehensive Ranking System (CRS)</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
            Express Entry Profile Summary
          </p>
          <div className="flex justify-center">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-xl font-bold">
              Total Score: {result.totalScore}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Core/Human capital factors */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-xl font-semibold mb-4">Core/Human capital factors</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Age</span>
                <span className="font-medium">{result.coreHumanCapital.age}</span>
              </div>
              <div className="flex justify-between">
                <span>Level of education</span>
                <span className="font-medium">{result.coreHumanCapital.education}</span>
              </div>
              <div className="flex justify-between">
                <span>Official Languages</span>
                <span className="font-medium">{result.coreHumanCapital.firstLanguage}</span>
              </div>
              <div className="flex justify-between">
                <span>First Official Language</span>
                <span className="font-medium">{result.coreHumanCapital.firstLanguage}</span>
              </div>
              <div className="flex justify-between">
                <span>Second Official Language</span>
                <span className="font-medium">{result.coreHumanCapital.secondLanguage}</span>
              </div>
              <div className="flex justify-between">
                <span>Canadian work experience</span>
                <span className="font-medium">{result.coreHumanCapital.canadianWorkExperience}</span>
              </div>
              <div className="flex justify-between font-bold mt-2 text-lg">
                <span>Subtotal - Core/Human capital factors</span>
                <span>{result.coreHumanCapital.subtotal}</span>
              </div>
            </div>
          </div>

          {/* Spouse factors */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-xl font-semibold mb-4">Spouse factors</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Level of education</span>
                <span className="font-medium">{result.spouseFactors.education}</span>
              </div>
              <div className="flex justify-between">
                <span>First Official Languages</span>
                <span className="font-medium">{result.spouseFactors.firstLanguage}</span>
              </div>
              <div className="flex justify-between">
                <span>Canadian work experience</span>
                <span className="font-medium">{result.spouseFactors.canadianWorkExperience}</span>
              </div>
              <div className="flex justify-between font-bold mt-2 text-lg">
                <span>Subtotal - Spouse factors</span>
                <span>{result.spouseFactors.subtotal}</span>
              </div>
            </div>
          </div>

          {/* Skill transferability factors */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-xl font-semibold mb-4">Skill transferability factors</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Education (to a maximum of 50 points)</h4>
                <div className="space-y-2 pl-4">
                  <div className="flex justify-between">
                    <span>A) Official Language proficiency and education</span>
                    <span className="font-medium">{result.skillTransferability.educationLanguage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>B) Canadian work experience and education</span>
                    <span className="font-medium">{result.skillTransferability.educationWorkExperience}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Subtotal</span>
                    <span>{result.skillTransferability.educationLanguage + result.skillTransferability.educationWorkExperience}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Foreign work experience (to a maximum of 50 points)</h4>
                <div className="space-y-2 pl-4">
                  <div className="flex justify-between">
                    <span>A) Official Language proficiency and foreign work experience</span>
                    <span className="font-medium">{result.skillTransferability.foreignWorkExperienceLanguage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>B) Canadian and foreign work experience</span>
                    <span className="font-medium">{result.skillTransferability.foreignWorkExperienceCanadian}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Subtotal</span>
                    <span>{result.skillTransferability.foreignWorkExperienceLanguage + result.skillTransferability.foreignWorkExperienceCanadian}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <span>Certificate of qualification</span>
                <span className="font-medium">{result.skillTransferability.certificateOfQualification}</span>
              </div>

              <div className="flex justify-between font-bold mt-2 text-lg">
                <span>Subtotal Skill transferability factors</span>
                <span>{result.skillTransferability.subtotal}</span>
              </div>
            </div>
          </div>

          {/* Additional points */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-xl font-semibold mb-4">Additional points (to a maximum of 600 points)</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Provincial nomination</span>
                <span className="font-medium">{result.additionalPoints.provincialNomination}</span>
              </div>
              <div className="flex justify-between">
                <span>Study in Canada</span>
                <span className="font-medium">{result.additionalPoints.canadianEducation}</span>
              </div>
              <div className="flex justify-between">
                <span>Sibling in Canada</span>
                <span className="font-medium">{result.additionalPoints.sibling}</span>
              </div>
              <div className="flex justify-between">
                <span>French-language skills</span>
                <span className="font-medium">{result.additionalPoints.frenchLanguageSkills}</span>
              </div>
              <div className="flex justify-between font-bold mt-2 text-lg">
                <span>Subtotal Additional points</span>
                <span>{result.additionalPoints.subtotal}</span>
              </div>
            </div>
          </div>

          {/* Grand Total */}
          <div className="pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Comprehensive Ranking System formula grand total</span>
              <span>{result.totalScore}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-2">
            <strong>Disclaimer:</strong> This breakdown is provided for reference only. For official assessments, please visit the official 
            <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
              IRCC website
            </a>.
          </p>
          <p>
            The minimum CRS score required for an invitation varies with each draw. Check the latest 
            <a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
              Express Entry draw results
            </a> 
            for current thresholds.
          </p>
        </div>
      </div>
    </div>
  );
} 