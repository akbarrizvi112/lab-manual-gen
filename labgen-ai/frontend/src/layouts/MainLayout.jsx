import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Sparkles, Clock, Download, Settings, LogOut, Beaker } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const MainLayout = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Templates', path: '/templates', icon: <FileText size={20} /> },
        { name: 'AI Generator', path: '/generator', icon: <Sparkles size={20} className="text-purple-500" /> },
        { name: 'History', path: '/history', icon: <Clock size={20} /> },
        { name: 'Exports', path: '/exports', icon: <Download size={20} /> },
        { name: 'Profile', path: '/profile', icon: <Settings size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">

            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border flex flex-col pt-6 pb-4">
                <div className="px-6 mb-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                        <Beaker size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">LabGen AI</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Educator Suite</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive
                                    ? 'bg-primary-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-border'
                                }`
                            }
                        >
                            <div>{item.icon}</div>
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="px-4 mt-auto space-y-2">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors font-medium"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navbar */}
                <header className="h-16 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-border flex items-center justify-between px-8 z-10">
                    <div className="flex items-center w-96">
                        <input
                            type="text"
                            placeholder="Search templates or history..."
                            className="w-full bg-gray-100 dark:bg-dark-bg border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 dark:text-white"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors relative">
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        </button>

                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-dark-border">
                            <img src="https://ui-avatars.com/api/?name=Dr.+Sarah+Miller&background=3b82f6&color=fff" alt="User Avatar" className="w-8 h-8 rounded-full border border-gray-200 dark:border-dark-border" />
                            <div className="hidden md:block">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Dr. Sarah Miller</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8 relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
