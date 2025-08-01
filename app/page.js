'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Gift, TrendingUp, Users, Trophy, ArrowDownCircle } from 'lucide-react';

const FEATURE_LIST = [
  {
    title: 'Track Progress',
    desc: 'Monitor your fundraising journey in real-time with intuitive dashboards and analytics.',
    icon: <TrendingUp size={28} className="text-white" />,
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    title: 'Earn Rewards',
    desc: 'Unlock exclusive rewards and certificates as you reach fundraising milestones.',
    icon: <Trophy size={28} className="text-white" />,
    gradient: 'from-green-500 to-blue-600'
  },
  {
    title: 'Compete & Connect',
    desc: 'Climb the leaderboard and connect with a vibrant community of fellow interns.',
    icon: <Users size={28} className="text-white" />,
    gradient: 'from-purple-500 to-pink-600'
  }
];

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = document.cookie.includes('token=');
    if (token) router.push('/dashboard');
  }, [router]);

  // For smooth scroll to section
  const scrollToFeatures = () => {
    document.getElementById('howitworks').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600">
      {/* Nav */}
      <nav className="sticky top-0 backdrop-blur-md/10 bg-white/10 border-b border-white/20 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">
          <div className="flex items-center space-x-2">
            <Gift className="text-amber-400 drop-shadow" size={34} />
            <span className="text-white text-2xl tracking-tight font-black drop-shadow">FundRaise Portal</span>
          </div>
          <button
            onClick={() => router.push('/auth')}
            className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 shadow-lg text-white font-semibold px-6 py-2 rounded-lg hover:scale-105 transition"
          >
            Sign In
          </button>
        </div>
      </nav>
      
      {/* Hero */}
      <header className="pt-12 pb-24 relative">
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1440 200" fill="none">
            <path fill="white" fillOpacity="0.1"
              d="M0,160 C360,260 1080,80 1440,160 L1440,320 L0,320Z"/>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center relative z-10">
          <span className="px-4 py-1 mb-2 bg-white/20 text-yellow-200 rounded-full font-medium text-sm tracking-wide shadow backdrop-blur">
            🚀 Applications Open!
          </span>
          <h1 className="text-5xl sm:text-6xl leading-tight font-extrabold text-center text-white drop-shadow mb-6">
            Fundraising Made<br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Simple &amp; Rewarding
            </span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto font-medium text-center drop-shadow">
            Join our official intern program and kickstart your impact journey. Track your progress,
            earn rewards, and climb the leaderboard as part of a vibrant community making a difference!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/auth')}
              className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg shadow hover:bg-gray-100 hover:scale-105 transition"
            >
              Get Started Today
            </button>
            <button
              className="flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg
                         hover:bg-white hover:text-purple-700 hover:border-purple-400 transition"
              onClick={scrollToFeatures}
            >
              Learn More
              <ArrowDownCircle className="ml-2" size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Features */}
      <section id="howitworks" className="bg-white py-16 px-6 rounded-t-3xl shadow-xl -mt-16">
        <h2 className="text-4xl font-black text-center text-gray-800 mb-2 tracking-tight">
          Why Join FundRaise as an Intern?
        </h2>
        <p className="text-center text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          Build your resume, win rewards, and create real social impact, all while boosting your leadership and network!
        </p>
        <div className="grid sm:grid-cols-3 gap-8">
          {FEATURE_LIST.map((f, i) => (
            <div key={i}
              className={`relative p-8 rounded-2xl text-center 
              bg-gradient-to-br ${f.gradient} shadow-2xl hover:shadow-yellow-200/30
                transform hover:-translate-y-2 hover:scale-[1.03] transition-all`}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full p-4 bg-white/10 shadow">{f.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-white/80 text-base font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-l from-blue-100 to-purple-100 py-14 px-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-purple-800 mb-6">How It Works</h3>
        <div className="flex flex-col sm:flex-row max-w-4xl mx-auto gap-6 justify-center">
          {[
            { step: '1', label: 'Sign Up', icon: <Gift size={26} className="text-purple-600" /> },
            { step: '2', label: 'Share Referral', icon: <TrendingUp size={26} className="text-yellow-400" /> },
            { step: '3', label: 'Track Progress', icon: <Trophy size={26} className="text-blue-500" /> },
            { step: '4', label: 'Earn Rewards!', icon: <Users size={26} className="text-pink-500" /> },
          ].map(({step, label, icon}) => (
            <div key={step} className="flex-1 flex flex-col items-center text-center px-2">
              <div className="mb-2 bg-white shadow-lg rounded-full w-14 h-14 flex items-center justify-center">{icon}</div>
              <span className="font-extrabold text-xl text-purple-800 mb-1">Step {step}</span>
              <span className="font-medium text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="max-w-3xl mx-auto py-12">
        <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">🏆 Top Interns This Season</h3>
        <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row justify-around items-center gap-4">
          {[{ name: 'Priya S.', code: 'priya2025', amount: 150000 },
            { name: 'Arjun K.', code: 'arjun2025', amount: 125000 },
            { name: 'Meera J.', code: 'meera2025', amount: 115000 },
          ].map((user, idx) => (
            <div key={user.name}
                 className={`p-4 rounded-xl flex-1 text-center border
                 ${idx === 0 ? "border-yellow-400 bg-yellow-50" : idx === 1 ? "border-silver-400 bg-purple-50" : "border-rose-300 bg-pink-50"}`}>
              <span className="font-bold text-lg text-purple-600">{user.name}</span>
              <div className="text-xs text-gray-500">{user.code}</div>
              <div className="font-extrabold text-2xl mt-2 text-blue-900">₹{user.amount.toLocaleString()}</div>
              <div className="mt-1 text-sm text-gray-400">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'} Rank</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/20 text-white py-8 mt-auto px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-black text-lg tracking-tight">FundRaise Portal</span>
            <div className="text-white/60 text-sm">Empowering interns for impact | © {new Date().getFullYear()}</div>
          </div>
          <div className="flex gap-4 text-white/70 text-sm">
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
