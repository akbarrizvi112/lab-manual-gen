import React from 'react';
import { Search, Filter, Clock, RotateCcw, MoreVertical } from 'lucide-react';

const History = () => {
    return (
        <div className="animate-fade-in w-full max-w-7xl mx-auto space-y-6">

            <div className="flex justify-between items-end mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manual History</h1>
                    <p className="text-gray-500 mt-1">Review previously generated manuals and manage document versions.</p>
                </div>
            </div>

            <div className="glass-card flex items-center justify-between gap-4 !p-4 bg-white/50 border border-gray-200">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search manuals by title or department..." className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <button className="btn-secondary !py-2 flex items-center gap-2 text-sm">
                    <Filter size={16} /> Filters
                </button>
            </div>

            <div className="glass-card p-0 overflow-hidden border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold bg-gray-50">
                            <th className="px-6 py-4">Document Title</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4">Last Updated</th>
                            <th className="px-6 py-4">Version</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {[
                            { title: 'Intro to Quantum Mechanics Lab', dept: 'Physics', date: '2 hours ago', version: 'v1.2' },
                            { title: 'Data Structures and Algorithms', dept: 'Computer Science', date: 'Yesterday', version: 'v3.0' },
                            { title: 'Organic Chemistry Synthesis', dept: 'Chemistry', date: 'Oct 24, 2023', version: 'v1.0' },
                            { title: 'Cell Biology Microscopy', dept: 'Biology', date: 'Oct 15, 2023', version: 'v2.1' },
                        ].map((doc, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                                        <Clock size={16} />
                                    </div>
                                    {doc.title}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{doc.dept}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{doc.date}</td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-gray-100 text-gray-600 border border-gray-200">
                                        {doc.version}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex justify-end gap-2">
                                    <button className="text-primary-600 hover:text-primary-800 bg-primary-50 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-colors">
                                        <RotateCcw size={14} /> Restore
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-600 px-2 py-1.5 rounded transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default History;
