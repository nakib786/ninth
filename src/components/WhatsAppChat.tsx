"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "17785383555";
  
  const presetQuestions = [
    "Hello! I'm interested in Express Entry immigration. Can you help me?",
    "What documents do I need for a study permit application?",
    "How can I check my eligibility for Canadian PR?",
    "I need help with my LMIA application process.",
    "What are the requirements for family sponsorship?"
  ];

  const handleQuestionClick = (question: string) => {
    const encodedQuestion = encodeURIComponent(question);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedQuestion}`, '_blank');
  };

  // Get current time for the chat messages
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group relative"
        aria-label="Open WhatsApp Chat"
      >
        {!isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.447.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        )}
        
        <span className="absolute -top-10 right-0 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs rounded-lg py-1 px-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat with us
        </span>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-indigo-600 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 flex-shrink-0 bg-white rounded-full flex items-center justify-center overflow-hidden p-0.5">
                <Image 
                  src="/images/logo.png" 
                  alt="The Ninth House Logo" 
                  width={32} 
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-white font-medium text-xs leading-tight">THE NINTH HOUSE</h3>
                <p className="text-indigo-100 text-[10px] leading-tight">IMMIGRATION SOLUTION INC.</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-indigo-200 transition-colors"
              aria-label="Close WhatsApp Chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
          
          {/* Chat Body */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900 h-80 overflow-auto">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm mb-4 max-w-3/4 ml-auto text-right">
              <p className="text-gray-800 dark:text-gray-200 text-sm">Hi there! 👋 How can we help you with your immigration needs today?</p>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">{currentTime}</span>
            </div>
            
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg shadow-sm mb-4 max-w-3/4">
              <p className="text-gray-800 dark:text-gray-200 text-sm">Choose from the frequently asked questions below or send us a custom message!</p>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">{currentTime}</span>
            </div>
          </div>
          
          {/* Question Options */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-2">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Ask a question:</h4>
            {presetQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(question)}
                className="w-full text-left p-2 rounded-lg text-xs border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              >
                {question}
              </button>
            ))}
            
            <a 
              href={`https://wa.me/${phoneNumber}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white text-center py-2 px-4 rounded-lg text-sm flex items-center justify-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
              </svg>
              Start a New Chat
            </a>
          </div>
        </div>
      )}
    </div>
  );
} 