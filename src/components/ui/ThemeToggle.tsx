import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { GradientButton } from '@/components/ui/gradient-button';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, show the theme toggle
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <GradientButton
      aria-label="Toggle Dark Mode"
      type="button"
      className={cn(
        "p-2 min-w-0 rounded-full", 
        "flex items-center justify-center"
      )}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </GradientButton>
  );
} 