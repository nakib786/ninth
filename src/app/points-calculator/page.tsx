import { Metadata } from 'next';
import PointsCalculator from '@/components/calculator/PointsCalculator';

export const metadata: Metadata = {
  title: 'Points Calculator | IRCC Consultant Portal',
  description: 'Calculate your immigration points for Express Entry and Provincial Nominee Programs',
};

export default function PointsCalculatorPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <PointsCalculator />
    </main>
  );
} 