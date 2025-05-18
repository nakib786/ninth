"use client";

import { GlowingContainer } from "./glowing-container";
import { GlowingEffect } from "./glowing-effect";
import { Mockup } from "./mockup";

export function GlowingExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">GlowingContainer</h3>
        <GlowingContainer disabled={false} className="p-6 h-48 flex items-center justify-center">
          <p className="text-center">Hover around the edges to see the glowing effect</p>
        </GlowingContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">White variant</h3>
        <GlowingContainer 
          disabled={false} 
          variant="white" 
          className="p-6 h-48 flex items-center justify-center bg-gray-900 text-white"
        >
          <p className="text-center">White variant on dark background</p>
        </GlowingContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Mockup with Glowing</h3>
        <Mockup 
          glowing={true} 
          glowingDisabled={false} 
          className="p-6 h-48 flex items-center justify-center"
        >
          <p className="text-center">Mockup with glowing effect enabled</p>
        </Mockup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Custom Border Width</h3>
        <GlowingContainer 
          disabled={false} 
          borderWidth={2}
          className="p-6 h-48 flex items-center justify-center"
        >
          <p className="text-center">Thicker border (2px)</p>
        </GlowingContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Custom Element</h3>
        <div className="relative rounded-lg p-6 h-48 flex items-center justify-center border border-slate-200 dark:border-slate-800">
          <GlowingEffect disabled={false} />
          <p className="text-center">Custom element with GlowingEffect directly</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Static (Disabled)</h3>
        <GlowingContainer 
          disabled={true}
          glow={true} 
          className="p-6 h-48 flex items-center justify-center"
        >
          <p className="text-center">Static border (animation disabled)</p>
        </GlowingContainer>
      </div>
    </div>
  );
} 