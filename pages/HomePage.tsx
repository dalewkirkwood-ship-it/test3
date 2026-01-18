import React from 'react';
import { StatsCounter } from '../components/StatsCounter';
import { QuoteCarousel } from '../components/QuoteCarousel';
import { EngagementMap } from '../components/EngagementMap';
import { ImpactTiles } from '../components/ImpactTiles';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 py-8">
        
        {/* Quote Carousel */}
        <section aria-labelledby="voices-heading">
           <h2 id="voices-heading" className="sr-only">Voices of Public and Leadership</h2>
           <QuoteCarousel />
        </section>

        {/* Dashboard Main Area */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-4">
            <div>
               <h2 className="text-2xl font-bold text-slate-900">National Engagement Overview</h2>
               <p className="text-slate-500 mt-1">Real-time transparency of PPIE activities across the UK</p>
            </div>
            <div className="text-right hidden md:block">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Data</span>
                <div className="flex items-center justify-end text-sm text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    System Operational
                </div>
            </div>
          </div>

          {/* Key Metrics */}
          <StatsCounter />

          {/* Map Visualization */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Geographic Distribution</h3>
                <div className="flex space-x-2">
                    <button 
                      onClick={() => onNavigate('activity')}
                      className="px-3 py-1 text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md transition-colors font-medium"
                    >
                      View All Activities
                    </button>
                </div>
            </div>
            <EngagementMap />
          </section>
        </div>

        {/* Recent Impacts */}
        <section aria-labelledby="impact-heading">
           <div className="flex items-center space-x-4 mb-2">
             <h2 id="impact-heading" className="text-2xl font-bold text-slate-900">Recent Impact Reports</h2>
             <div className="h-px bg-slate-200 flex-1"></div>
             <a href="#all-impacts" onClick={(e) => {e.preventDefault(); onNavigate('impacts')}} className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Archive</a>
           </div>
           <ImpactTiles />
        </section>

        {/* Learning Hub Teaser */}
        <section className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Learning Hub</h2>
                <p className="text-blue-100 mb-8 text-lg">Access toolkits, training modules, and resources to support high-quality public involvement in data research.</p>
                <div className="flex justify-center space-x-4">
                    <button className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors">Browse Resources</button>
                    <button className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Start Training</button>
                </div>
            </div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
        </section>

    </div>
  );
};