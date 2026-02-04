'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Shield, Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { validateAdmin, setAdminSession } from '@/lib/adminAuth';

export default function AdminLoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Use backend API for authentication instead of frontend validation
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://voltherm-backend-2pw5.onrender.com'}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for session handling
        body: JSON.stringify({
          username: id,
          password: password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAdminSession();
          router.push('/voltherm-admin/dashboard');
        } else {
          setError('Login failed. Please check your credentials.');
          setLoading(false);
        }
      } else {
        setError('Invalid credentials. Please check your admin ID and password.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Unable to connect to server. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex bg-white selection:bg-teal-100 selection:text-teal-900'>
      
      {/* --- Left Side: Login Form --- */}
      <div className='w-full lg:w-2/5 flex flex-col items-center justify-center p-8 lg:p-12 relative'>
        
        {/* Mobile: Back Button (Top Left) */}
        <div className="absolute top-8 left-8 lg:hidden">
           <button 
            onClick={() => router.push('/')}
            className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-teal-600"
           >
             <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Home
           </button>
        </div>

        <div className='w-full max-w-md space-y-8'>
          
          {/* Mobile Logo Display */}
          <div className='lg:hidden text-center'>
            <div className='inline-flex items-center gap-2 mb-2'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-teal-400'>
                <span className='text-xl font-bold'>V</span>
              </div>
              <span className='text-2xl font-bold text-slate-900'>Voltherm</span>
            </div>
          </div>

          {/* Header */}
          <div className='text-center lg:text-left'>
            <div className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-teal-600 mb-6 ring-1 ring-teal-100'>
              <Lock className='w-6 h-6' />
            </div>
            <h1 className='text-3xl font-bold tracking-tight text-slate-900'>Admin Access</h1>
            <p className='mt-2 text-slate-500'>Secure authentication required to continue.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            
            {/* Admin ID */}
            <div>
              <label htmlFor='admin-id' className='block text-sm font-medium leading-6 text-slate-900'>
                Admin ID
              </label>
              <div className='relative mt-2'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                  <User className='h-5 w-5' />
                </div>
                <input
                  id='admin-id'
                  type='text'
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className='block w-full rounded-xl border-0 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 transition-all'
                  placeholder='Enter admin ID'
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium leading-6 text-slate-900'>
                Password
              </label>
              <div className='relative mt-2'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                  <Lock className='h-5 w-5' />
                </div>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='block w-full rounded-xl border-0 bg-slate-50 py-3.5 pl-11 pr-12 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 transition-all'
                  placeholder='Enter password'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600'
                >
                  {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className='flex items-center gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-900 border border-red-100 animate-in slide-in-from-top-2'>
                <Shield className='h-5 w-5 text-red-600 shrink-0' />
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-teal-600 hover:shadow-teal-500/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {loading ? (
                <>
                  <div className='h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white' />
                  Verifying...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Footer / Back Link */}
          <div className='mt-8 pt-8 border-t border-slate-100 flex items-center justify-between'>
             <p className="text-xs text-slate-400">
               Protected by Voltherm Security
             </p>
             
             {/* Desktop Back Button */}
             <button
              onClick={() => router.push('/')}
              className='hidden lg:inline-flex group items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-teal-500 hover:text-teal-600'
            >
              <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
              Back to Store
            </button>
          </div>
        </div>
      </div>

      {/* --- Right Side: Brand & Visuals --- */}
      <div className='hidden lg:flex lg:w-3/5 bg-slate-900 relative overflow-hidden items-center justify-center'>
        
        {/* Background Patterns (Matches Store Page Hero) */}
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#2dd4bf 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-slate-900 via-slate-900/90 to-teal-900/20"></div>

        {/* Animated Glow Orbs */}
        <div className='absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] animate-pulse'></div>
        <div className='absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse' style={{ animationDelay: '2s' }}></div>

        {/* Content Container */}
        <div className='relative z-10 max-w-lg text-center'>
          
          {/* Logo Badge */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-teal-500/10">
            <span className="text-4xl font-bold text-teal-400">V</span>
          </div>

          <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6'>
            Voltherm Technologies
          </h2>
          
          <p className='text-lg text-slate-400 mb-10 leading-relaxed'>
            Welcome to the centralized management portal. Monitor sales, manage inventory, and track inquiries with enterprise-grade security.
          </p>

          {/* Feature Grid */}
          <div className='grid grid-cols-2 gap-4 text-left'>
            <div className='rounded-xl bg-white/5 p-4 backdrop-blur-sm border border-white/5 transition-colors hover:bg-white/10'>
              <Shield className='h-6 w-6 text-teal-400 mb-3' />
              <div className='font-semibold text-white'>Secure Access</div>
              <div className='text-xs text-slate-400 mt-1'>End-to-end encryption</div>
            </div>
            <div className='rounded-xl bg-white/5 p-4 backdrop-blur-sm border border-white/5 transition-colors hover:bg-white/10'>
              <CheckCircle2 className='h-6 w-6 text-teal-400 mb-3' />
              <div className='font-semibold text-white'>Real-time Data</div>
              <div className='text-xs text-slate-400 mt-1'>Live inventory tracking</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
