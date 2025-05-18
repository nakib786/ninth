import { Metadata } from 'next';
import AboutUs from '@/components/about/AboutUs';

export const metadata: Metadata = {
  title: 'About Us | IRCC Consultant Portal',
  description: 'Learn more about our immigration consultants and our services',
};

export default function AboutUsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <AboutUs />
    </main>
  );
} 