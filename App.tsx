import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { EngagementActivityPage } from './pages/EngagementActivityPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';
import { CreateEventPage } from './pages/CreateEventPage';
import { EventHostingPage } from './pages/EventHostingPage';
import { LearningHubPage } from './pages/LearningHubPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const Banner = () => (
    <div className="bg-red-700 text-white text-center py-6 px-4">
      <div className="text-xl md:text-2xl font-bold uppercase tracking-wide leading-tight">
        Prototype PPIE National Insight Tool Development for NHS Transform Funding
      </div>
      <div className="text-base md:text-lg mt-2 font-medium opacity-95">
        by Dr Dale Kirkwood, Communication and Involvement Director of Lancashire and South Cumbria's Data into Impact Programme
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Banner />

      <Header onNavigate={handleNavigate} currentPage={currentPage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'activity' && <EngagementActivityPage />}
        {currentPage === 'register' && <RegistrationPage />}
        {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
        {currentPage === 'create_event' && <CreateEventPage />}
        {currentPage === 'hosting' && <EventHostingPage />}
        {currentPage === 'learning_hub' && <LearningHubPage />}

        {/* Fallback for other links */}
        {(currentPage !== 'home' && currentPage !== 'activity' && currentPage !== 'register' && currentPage !== 'login' && currentPage !== 'create_event' && currentPage !== 'hosting' && currentPage !== 'learning_hub') && (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold text-slate-400">Page under construction</h2>
            <button onClick={() => handleNavigate('home')} className="mt-4 text-blue-600 hover:underline">Return Home</button>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p className="mb-4">&copy; 2024 PPIE Insights Tool. Conforms to FAIR & Five Safes Principles.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Use</a>
            <a href="#" className="hover:text-slate-900">Accessibility</a>
          </div>
        </div>
      </footer>

      <Banner />
    </div>
  );
};

export default App;