import { Metadata } from 'next';
import BlogPosts from '@/components/blog/BlogPosts';

export const metadata: Metadata = {
  title: 'Blog | IRCC Consultant Portal',
  description: 'Immigration consultant insights and expert analysis',
};

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <BlogPosts />
    </main>
  );
} 