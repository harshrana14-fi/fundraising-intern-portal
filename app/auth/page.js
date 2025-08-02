'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gift, Eye, EyeOff, ArrowLeft, Zap, CheckCircle, Users, Target, Award, BarChart3 } from 'lucide-react';

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

  const stats = [
    { number: "2,500+", label: "Active Interns", icon: <Users size={20} /> },
    { number: "$1.2M+", label: "Funds Raised", icon: <Target size={20} /> },
    { number: "98%", label: "Success Rate", icon: <Award size={20} /> },
    { number: "50+", label: "Partner Organizations", icon: <BarChart3 size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/20 to-teal-50/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-100/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-100/30 to-transparent rounded-full blur-3xl"></div>

      <nav className="p-6 relative z-50 backdrop-blur-sm bg-white/80 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-xl">
              <Gift className="text-white" size={24} />
            </div>
            <span className="text-gray-800 text-2xl font-bold">FundRaise Portal</span>
          </div>
          <button 
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        </div>
      </nav>

      <div className="flex items-start justify-center px-4 py-8 min-h-[calc(100vh-80px)] pb-32 relative z-10">
        <div className="bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-3xl shadow-2xl p-10 w-full max-w-md transform hover:scale-[1.02] transition-all duration-300 mt-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-emerald-200/50 shadow-sm">
              <Zap className="text-emerald-600 mr-2" size={16} />
              <span className="text-gray-700 text-sm font-semibold">Early Access Program</span>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-5 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
              <Gift className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {isLogin ? 'Welcome Back' : 'Join Our Elite Community'}
            </h1>
            <p className="text-gray-600 text-lg">
              {isLogin 
                ? 'Continue your professional fundraising journey' 
                : 'Start building your fundraising legacy today'
              }
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 hover:bg-white/80"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 hover:bg-white/80"
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 hover:bg-white/80"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transform hover:scale-[1.02] transition-all duration-200 font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
              className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors text-lg"
            >
              {isLogin 
                ? "New to FundRaise Portal? Create an account" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>

          {!isLogin && (
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 backdrop-blur-sm rounded-xl border border-emerald-200/50">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="text-emerald-600 mr-2" size={18} />
                <span className="text-emerald-700 font-semibold text-sm">Elite Program Benefits</span>
              </div>
              <p className="text-emerald-600 text-sm text-center">
                Join 2,500+ high-performing interns in our exclusive professional development program
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/90 to-transparent backdrop-blur-sm border-t border-gray-100/50">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-gray-700">
              <div className="flex justify-center mb-2">
                <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-2 rounded-lg text-emerald-600">
                  {stat.icon}
                </div>
              </div>
              <div className="text-xl md:text-2xl font-bold text-emerald-600">{stat.number}</div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}