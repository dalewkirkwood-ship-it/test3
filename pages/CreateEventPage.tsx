import React, { useState } from 'react';
import { ActivityType, EventSession } from '../types';
import { Calendar, Clock, MapPin, Users, PoundSterling, Plus, Trash2, Video, Wifi, Building, Search, ArrowRight } from 'lucide-react';

export const CreateEventPage: React.FC = () => {
  const [isMultiDay, setIsMultiDay] = useState(false);
  const [sessions, setSessions] = useState<EventSession[]>([{ date: '', startTime: '', endTime: '' }]);
  const [otherFacilitators, setOtherFacilitators] = useState<string[]>([]);
  const [newFacilitator, setNewFacilitator] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    type: ActivityType.FOCUS_GROUP,
    locationType: 'online' as 'online' | 'in-person',
    postcode: '',
    isHybrid: false,
    venueCost: 0,
    leadFacilitator: '',
    publicMemberPay: 0,
    desiredAttendance: 0,
    outreachType: 'in-reach' as 'in-reach' | 'out-reach',
  });

  const handleSessionChange = (index: number, field: keyof EventSession, value: string) => {
    const newSessions = [...sessions];
    newSessions[index] = { ...newSessions[index], [field]: value };
    setSessions(newSessions);
  };

  const addSession = () => {
    setSessions([...sessions, { date: '', startTime: '', endTime: '' }]);
  };

  const removeSession = (index: number) => {
    if (sessions.length > 1) {
      setSessions(sessions.filter((_, i) => i !== index));
    }
  };

  const toggleMultiDay = () => {
    if (isMultiDay) {
        // Switching back to single day - keep only first session
        setSessions([sessions[0]]);
    }
    setIsMultiDay(!isMultiDay);
  };

  const handleLocationTypeChange = (type: 'online' | 'in-person') => {
    setFormData(prev => ({
        ...prev,
        locationType: type,
        venueCost: type === 'online' ? 0 : prev.venueCost,
        postcode: type === 'online' ? '' : prev.postcode
    }));
  };

  const addFacilitator = () => {
    if (newFacilitator.trim()) {
      setOtherFacilitators([...otherFacilitators, newFacilitator.trim()]);
      setNewFacilitator('');
    }
  };

  const removeFacilitator = (index: number) => {
    setOtherFacilitators(otherFacilitators.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Event Created Successfully (Simulation)");
    // In real app, would save to backend/context
  };

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-200 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Create New Event</h1>
                <p className="text-slate-500 mt-1">Plan and register your upcoming engagement activity.</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Calendar className="h-6 w-6" />
            </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* 1. Basic Info */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Event Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Event Name</label>
                        <input 
                            required
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Health Data Strategy Workshop"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Event Type</label>
                        <select 
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value as ActivityType})}
                        >
                            {Object.values(ActivityType).map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Community Interaction Type</label>
                         <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button
                                type="button"
                                onClick={() => setFormData({...formData, outreachType: 'in-reach'})}
                                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${formData.outreachType === 'in-reach' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                In-Reach (Coming to us)
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({...formData, outreachType: 'out-reach'})}
                                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${formData.outreachType === 'out-reach' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Out-Reach (Going to them)
                            </button>
                         </div>
                         <p className="text-xs text-slate-400 mt-1">
                            {formData.outreachType === 'in-reach' ? 'Participants visit a host institution venue.' : 'Event held at community centre, library, mosque, etc.'}
                         </p>
                    </div>
                </div>
            </div>

            {/* 2. Schedule */}
            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Date & Time</h3>
                    <button 
                        type="button"
                        onClick={toggleMultiDay}
                        className={`text-xs font-medium px-3 py-1 rounded-full transition-colors border ${isMultiDay ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
                    >
                        {isMultiDay ? 'Multi-Day Event Active' : 'Enable Multi-Day Event'}
                    </button>
                </div>

                {isMultiDay ? (
                    <div className="space-y-3">
                         <div className="grid grid-cols-10 gap-2 text-xs font-semibold text-slate-500 uppercase">
                            <div className="col-span-4">Date</div>
                            <div className="col-span-2">Start</div>
                            <div className="col-span-2">End</div>
                            <div className="col-span-2">Action</div>
                         </div>
                         {sessions.map((session, idx) => (
                             <div key={idx} className="grid grid-cols-10 gap-2 items-center">
                                 <div className="col-span-4">
                                     <input 
                                        type="date" 
                                        required
                                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                                        value={session.date}
                                        onChange={(e) => handleSessionChange(idx, 'date', e.target.value)}
                                     />
                                 </div>
                                 <div className="col-span-2">
                                     <input 
                                        type="time" 
                                        required
                                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                                        value={session.startTime}
                                        onChange={(e) => handleSessionChange(idx, 'startTime', e.target.value)}
                                     />
                                 </div>
                                 <div className="col-span-2">
                                     <input 
                                        type="time" 
                                        required
                                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                                        value={session.endTime}
                                        onChange={(e) => handleSessionChange(idx, 'endTime', e.target.value)}
                                     />
                                 </div>
                                 <div className="col-span-2 flex items-center space-x-2">
                                    {sessions.length > 1 && (
                                        <button type="button" onClick={() => removeSession(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    )}
                                    {idx === sessions.length - 1 && (
                                        <button type="button" onClick={addSession} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    )}
                                 </div>
                             </div>
                         ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                            <input 
                                type="date"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                                value={sessions[0].date}
                                onChange={(e) => handleSessionChange(0, 'date', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Start Time</label>
                            <input 
                                type="time"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                                value={sessions[0].startTime}
                                onChange={(e) => handleSessionChange(0, 'startTime', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">End Time</label>
                            <input 
                                type="time"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                                value={sessions[0].endTime}
                                onChange={(e) => handleSessionChange(0, 'endTime', e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* 3. Location & Logistics */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Location & Logistics</h3>
                
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                        <label className="block text-sm font-medium text-slate-700">Event Location</label>
                        <div className="flex gap-4">
                            <label className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.locationType === 'online' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300'}`}>
                                <input 
                                    type="radio" 
                                    name="locationType" 
                                    className="sr-only" 
                                    checked={formData.locationType === 'online'}
                                    onChange={() => handleLocationTypeChange('online')}
                                />
                                <Video className="h-6 w-6 mb-2" />
                                <span className="font-medium">Online Only</span>
                            </label>
                            
                            <label className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.locationType === 'in-person' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300'}`}>
                                <input 
                                    type="radio" 
                                    name="locationType" 
                                    className="sr-only" 
                                    checked={formData.locationType === 'in-person'}
                                    onChange={() => handleLocationTypeChange('in-person')}
                                />
                                <Building className="h-6 w-6 mb-2" />
                                <span className="font-medium">In-Person</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        {formData.locationType === 'in-person' && (
                             <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Postcode Lookup</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Enter Venue Postcode"
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.postcode}
                                        onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                                    />
                                </div>
                                
                                <div className="flex items-center mt-4">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="hybrid-toggle"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                            checked={formData.isHybrid}
                                            onChange={(e) => setFormData({...formData, isHybrid: e.target.checked})}
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label htmlFor="hybrid-toggle" className="text-sm font-medium text-slate-700 flex items-center">
                                            <Wifi className="h-4 w-4 mr-1 text-slate-400" />
                                            Enable Hybrid Option
                                        </label>
                                        <p className="text-xs text-slate-500">Allows remote attendees to join via video link.</p>
                                    </div>
                                </div>
                             </div>
                        )}
                        {formData.locationType === 'online' && (
                            <div className="h-full flex items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
                                Online events default to no venue cost.
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Desired Attendance</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input 
                                type="number" 
                                min="1"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.desiredAttendance || ''}
                                onChange={(e) => setFormData({...formData, desiredAttendance: parseInt(e.target.value) || 0})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Venue Cost (£)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                            <input 
                                type="number" 
                                min="0"
                                disabled={formData.locationType === 'online'}
                                className="w-full pl-8 pr-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
                                value={formData.venueCost}
                                onChange={(e) => setFormData({...formData, venueCost: parseFloat(e.target.value) || 0})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Public Member Pay (£)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">£</span>
                            <input 
                                type="number" 
                                min="0"
                                className="w-full pl-8 pr-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.publicMemberPay}
                                onChange={(e) => setFormData({...formData, publicMemberPay: parseFloat(e.target.value) || 0})}
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Per person payment.</p>
                    </div>
                </div>
            </div>

            {/* 4. Facilitators */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Facilitation Team</h3>
                
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Lead Facilitator</label>
                    <div className="relative">
                         <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                         <input 
                            type="text"
                            placeholder="Search PPIE Directory..."
                            list="facilitators-list"
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.leadFacilitator}
                            onChange={(e) => setFormData({...formData, leadFacilitator: e.target.value})}
                         />
                         <datalist id="facilitators-list">
                            <option value="Dr. Sarah Johnson (University of Manchester)" />
                            <option value="Mark Smith (NHS England)" />
                            <option value="Participate Ltd (External Agency)" />
                            <option value="Community Voices Team" />
                         </datalist>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Other Facilitators</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {otherFacilitators.map((fac, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center shadow-sm border border-blue-100">
                                {fac}
                                <button type="button" onClick={() => removeFacilitator(idx)} className="ml-2 hover:text-blue-900"><Trash2 className="h-3 w-3" /></button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Add facilitator name"
                            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                            value={newFacilitator}
                            onChange={(e) => setNewFacilitator(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFacilitator())}
                        />
                        <button 
                            type="button" 
                            onClick={addFacilitator}
                            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium flex items-center"
                        >
                            <Plus className="h-4 w-4 mr-1" /> Add
                        </button>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md flex items-center"
                >
                    Create Event
                    <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            </div>

        </form>
      </div>
    </div>
  );
};