import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);
    const [formData, setFormData] = useState({ name: '', email: '', department: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }
        setLoading(true);
        setError('');
        try {
            await register(formData.name, formData.email, formData.department, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in w-full max-w-md mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create your account</h2>
                <p className="text-gray-500 dark:text-gray-400">Start your 14-day free trial. No credit card required.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
                {error && <div className="p-3 bg-red-100 text-red-600 rounded-lg text-sm">{error}</div>}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </div>
                        <input type="text" placeholder="John Doe" className="input-field pl-10" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <input type="email" placeholder="educator@school.edu" className="input-field pl-10" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                    <select className="input-field cursor-pointer appearance-none" required value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })}>
                        <option value="" disabled>Select Department...</option>
                        <option value="cs">Computer Science</option>
                        <option value="physics">Physics</option>
                        <option value="chem">Chemistry</option>
                        <option value="bio">Biology</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <input type="password" placeholder="••••••••" className="input-field" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                        <input type="password" placeholder="••••••••" className="input-field" required value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                    </div>
                </div>

                <div className="flex items-start mt-4">
                    <input id="terms" type="checkbox" className="h-4 w-4 mt-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" required />
                    <label htmlFor="terms" className="ml-2 block text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        By creating an account, you agree to our <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">Privacy Policy</a>.
                    </label>
                </div>

                <button type="submit" disabled={loading} className="w-full btn-primary py-3 mt-6 shadow-lg shadow-primary-500/30">
                    {loading ? 'Creating...' : 'Create Account'}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400">
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default Register;
