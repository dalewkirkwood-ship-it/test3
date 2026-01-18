import React from 'react';
import { Globe, UserCircle, Plus } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface HeaderProps {
  onNavigate: (pageId: string) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
             <div className="w-8 h-8 bg-blue-600 rounded-md mr-3 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                <span className="text-white font-bold text-lg">P</span>
             </div>
             <span className="font-bold text-xl text-slate-800 tracking-tight group-hover:text-black transition-colors">PPIE Insights</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-6">
            {NAV_LINKS.map((link) => {
              if (link.id === 'create_event') {
                return (
                  <button
                    key={link.label}
                    onClick={() => onNavigate(link.id)}
                    className="ml-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    <Plus className="h-4 w-4 mr-1.5 stroke-[3]" />
                    {link.label}
                  </button>
                );
              }

              return (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.id)}
                  className={`${
                    currentPage === link.id || (link.id === 'home' && currentPage === 'home') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  } px-3 py-2 rounded-md text-sm font-medium transition-all duration-200`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Lang + Login */}
          <div className="flex items-center space-x-4">
            <button 
              className="flex items-center text-slate-500 hover:text-slate-800 focus:outline-none"
              aria-label="Select Language"
            >
              <Globe className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">EN</span>
            </button>
            
            <div className="h-6 w-px bg-slate-300 mx-2" />

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => onNavigate('login')}
                className={`flex items-center text-sm font-medium hover:text-blue-600 transition-colors ${currentPage === 'login' ? 'text-blue-600' : 'text-slate-700'}`}
              >
                <UserCircle className="h-5 w-5 mr-1" />
                Login
              </button>
              <span className="text-slate-300">/</span>
              <button 
                onClick={() => onNavigate('register')}
                className={`text-sm font-medium hover:text-blue-800 transition-colors ${currentPage === 'register' ? 'text-blue-800' : 'text-blue-600'}`}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};