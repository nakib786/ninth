import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/ui/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative z-10 bg-gradient-to-b from-transparent to-white/5 dark:to-black/20 border-t border-white/10 dark:border-white/5 backdrop-blur-xl mt-12">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section with Logo and Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {/* Logo and Company Description */}
          <div className="space-y-4">
            <div className="inline-block p-2 rounded-xl bg-white/5 hover:bg-white/10 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 transition-all duration-300 shadow-sm backdrop-blur-sm">
              <Logo />
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Professional immigration consulting services to help you navigate the Canadian immigration process with confidence and peace of mind.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 dark:bg-gray-800/30 hover:bg-indigo-600/20 dark:hover:bg-indigo-600/20 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 dark:bg-gray-800/30 hover:bg-indigo-600/20 dark:hover:bg-indigo-600/20 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 dark:bg-gray-800/30 hover:bg-indigo-600/20 dark:hover:bg-indigo-600/20 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 dark:bg-gray-800/30 hover:bg-indigo-600/20 dark:hover:bg-indigo-600/20 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 relative group inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-indigo-500 dark:bg-indigo-400 transform transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link 
                  href="/about-us" 
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-px bg-indigo-500 mr-0 group-hover:mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/points-calculator" 
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-px bg-indigo-500 mr-0 group-hover:mr-2"></span>
                  Points Calculator
                </Link>
              </li>
              <li>
                <Link 
                  href="/immigration-pathways" 
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-px bg-indigo-500 mr-0 group-hover:mr-2"></span>
                  Immigration Pathways
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-px bg-indigo-500 mr-0 group-hover:mr-2"></span>
                  Blog & Updates
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 relative group inline-block">
              Resources
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-indigo-500 dark:bg-indigo-400 transform transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="https://www.canada.ca/en/immigration-refugees-citizenship.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-px bg-indigo-500 mr-0 group-hover:mr-2"></span>
                  IRCC Official Site
                </a>
              </li>
              <li>
                <a 
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-px bg-indigo-500 mr-0 group-hover:mr-2"></span>
                  Express Entry
                </a>
              </li>
              <li>
                <a 
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-px bg-indigo-500 mr-0 group-hover:mr-2"></span>
                  Provincial Nominees
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 relative group inline-block">
              Contact
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-indigo-500 dark:bg-indigo-400 transform transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-7 h-7 mr-3 bg-white/10 dark:bg-gray-800/30 rounded-full flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  contact@ircc-consultant.ca
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-7 h-7 mr-3 bg-white/10 dark:bg-gray-800/30 rounded-full flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  +1 (778) 538-3555
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-7 h-7 mr-3 bg-white/10 dark:bg-gray-800/30 rounded-full flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  123 Immigration St, Toronto, ON
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/10 dark:border-white/5 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-700 dark:text-gray-300 text-sm group mb-6 md:mb-0">
              © {currentYear} <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-default">THE NINTH HOUSE IMMIGRATION SOLUTIONS INC</span>. All rights reserved.
            </p>
            
            <div className="flex justify-center">
              <a 
                href="https://register.college-ic.ca/Public-Register-EN/Licensee/Profile.aspx?ID=33378&b9100e1006f6=2#b9100e1006f6"
                target="_blank"
                rel="noopener noreferrer"
                title="Verify RCIC License"
                className="transition-all duration-300 hover:scale-105 hover:drop-shadow-md"
              >
                <Image 
                  src="/images/RCIC-IRB_EN_HORZ_CLR_POS.png"
                  alt="RCIC-IRB Regulated Canadian Immigration Consultant"
                  width={240}
                  height={80}
                  className="h-auto rounded-md bg-white/5 dark:bg-black/20 backdrop-blur-sm p-2"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] opacity-25 dark:opacity-20"></div>
    </footer>
  );
} 