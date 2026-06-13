import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1614850715649-1d0106293bd1?q=80&w=2070&auto=format&fit=crop)' }}>
            {/* Overlay to darken background */}
            <div className="absolute inset-0 bg-primary-900/80 backdrop-blur-sm dark:bg-dark-bg/90"></div>

            <div className="relative z-10 w-full max-w-5xl flex rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-dark-card border border-white/20 dark:border-dark-border/50">

                {/* Left Side: Brand/Info */}
                <div className="hidden md:flex flex-col flex-1 p-12 bg-primary-600/90 dark:bg-primary-900/90 text-white justify-center items-start">
                    <div className="flex items-center gap-3 mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                        </svg>
                        <h1 className="text-3xl font-bold tracking-tight">LabGen AI</h1>
                    </div>
                    <h2 className="text-4xl font-bold leading-tight mb-4 text-white/95">Empowering educators with AI-driven lab creation.</h2>
                    <p className="text-lg text-primary-100 mt-4 leading-relaxed">
                        Join thousands of educators transforming their curriculum through high-fidelity, scientifically rigorous laboratory documentation generated in seconds.
                    </p>
                    <div className="mt-auto">
                        <div className="flex gap-12 font-medium">
                            <div>
                                <p className="text-3xl font-bold text-white">98%</p>
                                <p className="text-sm text-primary-200">Time Saved</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">50k+</p>
                                <p className="text-sm text-primary-200">Labs Created</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Render Outlet (Login/Reg) */}
                <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
