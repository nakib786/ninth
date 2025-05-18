'use client';

import { useState, useEffect } from 'react';

interface TypewriterBrandProps {
  className?: string;
}

export function TypewriterBrand({ className }: TypewriterBrandProps) {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  // Combine both lines with a visible line break character
  const fullText = 'THE NINTH HOUSE\nIMMIGRATION SOLUTIONS INC';
  
  useEffect(() => {
    const typingSpeed = 150; // typing speed in ms
    const deletingSpeed = 80; // deleting speed in ms
    const delayBeforeDelete = 2000; // time to wait before deleting everything
    const delayBeforeRestart = 1000; // time to wait before restarting the animation
    
    let timer: NodeJS.Timeout;
    
    if (isTyping) {
      if (text.length < fullText.length) {
        timer = setTimeout(() => {
          setText(fullText.substring(0, text.length + 1));
        }, typingSpeed);
      } else {
        setIsTyping(false);
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBeforeDelete);
      }
    } else if (isDeleting) {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(text.substring(0, text.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(() => {
          setIsTyping(true);
        }, delayBeforeRestart);
      }
    }
    
    return () => clearTimeout(timer);
  }, [text, isTyping, isDeleting, loopNum, fullText]);
  
  // Split the text into lines
  const lines = text.split('\n');
  const mainLine = lines[0] || '';
  const subLine = lines[1] || '';
  
  // Determine where to show the cursor
  const showCursorOnMain = isTyping && !lines[1];
  const showCursorOnSub = isTyping && lines[1] && text.length < fullText.length;
  
  return (
    <div className={`text-left ${className}`}>
      <div>
        <div className="text-base font-bold text-indigo-600 dark:text-indigo-400 leading-tight">
          {mainLine}
          {showCursorOnMain && (
            <span className="inline-block w-1 h-4 bg-indigo-600 dark:bg-indigo-400 ml-0.5 animate-blink align-middle"></span>
          )}
        </div>
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-tight">
          {subLine}
          {showCursorOnSub && (
            <span className="inline-block w-1 h-3 bg-gray-700 dark:bg-gray-300 ml-0.5 animate-blink align-middle"></span>
          )}
        </div>
      </div>
    </div>
  );
} 