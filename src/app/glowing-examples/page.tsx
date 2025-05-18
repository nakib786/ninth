import { GlowingExamples } from "@/components/ui/GlowingExamples";

export default function GlowingExamplesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Glowing Effect Examples</h1>
          <p className="text-muted-foreground">
            This page showcases the different ways to use the GlowingEffect component 
            throughout the project. Hover around the borders of each container to see the effect.
          </p>
        </div>
        
        <GlowingExamples />
        
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Usage Guidelines</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              The Glowing Effect can be used in various ways across the project:
            </p>
            <ul>
              <li>
                <strong>GlowingContainer</strong> - Use this for any content that needs a container with the glowing effect
              </li>
              <li>
                <strong>Direct GlowingEffect</strong> - Add directly to any relative positioned elements with rounded corners
              </li>
              <li>
                <strong>Mockup Components</strong> - The Mockup components have built-in support for the glowing effect
              </li>
            </ul>
            <p>
              To maintain visual consistency, consider these guidelines:
            </p>
            <ul>
              <li>Use the default variant for light backgrounds and white variant for dark backgrounds</li>
              <li>Keep border-width consistent at 1px unless there&apos;s a specific design reason to change it</li>
              <li>Set disabled to false to enable the effect, or true to show just a static border</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 