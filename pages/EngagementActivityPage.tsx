import React, { useState } from 'react';
import { ACTIVITY_POINTS, ACTIVITY_COLORS } from '../constants';
import { ActivityType } from '../types';
import { Search, Filter, Calendar, MapPin, Users, Download, ChevronRight, ChevronLeft } from 'lucide-react';

export const EngagementActivityPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  // Filter Logic
  const filteredActivities = ACTIVITY_POINTS.filter(activity => {
    const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          activity.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          activity.activityType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || activity.activityType === selectedType;
    const matchesRegion = selectedRegion === 'All' || activity.locationName === selectedRegion; // Simple region match by city name for now

    return matchesSearch && matchesType && matchesRegion;
  });

  // Extract unique locations for filter
  const locations = Array.from(new Set(ACTIVITY_POINTS.map(p => p.locationName))).sort();

  return (
    <div className="py-8 space-y-8">
      {/* Page Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Engagement Activity Log</h1>
        <p className="text-slate-500 text-lg">
          A comprehensive registry of public involvement activities, townhalls, and data access committees.
        </p>
        
        {/* Filters Toolbar */}
        <div className="mt-8 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by topic, keyword, or ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 lg:pb-0">
            <div className="relative min-w-[180px]">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <select 
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All Activity Types</option>
                {Object.values(ActivityType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="relative min-w-[180px]">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <select 
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="All">All Locations</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <button className="flex items-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors border border-slate-200">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Activity Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">Topic / Description</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Participants</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => {
                  const isPast = new Date(activity.date) < new Date();
                  return (
                    <tr key={activity.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                          {activity.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                          style={{ 
                            backgroundColor: `${ACTIVITY_COLORS[activity.activityType]}15`, // 15 = low opacity hex
                            color: ACTIVITY_COLORS[activity.activityType],
                            borderColor: `${ACTIVITY_COLORS[activity.activityType]}30`
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: ACTIVITY_COLORS[activity.activityType] }}></span>
                          {activity.activityType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 leading-snug">
                        {activity.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {activity.locationName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-right font-medium">
                        {activity.participants}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md ${isPast ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {isPast ? 'Completed' : 'Scheduled'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-slate-400 hover:text-blue-600 transition-colors">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <p className="text-lg font-medium mb-1">No activities found</p>
                    <p className="text-sm">Try adjusting your filters or search terms.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Mockup */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-900">{filteredActivities.length > 0 ? 1 : 0}</span> to <span className="font-medium text-slate-900">{filteredActivities.length}</span> of <span className="font-medium text-slate-900">{filteredActivities.length}</span> results
            </span>
            <div className="flex space-x-2">
                <button disabled className="px-3 py-1 border border-slate-300 rounded-md bg-white text-slate-400 cursor-not-allowed">
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <button disabled className="px-3 py-1 border border-slate-300 rounded-md bg-white text-slate-400 cursor-not-allowed">
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};