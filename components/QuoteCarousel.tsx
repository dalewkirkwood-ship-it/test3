import React, { useState } from 'react';
import { QUOTES } from '../constants';
import { ChevronLeft, ChevronRight, Quote as QuoteIcon } from 'lucide-react';

export const QuoteCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
  };

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
  };

  const currentPair = QUOTES[currentIndex];

  return (
    <div className="relative w-full bg-slate-50 rounded-2xl overflow-hidden shadow-sm border border-slate-200 my-8">
      <div className="flex flex-col md:flex-row min-h-[300px]">
        {/* Left Side: Public/Patient */}
        <div className="flex-1 bg-gradient-to-br from-teal-500 to-teal-600 p-8 md:p-12 text-white flex flex-col justify-center relative">
          <QuoteIcon className="absolute top-6 left-6 h-12 w-12 text-teal-400 opacity-50" />
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-teal-800 bg-opacity-30 rounded-full text-xs font-semibold mb-4 tracking-wider uppercase border border-teal-400 border-opacity-30">
              Patient / Public Voice
            </span>
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6 font-serif italic">
              "{currentPair.public.text}"
            </blockquote>
            <div>
              <p className="font-bold text-lg">{currentPair.public.author}</p>
              <p className="text-teal-100 text-sm">{currentPair.public.role}</p>
            </div>
          </div>
        </div>

        {/* Right Side: System Leader */}
        <div className="flex-1 bg-white p-8 md:p-12 text-slate-800 flex flex-col justify-center relative">
           <QuoteIcon className="absolute top-6 left-6 h-12 w-12 text-slate-200 opacity-50" />
           <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-4 tracking-wider uppercase">
              System Leadership
            </span>
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6 font-serif italic text-slate-700">
              "{currentPair.leader.text}"
            </blockquote>
            <div>
              <p className="font-bold text-lg">{currentPair.leader.author}</p>
              <p className="text-slate-500 text-sm">{currentPair.leader.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button 
        onClick={prevQuote}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 md:bg-white md:text-slate-800 md:shadow-lg rounded-full backdrop-blur-sm transition-all text-white border border-transparent md:border-slate-100"
        aria-label="Previous quote"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={nextQuote}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 md:bg-slate-800 md:text-white md:shadow-lg rounded-full backdrop-blur-sm transition-all text-white"
        aria-label="Next quote"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {QUOTES.map((_, idx) => (
          <div 
            key={idx}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-white w-6 md:bg-slate-800' : 'bg-white/50 md:bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};