import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  compact?: boolean;
}

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <div className="flex items-center transition-transform duration-300 ease-out hover:scale-105">
        <Image
          src="/ninth-house-logo.png"
          alt="The Ninth House Immigration Solutions Inc. Logo"
          width={compact ? 40 : 60}
          height={compact ? 40 : 60}
          className="rounded-full"
        />
        {!compact && (
          <div className="ml-3 hidden sm:flex flex-col">
            <span className="text-lg md:text-xl font-bold text-indigo-600 dark:text-indigo-400 leading-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">
              THE NINTH HOUSE
            </span>
            <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-medium leading-tight group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              IMMIGRATION SOLUTIONS INC
            </span>
          </div>
        )}
      </div>
    </Link>
  );
} 