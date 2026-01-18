import React from 'react';
import { STATS } from '../constants';
import { Users, MessageSquare, Clock, FileSearch } from 'lucide-react';

const icons = [Users, MessageSquare, Clock, FileSearch];

export const StatsCounter: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {STATS.map((stat, index) => {
        const Icon = icons[index % icons.length];
        return (
          <div 
            key={stat.label} 
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300"
          >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-3">
              <Icon className="h-6 w-6" />
            </div>
            <span className="text-2xl md:text-3xl font-bold text-slate-900 block mb-1">
              {stat.value}
            </span>
            <span className="text-sm text-slate-500 font-medium uppercase tracking-wide">
              {stat.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};