import Link from "next/link";
import { useEffect, useState } from "react";
import { ExpressEntryRound } from "@/lib/scraper";

export function Hero() {
  const [latestDraw, setLatestDraw] = useState<ExpressEntryRound | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the latest Express Entry draw data
  useEffect(() => {
    const fetchLatestDraw = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/express-entry-rounds');
        
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        
        const result = await response.json();
        if (result.data && result.data.length > 0) {
          setLatestDraw(result.data[0]);
        }
      } catch (err) {
        console.error('Error fetching Express Entry data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestDraw();
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-8 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 leading-tight">
                Your Pathway to Canadian Immigration
              </h1>
              <p className="max-w-[600px] text-gray-700 md:text-xl dark:text-gray-300 leading-relaxed">
                Expert immigration consulting services to help you navigate the complex Canadian immigration process with confidence and success.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Link
                href="/about-us"
                className="inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-600"
              >
                About Us
              </Link>
              <Link
                href="/points-calculator"
                className="inline-flex h-10 items-center justify-center rounded-md border border-indigo-600 px-6 py-2 text-sm font-medium text-indigo-600 shadow-sm transition-colors hover:bg-indigo-100 hover:text-indigo-700 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-800"
              >
                Calculate Your Points
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm mt-2">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Licensed IRCC Consultant</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">All Immigration Programs</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Personalized Service</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[600px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950 animate-fadeIn">
              <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  IRCC Portal Dashboard
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                      Express Entry Score Calculator
                    </h3>
                    <div className="h-2 w-24 rounded-full bg-indigo-100 dark:bg-indigo-900"></div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Current CRS Score
                      </div>
                      <div className="mt-1 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        475
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Last Draw Cut-off
                      </div>
                      <div className="mt-1 text-2xl font-bold text-gray-700 dark:text-gray-300">
                        {loading ? (
                          <div className="h-7 w-16 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
                        ) : latestDraw ? (
                          <div className="flex items-center space-x-2">
                            <span>{latestDraw.crsScore}</span>
                            <Link href="/express-entry-draws" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                              View Details
                            </Link>
                          </div>
                        ) : (
                          "491"
                        )}
                      </div>
                      {!loading && latestDraw && (
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {latestDraw.date} • {latestDraw.roundType}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Age</span>
                      <span className="text-indigo-600 dark:text-indigo-400">110 / 110</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
                      <div className="h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" style={{ width: "100%" }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Education</span>
                      <span className="text-indigo-600 dark:text-indigo-400">140 / 150</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
                      <div className="h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" style={{ width: "93.3%" }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Language</span>
                      <span className="text-indigo-600 dark:text-indigo-400">124 / 160</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
                      <div className="h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" style={{ width: "77.5%" }}></div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Link 
                      href="/points-calculator"
                      className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Improve Your Score
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero; 