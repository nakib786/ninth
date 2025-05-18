import { cn } from "@/lib/utils"
import { GradientButton } from "@/components/ui/gradient-button"
import { Glow } from "@/components/ui/glow"
import { GitHubIcon } from "@/components/ui/icons"
import Image from "next/image"

interface HeroWithMockupProps {
  title: string
  description: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  mockupImage: {
    src: string
    alt: string
    width: number
    height: number
  }
  className?: string
}

export function HeroWithMockup({
  title,
  description,
  primaryCta = {
    text: "Get Started",
    href: "/get-started",
  },
  secondaryCta = {
    text: "GitHub",
    href: "https://github.com/your-repo",
    icon: <GitHubIcon className="mr-2 h-4 w-4" />,
  },
  mockupImage,
  className,
}: HeroWithMockupProps) {
  return (
    <section
      className={cn(
        "relative bg-background text-foreground",
        "py-12 px-4 md:py-24 lg:py-32",
        "overflow-hidden",
        className,
      )}
    >
      <div className="relative mx-auto max-w-[1280px] flex flex-col gap-12 lg:gap-24">
        <div className="relative z-10 flex flex-col items-center gap-6 pt-8 md:pt-16 text-center lg:gap-12">
          {/* Heading */}
          <h1
            className={cn(
              "inline-block animate-appear",
              "bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground",
              "bg-clip-text text-transparent",
              "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
              "leading-[1.1] sm:leading-[1.1]",
              "drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]",
            )}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className={cn(
              "max-w-[550px] animate-appear opacity-0 [animation-delay:150ms]",
              "text-base sm:text-lg md:text-xl",
              "text-muted-foreground",
              "font-medium",
            )}
          >
            {description}
          </p>

          {/* CTAs */}
          <div
            className="relative z-10 flex flex-wrap justify-center gap-4 
            animate-appear opacity-0 [animation-delay:300ms]"
          >
            <GradientButton
              asChild
              className="text-white"
            >
              <a href={primaryCta.href}>{primaryCta.text}</a>
            </GradientButton>

            <GradientButton
              asChild
              variant="variant"
            >
              <a href={secondaryCta.href}>
                {secondaryCta.icon}
                {secondaryCta.text}
              </a>
            </GradientButton>
          </div>

          {/* Mockup */}
          <div className="relative w-full pt-12 px-4 sm:px-6 lg:px-8">
            <div
              className={cn(
                "animate-appear opacity-0 [animation-delay:700ms]",
                "shadow-lg border border-gray-200 dark:border-gray-800",
                "rounded-lg overflow-hidden",
              )}
            >
              <Image
                src={mockupImage.src}
                alt={mockupImage.alt}
                width={mockupImage.width}
                height={mockupImage.height}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>
    </section>
  )
}
