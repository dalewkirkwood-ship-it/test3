import React, { useState } from 'react';
import { Info, ZoomIn, ZoomOut, Filter } from 'lucide-react';

// Types for our data model
type Status = 'Complete' | 'In Progress' | 'Next' | 'Goal';
type Org = 'SDE' | 'PPIE' | 'LSC' | 'NHS' | 'Other';

interface Task {
    id: string;
    label: string;
    people: string[];
    startMonth: number; // 0-based index from Aug 2024
    duration: number; // in months
    row: number; // which horizontal lane row
    org: Org;
    status?: Status;
    connectsTo?: string[];
}

export const ProjectWorkflowMap: React.FC = () => {
    const [zoom, setZoom] = useState(1);

    // Grid configuration
    const START_YEAR = 2024;
    const START_MONTH = 7; // August
    const TOTAL_MONTHS = 21; // Aug 24 to Apr 26 (approx)
    const MONTH_WIDTH = 100 * zoom;
    const ROW_HEIGHT = 60;
    const HEADER_HEIGHT = 80;

    const months = Array.from({ length: TOTAL_MONTHS }, (_, i) => {
        const date = new Date(START_YEAR, START_MONTH + i);
        return {
            label: date.toLocaleString('default', { month: 'short' }),
            year: date.getFullYear(),
            index: i
        };
    });

    // Mock data based on the image
    const tasks: Task[] = [
        // User Engagement
        { id: '1', label: 'SDE PPIE CoP Co-working', people: ['Dale', 'Caroline', 'National PPIE Community'], startMonth: 0, duration: 15, row: 1, org: 'PPIE', status: 'Complete' },
        { id: '2', label: 'PPIE Metrics / PEDRI values Integration', people: ['Dale', 'Caroline'], startMonth: 1, duration: 3, row: 2, org: 'PPIE', connectsTo: ['3'], status: 'Complete' },
        { id: '3', label: 'Dashboard Prototype', people: ['Dale'], startMonth: 4, duration: 1, row: 3, org: 'LSC', connectsTo: ['4', '5'], status: 'Complete' },
        { id: '4', label: 'DARE Collab: PANORAMA/FOCUS-5', people: ['Dale', 'Alan', 'Grace', 'Caroline'], startMonth: 5, duration: 6, row: 4, org: 'LSC', status: 'Complete' },

        // Stake Engagement
        { id: '5', label: 'Prototype V2 dev', people: ['Dale'], startMonth: 5, duration: 2, row: 5, org: 'SDE', connectsTo: ['6', '7', '8'], status: 'Complete' },
        { id: '6', label: 'National Presentations', people: ['SDE PPIE CoP'], startMonth: 6, duration: 3, row: 6, org: 'SDE', status: 'Complete' },
        { id: '7', label: 'Exploration of funding', people: ['Dale', 'Kate', 'Alan'], startMonth: 7, duration: 3, row: 7, org: 'SDE', connectsTo: ['9'], status: 'Complete' },

        // Solution Platform
        { id: '8', label: 'Platform Specification', people: ['Dale', 'Alan', 'Younes'], startMonth: 15, duration: 4, row: 9, org: 'SDE', connectsTo: ['10'], status: 'In Progress' },
        { id: '9', label: 'Funding Application', people: ['NHS SDE'], startMonth: 10, duration: 2, row: 8, org: 'NHS', connectsTo: ['8'], status: 'Complete' },

        { id: '10', label: 'Supplier Development Phase', people: ['Dale', 'Alan', 'User Group'], startMonth: 17, duration: 4, row: 11, org: 'Other', connectsTo: ['12'], status: 'Next' },
        { id: '11', label: 'Procurement', people: ['Alan', 'Dale', 'Phil'], startMonth: 15, duration: 2, row: 10, org: 'SDE', connectsTo: ['10'], status: 'In Progress' },

        // Launch
        { id: '12', label: 'Platform V1 Go-Live', people: [], startMonth: 20, duration: 1, row: 13, org: 'SDE', status: 'Goal' },
    ];

    const getOrgColor = (org: Org) => {
        switch (org) {
            case 'PPIE': return 'bg-purple-500 border-purple-600';
            case 'SDE': return 'bg-blue-500 border-blue-600';
            case 'LSC': return 'bg-green-500 border-green-600';
            case 'NHS': return 'bg-indigo-600 border-indigo-700';
            case 'Other': return 'bg-amber-500 border-amber-600';
            default: return 'bg-slate-500';
        }
    };

    const getStatusColor = (status: Status) => {
        switch (status) {
            case 'Complete': return 'bg-green-100 text-green-700';
            case 'In Progress': return 'bg-amber-100 text-amber-700';
            case 'Next': return 'bg-orange-100 text-orange-700';
            case 'Goal': return 'bg-cyan-100 text-cyan-700';
            default: return 'bg-slate-100';
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                        <span className="text-xs text-slate-600">PPIE CoP</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className="text-xs text-slate-600">SDE</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-xs text-slate-600">Solution</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-2 hover:bg-slate-100 rounded">
                        <ZoomOut size={18} className="text-slate-600" />
                    </button>
                    <span className="text-xs font-mono text-slate-500">{(zoom * 100).toFixed(0)}%</span>
                    <button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="p-2 hover:bg-slate-100 rounded">
                        <ZoomIn size={18} className="text-slate-600" />
                    </button>
                </div>
            </div>

            {/* Gantt Scroll Area */}
            <div className="flex-1 overflow-auto relative">
                <div style={{ width: TOTAL_MONTHS * MONTH_WIDTH + 300, height: 1000 }} className="relative bg-white">

                    {/* Time Header */}
                    <div className="sticky top-0 z-10 flex bg-slate-100 border-b border-slate-200 h-10">
                        <div className="w-[200px] shrink-0 border-r border-slate-200 bg-slate-50 flex items-center justify-center font-semibold text-slate-600 text-sm">
                            Timeline
                        </div>
                        <div className="flex">
                            {months.map((m, i) => (
                                <div key={i} style={{ width: MONTH_WIDTH }} className="shrink-0 border-r border-slate-200 flex flex-col justify-center items-center">
                                    <span className="text-xs font-bold text-slate-700">{m.year}</span>
                                    <span className="text-[10px] text-slate-500 uppercase">{m.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Left Sidebar Overlay labels for grouping (Simulated) */}
                    <div className="absolute left-6 top-20 z-0 opacity-10 pointer-events-none">
                        <h2 className="text-6xl font-bold uppercase rotate-90 origin-top-left translate-y-24 text-purple-900">Emergence</h2>
                    </div>

                    {/* Grid Lines */}
                    <div className="absolute inset-0 pointer-events-none flex pl-[200px] pt-10">
                        {months.map((_, i) => (
                            <div key={i} style={{ width: MONTH_WIDTH }} className="h-full border-r border-slate-100 border-dashed"></div>
                        ))}
                    </div>

                    {/* Tasks Layer */}
                    <div className="relative pt-6 pl-[200px]">
                        {/* Phase Dividers */}
                        <div className="absolute top-0 left-[calc(5*100px)] bottom-0 w-0.5 bg-cyan-400 z-0 dashed" style={{ left: 5 * MONTH_WIDTH }}></div>

                        {tasks.map(task => (
                            <div
                                key={task.id}
                                className={`absolute rounded-full shadow-sm text-white text-xs flex items-center px-1 py-1 hover:brightness-110 transition-all cursor-pointer border ${getOrgColor(task.org)}`}
                                style={{
                                    left: task.startMonth * MONTH_WIDTH,
                                    width: Math.max(80, task.duration * MONTH_WIDTH - 10),
                                    top: task.row * ROW_HEIGHT,
                                    height: 36
                                }}
                            >
                                <div className="flex flex-col w-full overflow-hidden px-2">
                                    <span className="font-bold truncate">{task.label}</span>
                                    <span className="text-[9px] opacity-90 truncate">{task.people.join(' + ')}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* SVG Layer for Connections (Simplified) */}
                    <svg className="absolute top-10 left-[200px] w-full h-full pointer-events-none overflow-visible">
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                            </marker>
                        </defs>
                        {tasks.flatMap(source =>
                            (source.connectsTo || []).map(targetId => {
                                const target = tasks.find(t => t.id === targetId);
                                if (!target) return null;

                                const x1 = (source.startMonth + source.duration / 2) * MONTH_WIDTH; // Simplified center
                                const y1 = source.row * ROW_HEIGHT + 36;
                                const x2 = target.startMonth * MONTH_WIDTH;
                                const y2 = target.row * ROW_HEIGHT + 18;

                                // Basic path logic - L shape
                                return (
                                    <path
                                        key={`${source.id}-${target.id}`}
                                        d={`M ${x1} ${y1} V ${y2} H ${x2 - 5}`}
                                        stroke="#3b82f6"
                                        strokeWidth="1.5"
                                        fill="none"
                                        markerEnd="url(#arrowhead)"
                                        className="opacity-60"
                                    />
                                );
                            })
                        )}
                    </svg>

                </div>
            </div>
        </div>
    );
};
