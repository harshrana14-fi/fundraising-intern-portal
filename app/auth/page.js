// app/auth/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gift, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        document.cookie = `token=${data.token}; path=/; max-age=...; SameSite=Lax; Secure`;
        console.log("Redirecting to /dashboard...");
        router.push('/dashboard');
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background pattern/texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
      
      {/* Navigation bar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <Gift className="text-white" size={24} />
          </div>
          <span className="text-white text-xl font-bold">FundRaise</span>
        </div>
        <button 
          onClick={() => router.push('/')}
          className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
      </nav>

      <div className="flex items-start justify-center px-4 py-8 min-h-[calc(100vh-80px)] pb-32">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md transform hover:scale-[1.02] transition-all duration-300 mt-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
              <Gift className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">
              {isLogin ? 'Welcome Back' : 'Join Our Community'}
            </h1>
            <p className="text-blue-200 text-lg">
              {isLogin 
                ? 'Continue your fundraising journey' 
                : 'Start making a meaningful impact today'
              }
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-white font-medium mb-3 text-sm uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/15"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div>
              <label className="block text-white font-medium mb-3 text-sm uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/15"
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-3 text-sm uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:bg-white/15"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>
          </form>
          
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ name: '', email: '', password: '' });
              }}
              className="text-blue-300 hover:text-white font-medium transition-colors text-lg"
            >
              {isLogin 
                ? "New to FundRaise? Create an account" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>

          {/* Additional info for signup */}
          {!isLogin && (
            <div className="mt-6 p-4 bg-blue-600/20 backdrop-blur-sm rounded-xl border border-blue-500/30">
              <p className="text-blue-200 text-sm text-center">
                Join 2,500+ active interns and start your fundraising journey today
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom stats section */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/80 to-transparent backdrop-blur-sm">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="text-white/90">
            <div className="text-xl md:text-2xl font-bold text-blue-300">2,500+</div>
            <div className="text-xs md:text-sm text-blue-200">Active Interns</div>
          </div>
          <div className="text-white/90">
            <div className="text-xl md:text-2xl font-bold text-blue-300">$1.2M+</div>
            <div className="text-xs md:text-sm text-blue-200">Funds Raised</div>
          </div>
          <div className="text-white/90">
            <div className="text-xl md:text-2xl font-bold text-blue-300">98%</div>
            <div className="text-xs md:text-sm text-blue-200">Success Rate</div>
          </div>
          <div className="text-white/90">
            <div className="text-xl md:text-2xl font-bold text-blue-300">50+</div>
            <div className="text-xs md:text-sm text-blue-200">Partner Organizations</div>
          </div>
        </div>
      </div>
    </div>
  );
}