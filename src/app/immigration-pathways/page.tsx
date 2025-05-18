import { Metadata } from 'next';
import ImmigrationPathways from '@/components/consultant/ImmigrationPathways';

export const metadata: Metadata = {
  title: 'Immigration Pathways | IRCC Consultant Portal',
  description: 'Explore different immigration programs and pathways to Canada',
};

export default function ImmigrationPathwaysPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ImmigrationPathways />
    </main>
  );
} 