'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { ExpressEntryRound } from '@/lib/scraper';

export default function ExpressEntryDrawsPage() {
  const [rounds, setRounds] = useState<ExpressEntryRound[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Function to fetch the data from our API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/express-entry-rounds');
      
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      
      const result = await response.json();
      setRounds(result.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching Express Entry data:', err);
      setError('Failed to load Express Entry rounds data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Helper function to calculate the average CRS score
  const calculateAverageCRS = (data: ExpressEntryRound[]) => {
    if (!data.length) return 'N/A';
    
    let totalScore = 0;
    let count = 0;
    
    data.forEach(round => {
      const score = parseInt(round.crsScore.replace(/,/g, ''), 10);
      if (!isNaN(score)) {
        totalScore += score;
        count++;
      }
    });
    
    if (count === 0) return 'N/A';
    return Math.round(totalScore / count).toString();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          IRCC Express Entry Draws
        </h1>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors disabled:opacity-50"
        >
          <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {lastUpdated && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Last updated: {lastUpdated.toLocaleString()}
        </p>
      )}

      {error ? (
        <div className="p-4 mb-6 rounded-md bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Latest CRS Score
              </h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {rounds.length > 0 ? rounds[0].crsScore : 'N/A'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {rounds.length > 0 ? rounds[0].date : ''}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Average CRS (Recent)
              </h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {calculateAverageCRS(rounds.slice(0, 10))}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Based on last 10 draws
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Latest Round Type
              </h3>
              <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {rounds.length > 0 ? rounds[0].roundType : 'N/A'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {rounds.length > 0 ? `${rounds[0].invitationsIssued} invitations issued` : ''}
              </p>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Draws</TabsTrigger>
              <TabsTrigger value="program">Program-specific</TabsTrigger>
              <TabsTrigger value="pnp">Provincial Nominee</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="w-full">
              <RoundsTable rounds={rounds} loading={loading} />
            </TabsContent>
            
            <TabsContent value="program">
              <RoundsTable 
                rounds={rounds.filter(round => !round.roundType.toLowerCase().includes('provincial'))}
                loading={loading} 
              />
            </TabsContent>
            
            <TabsContent value="pnp">
              <RoundsTable 
                rounds={rounds.filter(round => round.roundType.toLowerCase().includes('provincial'))}
                loading={loading} 
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

// Table component for Express Entry rounds
function RoundsTable({ rounds, loading }: { rounds: ExpressEntryRound[], loading: boolean }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <ArrowPathIcon className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
      </div>
    );
  }

  if (!rounds.length) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Draw #
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Round Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Invitations
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              CRS Score
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {rounds.map((round, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {round.number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {round.date}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                {round.roundType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {round.invitationsIssued}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {round.crsScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 