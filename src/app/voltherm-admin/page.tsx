'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';
import { validateAdmin, setAdminSession } from '@/lib/adminAuth';

export default function AdminLoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (validateAdmin(id, password)) {
      setAdminSession();
      router.push('/voltherm-admin/dashboard');
    } else {
      setError('Invalid ID or password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4'>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl'></div>
      </div>

      <div className='relative z-10 w-full max-w-md'>
        {/* Logo/Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/20 mb-4'>
            <Lock className='w-8 h-8 text-teal-400' />
          </div>
          <h1 className='text-3xl font-bold text-white mb-2'>Admin Access</h1>
          <p className='text-slate-400'>Enter your credentials to continue</p>
        </div>

        {/* Login Card */}
        <div className='bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Admin ID Field */}
            <div>
              <label htmlFor='admin-id' className='block text-sm font-medium text-slate-300 mb-2'>
                Admin ID
              </label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                <input
                  id='admin-id'
                  type='text'
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className='w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all'
                  placeholder='Enter admin ID'
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-slate-300 mb-2'>
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                <input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all'
                  placeholder='Enter password'
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className='p-3 rounded-lg bg-red-500/10 border border-red-500/30'>
                <p className='text-sm text-red-400'>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 px-4 bg-linear-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Security Notice */}
          <div className='mt-6 pt-6 border-t border-white/10'>
            <p className='text-xs text-slate-400 text-center'>
              This is a secure admin area. Unauthorized access is prohibited.
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className='text-center mt-6'>
          <button
            onClick={() => router.push('/')}
            className='text-sm text-slate-400 hover:text-white transition-colors'
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
