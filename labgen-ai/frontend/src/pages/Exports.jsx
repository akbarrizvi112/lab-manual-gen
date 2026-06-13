import React from 'react';
import { Download, FileText, CheckCircle2, FileJson, Share2 } from 'lucide-react';

const Exports = () => {
    return (
        <div className="animate-fade-in w-full max-w-7xl mx-auto space-y-8">

            <div className="flex justify-between items-end mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Export Center</h1>
                    <p className="text-gray-500 mt-1">Download and distribute your generated lab manuals.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Export Action Cards */}
                <div className="glass-card hover:border-primary-500 cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FileText size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Export as PDF</h3>
                    <p className="text-sm text-gray-500 mb-4">Optimized for printing and physical distribution with vector graphics.</p>
                    <button className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1">
                        <Download size={16} /> Quick Export
                    </button>
                </div>

                <div className="glass-card hover:border-blue-500 cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FileText size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Export as DOCX</h3>
                    <p className="text-sm text-gray-500 mb-4">Fully editable Word documents for collaborative faculty review.</p>
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        <Download size={16} /> Quick Export
                    </button>
                </div>

                <div className="glass-card hover:border-green-500 cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Share2 size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Share Link</h3>
                    <p className="text-sm text-gray-500 mb-4">Generate secure viewer web-links for LMS integration (Canvas/Moodle).</p>
                    <button className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1">
                        <Share2 size={16} /> Copy URL
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Export Activity</h2>
                <div className="glass-card p-0 overflow-hidden border border-gray-200">
                    <table className="w-full text-left border-collapse">
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { title: 'React Native Fundamentals.pdf', type: 'PDF', status: 'Completed', size: '2.4 MB' },
                                { title: 'Intro_to_Mechanics_Final.docx', type: 'DOCX', status: 'Completed', size: '1.1 MB' },
                                { title: 'Web_Scraping_Lab_v2.pdf', type: 'PDF', status: 'Completed', size: '3.8 MB' },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                        {item.type === 'PDF' ? <FileText size={18} className="text-red-500" /> : <FileText size={18} className="text-blue-500" />}
                                        {item.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-semibold px-2 py-1 rounded bg-green-50 text-green-700 border border-green-100 flex items-center gap-1 w-max">
                                            <CheckCircle2 size={12} /> {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 text-right">{item.size}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <Download size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Exports;
