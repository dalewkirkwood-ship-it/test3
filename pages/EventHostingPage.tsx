import React, { useState } from 'react';
import { FUTURE_EVENTS } from '../constants';
import { FutureEvent } from '../types';
import { Calendar, MapPin, Users, Video, Clock, Building2, PoundSterling, Megaphone, QrCode, Printer, Share2, Maximize2, X } from 'lucide-react';

export const EventHostingPage: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [isQrExpanded, setIsQrExpanded] = useState<boolean>(false);
  
  const selectedEvent = FUTURE_EVENTS.find(e => e.id === selectedEventId);

  return (
    <div className="py-8 max-w-5xl mx-auto space-y-8">
       {/* Header */}
       <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Event Hosting Dashboard</h1>
            <p className="text-slate-500 text-lg">Manage your upcoming engagements, track attendance, and access facilitator tools.</p>
       </div>

       {/* Selector */}
       <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-3xl mx-auto">
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Select Registered Event</label>
            <div className="relative">
                <select 
                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-lg appearance-none cursor-pointer shadow-sm"
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                >
                    <option value="">-- Choose an event to manage --</option>
                    {FUTURE_EVENTS.map(event => (
                        <option key={event.id} value={event.id}>
                            {event.sessions[0]?.date} - {event.name} ({event.type})
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Calendar className="h-5 w-5 text-slate-400" />
                </div>
            </div>
       </div>

       {/* Event Details Card */}
       {selectedEvent ? (
           <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-blue-600 px-8 py-6 text-white flex justify-between items-start">
                    <div>
                        <div className="flex items-center space-x-3 mb-2 opacity-90">
                            <span className="uppercase tracking-wider text-xs font-bold border border-blue-400 px-2 py-0.5 rounded bg-blue-700">
                                {selectedEvent.type}
                            </span>
                            {selectedEvent.isMultiDay && (
                                <span className="uppercase tracking-wider text-xs font-bold border border-blue-400 px-2 py-0.5 rounded bg-blue-700 flex items-center">
                                    <Clock className="h-3 w-3 mr-1" /> Multi-Day
                                </span>
                            )}
                        </div>
                        <h2 className="text-3xl font-bold">{selectedEvent.name}</h2>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center min-w-[100px]">
                        <span className="block text-3xl font-bold">{selectedEvent.sessions[0].date.split('-')[2]}</span>
                        <span className="uppercase text-sm font-medium opacity-80">
                            {new Date(selectedEvent.sessions[0].date).toLocaleString('default', { month: 'short' })}
                        </span>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Logistics */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Logistics</h3>
                        
                        <div className="flex items-start">
                             <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mr-3">
                                {selectedEvent.locationType === 'online' ? <Video className="h-5 w-5" /> : <MapPin className="h-5 w-5" />}
                             </div>
                             <div>
                                <p className="font-semibold text-slate-900">
                                    {selectedEvent.locationType === 'online' ? 'Online Event' : 'In-Person Event'}
                                </p>
                                {selectedEvent.locationType === 'in-person' && (
                                    <p className="text-sm text-slate-500">
                                        Postcode: {selectedEvent.postcode} <br/>
                                        {selectedEvent.isHybrid && <span className="text-blue-600 text-xs font-medium bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">Hybrid Enabled</span>}
                                    </p>
                                )}
                             </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-orange-50 p-2 rounded-lg text-orange-600 mr-3">
                                <Megaphone className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">Reach Type</p>
                                <p className="text-sm text-slate-500">
                                    {selectedEvent.outreachType === 'in-reach' ? 'In-Reach (Hosted at Institution)' : 'Out-Reach (Community Venue)'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-green-50 p-2 rounded-lg text-green-600 mr-3">
                                <PoundSterling className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">Financials</p>
                                <p className="text-sm text-slate-500">
                                    Venue: £{selectedEvent.venueCost}<br/>
                                    Public Pay: £{selectedEvent.publicMemberPay} / person
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column: Schedule */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Schedule</h3>
                        <div className="space-y-3">
                            {selectedEvent.sessions.map((session, idx) => (
                                <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 text-slate-400 mr-2" />
                                        <span className="text-sm font-medium text-slate-700">{session.date}</span>
                                    </div>
                                    <div className="text-sm text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                                        {session.startTime} - {session.endTime}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Facilitation */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Facilitation Team</h3>
                        
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Lead Facilitator</p>
                            <div className="flex items-center p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3">
                                    {selectedEvent.leadFacilitator.charAt(0)}
                                </div>
                                <span className="font-medium text-slate-800 text-sm">{selectedEvent.leadFacilitator}</span>
                            </div>
                        </div>

                        {selectedEvent.otherFacilitators.length > 0 && (
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Supporting Team</p>
                                <div className="space-y-2">
                                    {selectedEvent.otherFacilitators.map((fac, i) => (
                                        <div key={i} className="flex items-center text-sm text-slate-600">
                                            <Users className="h-4 w-4 mr-2 text-slate-400" />
                                            {fac}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button className="w-full mt-4 bg-slate-800 hover:bg-slate-900 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                            Manage Attendees & Resources
                        </button>
                    </div>
                </div>

                {/* QR Code Section for Participant Form */}
                <div className="bg-slate-50 border-t border-slate-200 p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
                                <QrCode className="h-5 w-5 mr-2 text-slate-500" />
                                Participation Access
                            </h3>
                            <p className="text-slate-600 mb-4 text-sm leading-relaxed max-w-xl">
                                Direct attendees to the feedback and demographics form by displaying this QR code at your venue or on your slides.
                            </p>
                            <div className="flex space-x-4">
                                <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                                    <Printer className="h-4 w-4 mr-1" />
                                    Print Code
                                </button>
                                <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                                    <Share2 className="h-4 w-4 mr-1" />
                                    Copy Link
                                </button>
                            </div>
                        </div>
                        
                        <div 
                            className="flex items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-blue-400 transition-colors group"
                            onClick={() => setIsQrExpanded(true)}
                            title="Click to expand QR Code"
                        >
                             <div className="bg-white p-2 relative">
                                <img 
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ppie-insights.nhs.uk/participate/${selectedEvent.id}`} 
                                    alt="Event Participation QR Code" 
                                    className="w-24 h-24"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded">
                                    <Maximize2 className="h-8 w-8 text-slate-800 bg-white/80 p-1.5 rounded-full" />
                                </div>
                             </div>
                             <div className="ml-4 border-l border-slate-100 pl-4">
                                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Scan to Join</p>
                                 <p className="text-sm font-bold text-slate-900 mb-0.5">Participation Form</p>
                                 <code className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                    /participate/{selectedEvent.id}
                                 </code>
                             </div>
                        </div>
                    </div>
                </div>
           </div>
       ) : (
           <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Select an event above to view hosting details.</p>
           </div>
       )}

       {/* Full Screen QR Modal */}
       {isQrExpanded && selectedEvent && (
            <div 
                className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                onClick={() => setIsQrExpanded(false)}
            >
                <div 
                    className="bg-white p-8 md:p-12 rounded-3xl max-w-2xl w-full flex flex-col items-center text-center shadow-2xl relative animate-in zoom-in-95 duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={() => setIsQrExpanded(false)}
                        className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-6 w-6 text-slate-600" />
                    </button>
                    
                    <h3 className="text-3xl font-bold text-slate-900 mb-3">Join Event Participation</h3>
                    <p className="text-slate-500 mb-8 text-xl">Scan this code with your mobile device.</p>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-inner border border-slate-100 mb-8">
                        <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://ppie-insights.nhs.uk/participate/${selectedEvent.id}`} 
                            alt="Event Participation QR Code - Large" 
                            className="w-72 h-72 md:w-[400px] md:h-[400px] object-contain"
                        />
                    </div>
                    
                    <div className="bg-blue-50 px-8 py-4 rounded-xl border border-blue-100 w-full">
                        <p className="text-slate-500 text-sm uppercase tracking-wide font-bold mb-1">Direct Link</p>
                        <p className="font-mono text-xl md:text-2xl text-blue-700 font-bold break-all">
                            ppie-insights.nhs.uk/participate/{selectedEvent.id}
                        </p>
                    </div>
                </div>
            </div>
       )}
    </div>
  );
};