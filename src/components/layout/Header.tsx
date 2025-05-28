'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Logo } from '@/components/ui/Logo';
import { TypewriterBrand } from '@/components/ui/TypewriterBrand';
import { GradientButton } from '@/components/ui/gradient-button';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdatesDropdownOpen, setIsUpdatesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUpdatesDropdown = () => {
    setIsUpdatesDropdownOpen(!isUpdatesDropdownOpen);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo section */}
          <div className="flex items-center">
            {/* Desktop Logo */}
            <div className="hidden sm:block rounded-lg hover:bg-white/10 dark:hover:bg-gray-800/30 transition-colors">
              <Logo />
            </div>
            
            {/* Mobile Logo & Brand */}
            <div className="flex sm:hidden items-center gap-3">
              <div className="flex-shrink-0">
                <Logo compact={true} />
              </div>
              <div className="min-w-[160px]">
                <TypewriterBrand />
              </div>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/about-us"
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              href="/express-entry"
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Express Entry
            </Link>
            <Link
              href="/immigration-pathways"
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Immigration Pathways
            </Link>
            <Link
              href="/express-entry-draws"
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Express Entry Draws
            </Link>
            
            {/* Updates dropdown menu */}
            <div className="relative inline-block">
              <GradientButton
                onClick={toggleUpdatesDropdown}
                className={cn(
                  "min-w-0 px-3 py-2",
                  "flex items-center", 
                  "text-sm"
                )}
              >
                Updates
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </GradientButton>
              
              {isUpdatesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg glass-effect ring-1 ring-black/5 dark:ring-white/10 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      href="/updates/news"
                      className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-700/30 transition-colors duration-200"
                      role="menuitem"
                      onClick={() => setIsUpdatesDropdownOpen(false)}
                    >
                      News
                    </Link>
                    <Link
                      href="/updates/blog"
                      className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-700/30 transition-colors duration-200"
                      role="menuitem"
                      onClick={() => setIsUpdatesDropdownOpen(false)}
                    >
                      Blog
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>
          
          <div className="hidden md:flex items-center">
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <GradientButton
              type="button"
              className={cn(
                "ml-4 min-w-0",
                "p-2 rounded-full",
                "flex items-center justify-center"
              )}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </GradientButton>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect shadow-lg animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/about-us"
              className="block text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              href="/express-entry"
              className="block text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Express Entry
            </Link>
            <Link
              href="/immigration-pathways"
              className="block text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Immigration Pathways
            </Link>
            <Link
              href="/express-entry-draws"
              className="block text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Express Entry Draws
            </Link>
            
            {/* Mobile Updates section */}
            <div className="block text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md text-base font-medium">
              Updates
            </div>
            <Link
              href="/updates/news"
              className="block text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-6 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              News
            </Link>
            <Link
              href="/updates/blog"
              className="block text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-6 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 