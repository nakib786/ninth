'use client';

import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';

const programs = [
  { id: 'express-entry', name: 'Express Entry (CRS)' },
  { id: 'ontario', name: 'Ontario (OINP)' },
  { id: 'british-columbia', name: 'British Columbia (BC PNP)' },
  { id: 'alberta', name: 'Alberta (AINP)' },
  { id: 'saskatchewan', name: 'Saskatchewan (SINP)' },
  { id: 'manitoba', name: 'Manitoba (MPNP)' },
  { id: 'nova-scotia', name: 'Nova Scotia (NSNP)' },
  { id: 'new-brunswick', name: 'New Brunswick (NBPNP)' },
  { id: 'pei', name: 'Prince Edward Island (PEI PNP)' },
  { id: 'newfoundland', name: 'Newfoundland (NLPNP)' },
  { id: 'yukon', name: 'Yukon (YNP)' },
  { id: 'northwest-territories', name: 'Northwest Territories (NTNP)' },
];

// Express Entry criteria
const expressEntryFactors = [
  {
    name: 'Age',
    options: [
      { value: 0, label: 'Under 18 years', points: 0 },
      { value: 1, label: '18-19 years', points: 99 },
      { value: 2, label: '20-29 years', points: 110 },
      { value: 3, label: '30 years', points: 105 },
      { value: 4, label: '31 years', points: 99 },
      { value: 5, label: '32 years', points: 94 },
      { value: 6, label: '33 years', points: 88 },
      { value: 7, label: '34 years', points: 83 },
      { value: 8, label: '35 years', points: 77 },
      { value: 9, label: '36 years', points: 72 },
      { value: 10, label: '37 years', points: 66 },
      { value: 11, label: '38 years', points: 61 },
      { value: 12, label: '39 years', points: 55 },
      { value: 13, label: '40 years', points: 50 },
      { value: 14, label: '41 years', points: 39 },
      { value: 15, label: '42 years', points: 28 },
      { value: 16, label: '43 years', points: 17 },
      { value: 17, label: '44 years', points: 6 },
      { value: 18, label: '45 years or older', points: 0 },
    ],
  },
  {
    name: 'Education',
    options: [
      { value: 0, label: 'Less than secondary school', points: 0 },
      { value: 1, label: 'Secondary school diploma', points: 30 },
      { value: 2, label: 'One-year post-secondary program', points: 90 },
      { value: 3, label: 'Two-year post-secondary program', points: 98 },
      { value: 4, label: 'Bachelor\'s degree', points: 120 },
      { value: 5, label: 'Two or more post-secondary degrees (one being at least 3 years)', points: 128 },
      { value: 6, label: 'Master\'s degree', points: 135 },
      { value: 7, label: 'Doctoral degree (PhD)', points: 150 },
    ],
  },
  {
    name: 'Official Language Proficiency (First)',
    options: [
      { value: 0, label: 'CLB 4 or less', points: 0 },
      { value: 1, label: 'CLB 5', points: 46 },
      { value: 2, label: 'CLB 6', points: 56 },
      { value: 3, label: 'CLB 7', points: 63 },
      { value: 4, label: 'CLB 8', points: 70 },
      { value: 5, label: 'CLB 9', points: 78 },
      { value: 6, label: 'CLB 10 or higher', points: 84 },
    ],
  },
  {
    name: 'Work Experience',
    options: [
      { value: 0, label: 'None or less than a year', points: 0 },
      { value: 1, label: '1 year', points: 40 },
      { value: 2, label: '2 years', points: 53 },
      { value: 3, label: '3 years', points: 64 },
      { value: 4, label: '4 years', points: 72 },
      { value: 5, label: '5 years or more', points: 80 },
    ],
  },
  {
    name: 'Canadian Work Experience',
    options: [
      { value: 0, label: 'None', points: 0 },
      { value: 1, label: '1 year', points: 35 },
      { value: 2, label: '2 years', points: 46 },
      { value: 3, label: '3 years', points: 56 },
      { value: 4, label: '4 years', points: 63 },
      { value: 5, label: '5 years or more', points: 70 },
    ],
  },
];

export default function PointsCalculator() {
  const [selectedProgram, setSelectedProgram] = useState('express-entry');
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const handleProgramChange = (program: string) => {
    setSelectedProgram(program);
    setSelections({});
    setTotalPoints(0);
    setShowResults(false);
  };
  
  const handleOptionSelect = (factorName: string, pointValue: number) => {
    const newSelections = { ...selections, [factorName]: pointValue };
    setSelections(newSelections);
    
    // Calculate total points
    const newTotal = Object.values(newSelections).reduce((acc, val) => acc + val, 0);
    setTotalPoints(newTotal);
  };
  
  const handleCalculate = () => {
    setShowResults(true);
  };
  
  const getProgram = () => {
    switch (selectedProgram) {
      case 'express-entry':
        return { factors: expressEntryFactors, maxPoints: 1200 };
      // Additional cases would be added for other programs
      default:
        return { factors: expressEntryFactors, maxPoints: 1200 };
    }
  };
  
  const { factors, maxPoints } = getProgram();
  const percentageScore = Math.round((totalPoints / maxPoints) * 100);
  
  return (
    <div className="max-w-5xl mx-auto animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Immigration Points Calculator</h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Use this calculator to estimate your score for different Canadian immigration programs.
          Select a program and answer the questions to get your estimated points.
        </p>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Immigration Program
          </label>
          
          <Tabs.Root 
            value={selectedProgram} 
            onValueChange={handleProgramChange}
            className="flex flex-col"
          >
            <Tabs.List 
              className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700"
              aria-label="Immigration Programs"
            >
              {programs.map((program) => (
                <Tabs.Trigger
                  key={program.id}
                  value={program.id}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
                    selectedProgram === program.id
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 border-b-2 border-indigo-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  {program.name}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            
            <Tabs.Content value="express-entry" className="outline-none">
              <div className="space-y-8">
                {factors.map((factor) => (
                  <div key={factor.name} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                      {factor.name}
                    </h3>
                    
                    <div className="space-y-2">
                      {factor.options.map((option) => (
                        <label
                          key={`${factor.name}-${option.value}`}
                          className="flex items-start space-x-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={factor.name}
                            value={option.value}
                            checked={selections[factor.name] === option.points}
                            onChange={() => handleOptionSelect(factor.name, option.points)}
                            className="mt-1 text-indigo-600 focus:ring-indigo-500"
                          />
                          <div>
                            <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                            <span className="ml-2 text-indigo-600 dark:text-indigo-400 font-medium">
                              ({option.points} points)
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end">
                  <button
                    onClick={handleCalculate}
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Calculate Points
                  </button>
                </div>
              </div>
            </Tabs.Content>
            
            {/* Placeholder content for other tabs */}
            {programs.filter(p => p.id !== 'express-entry').map((program) => (
              <Tabs.Content key={program.id} value={program.id} className="outline-none">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    {program.name} calculator is coming soon.
                  </p>
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
        
        {showResults && (
          <div
            className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800 animate-fadeIn"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your Results</h2>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Your total score for {programs.find(p => p.id === selectedProgram)?.name}:
                </p>
                <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
                  {totalPoints} <span className="text-lg font-normal text-gray-500 dark:text-gray-400">/ {maxPoints} points</span>
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="w-full md:w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-4" 
                    style={{ width: `${percentageScore}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 text-right">
                  {percentageScore}% of maximum score
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 