import React from 'react';
import { ProjectWorkflowMap } from '../components/ProjectWorkflowMap';

export const LearningHubPage: React.FC = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Learning Hub</h1>
                        <p className="text-slate-600 mt-2 text-lg">
                            Explore the project ecosystem, attribution models, and collaborative workflows.
                        </p>
                    </div>
                    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-100">
                        Visualization Tool
                    </div>
                </div>

                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden min-h-[600px] relative">
                    <ProjectWorkflowMap />
                </div>

                <div className="mt-8 grid md:grid-cols-3 gap-6">
                    <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="font-semibold text-slate-800 mb-2">Attribution Mapping</h3>
                        <p className="text-sm text-slate-600">Trace ownership and provenance across the project lifecycle using the timeline view.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="font-semibold text-slate-800 mb-2">Cross-Boundary Work</h3>
                        <p className="text-sm text-slate-600">Visual cues indicate organizational contributions and interconnected relationships.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="font-semibold text-slate-800 mb-2">Workflow Evolution</h3>
                        <p className="text-sm text-slate-600">Follow the arrows to see how different aspects of project delivery interlink over time.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
