import React from 'react';
import { IMPACT_REPORTS } from '../constants';
import { FileText, Users, Clock, ArrowRight } from 'lucide-react';

export const ImpactTiles: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {IMPACT_REPORTS.map((report) => (
        <div 
          key={report.id} 
          className="group relative bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 h-64 flex flex-col"
        >
          {/* Main Content (Visible by default) */}
          <div className="p-5 flex flex-col h-full relative z-10 bg-white group-hover:-translate-y-full transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold text-slate-400 border border-slate-200 px-2 py-1 rounded">
                {report.date}
              </span>
            </div>
            
            <h3 className="font-bold text-lg text-slate-800 mb-auto leading-tight">
              {report.title}
            </h3>

            <div className="space-y-2 mt-4">
              <div className="flex items-center text-sm text-slate-600">
                <Users className="h-4 w-4 mr-2 text-slate-400" />
                <span>{report.participants} People involved</span>
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Clock className="h-4 w-4 mr-2 text-slate-400" />
                <span>{report.hours} Hours of engagement</span>
              </div>
            </div>
          </div>

          {/* Exec Summary (Slides up on hover) */}
          <div className="absolute inset-0 bg-slate-900 p-5 flex flex-col justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-20">
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Executive Summary</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {report.summary}
              </p>
            </div>
            <a 
              href={report.link}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium mt-4"
            >
              Read full report <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};