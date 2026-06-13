import React, { useContext } from 'react';
import { User as UserIcon, Mail, Building, Shield, Bell } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="animate-fade-in w-full max-w-4xl mx-auto space-y-8">

            <div className="flex justify-between items-end mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile Settings</h1>
                    <p className="text-gray-500 mt-1">Manage your educator account details and preferences.</p>
                </div>
                <button onClick={logout} className="btn-secondary text-red-600 border-red-200 hover:bg-red-50 font-bold">
                    Logout Account
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 space-y-4">
                    <div className="glass-card flex flex-col items-center text-center p-8">
                        <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-4 ring-4 ring-white shadow-lg shadow-primary-500/20 text-4xl font-bold uppercase overflow-hidden">
                            {user?.name ? user.name.charAt(0) : <UserIcon size={40} />}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{user?.name || "Dr. Educator"}</h2>
                        <p className="text-sm text-gray-500 mt-1">{user?.department ? user.department.toUpperCase() : "COMPUTER SCIENCE"}</p>
                        <span className="mt-4 text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-200">
                            Verified Educator
                        </span>
                    </div>
                </div>

                <div className="col-span-2 space-y-6">
                    <div className="glass-card">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                            <UserIcon size={20} className="text-primary-600" /> General Information
                        </h3>

                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" className="input-field shadow-none bg-gray-50 text-gray-500" defaultValue={user?.name || "Dr. Sarah Miller"} readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <input type="text" className="input-field shadow-none bg-gray-50 text-gray-500 capitalize" defaultValue={user?.department || "Computer Science"} readOnly />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="email" className="input-field pl-10 shadow-none bg-gray-50 text-gray-500" defaultValue={user?.email || "educator@school.edu"} readOnly />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="glass-card">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Shield size={20} className="text-primary-600" /> Security
                            </h3>
                            <button className="text-sm font-semibold text-primary-600 hover:text-primary-700">Change</button>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">Account Password</p>
                                <p className="text-sm text-gray-500 mt-1">Last changed 3 months ago</p>
                            </div>
                            <div className="text-gray-400">••••••••</div>
                        </div>
                    </div>

                    <div className="glass-card">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                            <Bell size={20} className="text-primary-600" /> Notification Preferences
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">AI Generation Alerts</p>
                                    <p className="text-xs text-gray-500">Receive emails when long generational tasks finish.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Platform Updates</p>
                                    <p className="text-xs text-gray-500">Notifications regarding AI model upgrades.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;
