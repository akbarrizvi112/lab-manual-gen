import React from 'react';
import { Sparkles, Code, GitBranch, Terminal, ShieldAlert, Cpu } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="animate-fade-in w-full max-w-7xl mx-auto space-y-8">

            {/* Header section */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400 tracking-tight">Welcome back, Dr. Miller</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Your coding curriculum is ready for today's engineering sessions.</p>
                </div>

                <div className="flex gap-3">
                    <button className="btn-secondary">Deploy Lab</button>
                    <button className="btn-primary shadow-lg shadow-primary-500/30">
                        <Sparkles size={18} />
                        AI Code Gen
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <Code size={20} />
                        </div>
                        <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">+24 today</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Templates Created</p>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">1,248</h3>
                    </div>
                </div>

                <div className="glass-card flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <Sparkles size={20} />
                        </div>
                        <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">8 synced</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Manuals Generated</p>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">45</h3>
                    </div>
                </div>

                <div className="glass-card flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400">
                            <ShieldAlert size={20} />
                        </div>
                        <span className="text-xs font-semibold text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">-12% this week</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Linting Alerts</p>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">18</h3>
                    </div>
                </div>

                <div className="glass-card flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <Cpu size={20} />
                        </div>
                        <span className="text-xs font-semibold text-primary-600 bg-primary-100 dark:bg-primary-900/30 px-2 py-1 rounded-full">Optimal</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Uptime Performance</p>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">99.9%</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Table Area */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Lab Assignments</h2>
                        <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">View All</button>
                    </div>

                    <div className="glass-card p-0 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-dark-border text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold bg-gray-50/50 dark:bg-gray-800/30">
                                    <th className="px-6 py-4">Lab Title</th>
                                    <th className="px-6 py-4">Stack</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                                {[
                                    { title: 'Data Structures in C++', stack: 'C++/STL', date: 'Oct 24, 2023', status: 'Generated' },
                                    { title: 'Python Web Scraping', stack: 'Python/BS4', date: 'Oct 23, 2023', status: 'In Review' },
                                    { title: 'SQL Database Design', stack: 'PostgreSQL', date: 'Oct 21, 2023', status: 'Generated' },
                                    { title: 'React Native Fundamentals', stack: 'TypeScript', date: 'Oct 20, 2023', status: 'Generated' },
                                ].map((lab, i) => (
                                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{lab.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{lab.stack}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{lab.date}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${lab.status === 'Generated' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'}`}>
                                                {lab.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Activity Timeline */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Activity Timeline</h2>
                    <div className="glass-card">
                        <div className="space-y-6">

                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 z-10 ring-4 ring-white dark:ring-dark-card">
                                        <Terminal size={14} />
                                    </div>
                                    <div className="w-px h-full bg-gray-200 dark:bg-dark-border -mt-4"></div>
                                </div>
                                <div className="pb-6">
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">Lab manual exported</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">Compiled and exported "Data Structures" module to PDF format.</p>
                                    <p className="text-[10px] font-bold text-primary-600 dark:text-primary-500 mt-2 uppercase tracking-wide">2 HOURS AGO</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 z-10 ring-4 ring-white dark:ring-dark-card">
                                        <GitBranch size={14} />
                                    </div>
                                    <div className="w-px h-full bg-gray-200 dark:bg-dark-border -mt-4"></div>
                                </div>
                                <div className="pb-6">
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">Template Synced</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">Template 'CS 101 Structure' updated with new algorithmic placeholders.</p>
                                    <p className="text-[10px] font-bold text-primary-600 dark:text-primary-500 mt-2 uppercase tracking-wide">5 HOURS AGO</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400 z-10 ring-4 ring-white dark:ring-dark-card">
                                        <Sparkles size={14} />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">AI Content Generated</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">Generated boilerplate content for Python Web Scraping module via Gemini AI.</p>
                                    <p className="text-[10px] font-bold text-primary-600 dark:text-primary-500 mt-2 uppercase tracking-wide">YESTERDAY</p>
                                </div>
                            </div>

                        </div>

                        <button className="w-full py-2.5 mt-6 btn-secondary text-sm">Load More Activity</button>
                    </div>
                </div>

            </div>

            {/* Floating AI Assistant Banner */}
            <div className="fixed bottom-8 max-w-2xl w-full left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-dark-card/95 backdrop-blur-xl border border-gray-200 dark:border-dark-border px-6 py-4 rounded-full shadow-2xl flex justify-between items-center z-50">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/40">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">AI Copilot is active</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Ready to assist with your educational content...</p>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <button className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2"><Code size={16} /> Refactor</button>
                    <button className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2"><Sparkles size={16} /> Expand</button>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white rounded-full px-6 py-2 text-sm font-bold shadow-lg shadow-primary-500/30 transition-all hover:scale-105">New Prompt</button>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
