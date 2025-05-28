import { Metadata } from 'next';
import ExpressEntryCalculator from '@/components/calculator/ExpressEntryCalculator';

export const metadata: Metadata = {
  title: 'Express Entry | IRCC Consultant Portal',
  description: 'Calculate your Comprehensive Ranking System (CRS) points for Express Entry',
};

export default function ExpressEntryPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ExpressEntryCalculator />
    </main>
  );
} 