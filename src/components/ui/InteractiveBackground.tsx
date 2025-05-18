'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * window.innerHeight / 15000), 100);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const isDark = theme === 'dark';
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      if (isDark) {
        gradient.addColorStop(0, 'rgba(20, 20, 30, 1)');
        gradient.addColorStop(1, 'rgba(30, 30, 45, 1)');
      } else {
        gradient.addColorStop(0, 'rgba(245, 247, 250, 1)');
        gradient.addColorStop(1, 'rgba(235, 240, 245, 1)');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particlesRef.current.forEach((particle, i) => {
        const distance = Math.sqrt(
          Math.pow(mousePositionRef.current.x - particle.x, 2) +
          Math.pow(mousePositionRef.current.y - particle.y, 2)
        );
        
        const maxDistance = 200;
        const influence = Math.max(0, 1 - distance / maxDistance);
        
        // Particle movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Mouse influence
        if (influence > 0) {
          const angle = Math.atan2(
            mousePositionRef.current.y - particle.y,
            mousePositionRef.current.x - particle.x
          );
          particle.x += Math.cos(angle) * influence * 0.5;
          particle.y += Math.sin(angle) * influence * 0.5;
        }
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        const particleColor = isDark 
          ? `rgba(100, 120, 255, ${particle.opacity * (1 + influence)})` 
          : `rgba(70, 130, 180, ${particle.opacity * (1 + influence)})`;
          
        ctx.fillStyle = particleColor;
        ctx.fill();
        
        // Draw connections
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            
            const lineOpacity = isDark 
              ? 0.15 * (1 - dist / 120) 
              : 0.1 * (1 - dist / 120);
              
            ctx.strokeStyle = isDark 
              ? `rgba(100, 120, 255, ${lineOpacity})` 
              : `rgba(70, 130, 180, ${lineOpacity})`;
              
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationFrameRef.current = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default InteractiveBackground; 