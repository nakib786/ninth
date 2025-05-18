'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">IRCC Consultant Portal</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Professional immigration consulting services to help you navigate the Canadian immigration process.
            </p>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/consultant-profile" 
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm"
                >
                  Consultant Profile
                </Link>
              </li>
              <li>
                <Link 
                  href="/points-calculator" 
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm"
                >
                  Points Calculator
                </Link>
              </li>
              <li>
                <Link 
                  href="/immigration-pathways" 
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm"
                >
                  Immigration Pathways
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm"
                >
                  Blog & Updates
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.canada.ca/en/immigration-refugees-citizenship.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm"
                >
                  IRCC Official Site
                </a>
              </li>
              <li>
                <a 
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm"
                >
                  Express Entry
                </a>
              </li>
              <li>
                <a 
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm"
                >
                  Provincial Nominees
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Email: contact@ircc-consultant.ca
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Phone: +1 (123) 456-7890
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Address: 123 Immigration St, Toronto, ON
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
            © {currentYear} IRCC Consultant Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 