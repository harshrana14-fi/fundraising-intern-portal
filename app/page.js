'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Gift, 
  TrendingUp, 
  Users, 
  Trophy, 
  Target, 
  Award, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  X,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Star,
  Quote,
  Share2
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user is already logged in
    const token = document.cookie.includes('token=');
    if (token) {
      router.push('/dashboard');
    }

    // Check if first time visitor
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited && !token) {
      setTimeout(() => setShowOnboarding(true), 2000);
    }
  }, [router]);

  const onboardingSteps = [
    {
      title: "Welcome to FundRaise Portal",
      description: "Join our exclusive intern program and start making a difference while earning rewards.",
      icon: <Gift className="text-blue-600" size={48} />
    },
    {
      title: "Track Your Progress",
      description: "Monitor your fundraising goals with real-time analytics and detailed performance metrics.",
      icon: <TrendingUp className="text-blue-600" size={48} />
    },
    {
      title: "Compete & Win",
      description: "Climb the leaderboard, earn badges, and unlock exclusive rewards as you reach milestones.",
      icon: <Trophy className="text-blue-600" size={48} />
    },
    {
      title: "Ready to Start?",
      description: "Create your account now and join hundreds of successful fundraising interns.",
      icon: <CheckCircle className="text-blue-600" size={48} />
    }
  ];

  const closeOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasVisited', 'true');
  };

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      closeOnboarding();
      router.push('/auth');
    }
  };

  const stats = [
    { number: "2,500+", label: "Active Interns", icon: <Users size={24} /> },
    { number: "$1.2M+", label: "Funds Raised", icon: <Target size={24} /> },
    { number: "98%", label: "Success Rate", icon: <Award size={24} /> },
    { number: "50+", label: "Partner Organizations", icon: <BarChart3 size={24} /> }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Intern",
      content: "This platform transformed my fundraising experience. I raised $15,000 in just 3 months!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "Business Development Intern",
      content: "The analytics and tracking tools are incredible. I could see exactly what strategies worked best.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Communications Intern",
      content: "The competitive aspect made fundraising fun and engaging. Great community support!",
      rating: 5,
      avatar: "ER"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Sign Up & Get Onboarded",
      description: "Create your account and complete our comprehensive onboarding process to understand your role and goals.",
      icon: <CheckCircle size={24} />
    },
    {
      step: "02",
      title: "Get Your Referral Code",
      description: "Receive your unique referral code and start building your network. Earn bonus rewards for every successful referral.",
      icon: <Share2 size={24} />
    },
    {
      step: "03",
      title: "Set Goals & Start Fundraising",
      description: "Work with our team to establish realistic targets and use our tools to reach potential donors effectively.",
      icon: <Target size={24} />
    },
    {
      step: "04",
      title: "Track Progress & Earn Rewards",
      description: "Monitor your performance in real-time, unlock achievements, and earn tangible rewards as you hit milestones.",
      icon: <Trophy size={24} />
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Navigation */}
        <nav className="p-6 relative z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Gift className="text-white" size={32} />
              <span className="text-white text-2xl font-bold">FundRaise Portal</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#about" className="text-white hover:text-blue-300 transition-colors">About</a>
              <a href="#how-it-works" className="text-white hover:text-blue-300 transition-colors">How It Works</a>
              <a href="#testimonials" className="text-white hover:text-blue-300 transition-colors">Success Stories</a>
              <button
                onClick={() => router.push('/auth')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors border border-blue-500"
              >
                Sign In
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Clock className="text-blue-300 mr-2" size={16} />
              <span className="text-white text-sm font-medium">Limited Time: Early Access Program</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Professional Fundraising
              <span className="block text-blue-300">
                Platform for Interns
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Join our exclusive intern program designed for ambitious students. Track your fundraising progress, 
              earn valuable rewards, and compete with fellow interns while making a meaningful impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => router.push('/auth')}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center border border-blue-500"
              >
                Start Your Journey
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button 
                onClick={() => setShowOnboarding(true)}
                className="border-2 border-blue-400 text-blue-300 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                Quick Tour
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="text-blue-300">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-slate-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Why Interns Choose Our Platform
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built specifically for student interns, our platform provides everything you need to succeed in fundraising
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white hover:shadow-xl transition-shadow border border-slate-200">
              <div className="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Advanced Analytics</h3>
              <p className="text-slate-600">
                Get detailed insights into your fundraising performance with real-time dashboards, conversion tracking, and predictive analytics.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white hover:shadow-xl transition-shadow border border-slate-200">
              <div className="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Trophy className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Achievement System</h3>
              <p className="text-slate-600">
                Unlock badges, earn points, and win prizes as you hit milestones. Our reward system keeps you motivated and engaged.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white hover:shadow-xl transition-shadow border border-slate-200">
              <div className="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Professional Network</h3>
              <p className="text-slate-600">
                Join a community of ambitious interns, compete on leaderboards, and learn from top performers in your field.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">Get started in just four simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <div className="bg-slate-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Success Stories</h2>
            <p className="text-xl text-slate-600">Hear from our top-performing interns</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl relative shadow-lg border border-slate-200">
                <Quote className="absolute top-4 right-4 text-slate-300" size={32} />
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-blue-500 fill-current" size={16} />
                  ))}
                </div>
                <p className="text-slate-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">About FundRaise Portal</h2>
              <p className="text-slate-300 text-lg mb-6">
                Founded by former interns who understand the challenges of fundraising, FundRaise Portal 
                is designed specifically for ambitious students looking to make an impact while building 
                valuable professional skills.
              </p>
              <p className="text-slate-300 text-lg mb-8">
                Our platform combines cutting-edge technology with proven fundraising strategies, 
                creating an environment where interns can thrive, learn, and achieve remarkable results.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-blue-300 mb-2">Our Mission</h3>
                  <p className="text-slate-300">Empowering the next generation of fundraising professionals</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-300 mb-2">Our Vision</h3>
                  <p className="text-slate-300">Creating sustainable impact through innovative fundraising</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600">
              <h3 className="text-2xl font-bold text-white mb-6">What Sets Us Apart</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="text-blue-300 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-300">Comprehensive training and mentorship programs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-300 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-300">Real-time performance tracking and analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-300 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-300">Competitive rewards and recognition system</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-300 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-300">Strong community of like-minded individuals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-300 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-300">Referral program with bonus rewards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful interns who have launched their careers with FundRaise Portal
          </p>
          <button
            onClick={() => router.push('/auth')}
            className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-xl hover:bg-slate-100 transform hover:scale-105 transition-all duration-200 inline-flex items-center"
          >
            Get Started Now
            <ArrowRight className="ml-2" size={24} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Gift className="text-blue-400" size={32} />
                <span className="text-2xl font-bold">FundRaise Portal</span>
              </div>
              <p className="text-slate-400 mb-6">
                Empowering the next generation of fundraising professionals through innovative technology and comprehensive support.
              </p>
              <div className="flex space-x-4">
                <Facebook className="text-slate-400 hover:text-white cursor-pointer" size={24} />
                <Twitter className="text-slate-400 hover:text-white cursor-pointer" size={24} />
                <Linkedin className="text-slate-400 hover:text-white cursor-pointer" size={24} />
                <Instagram className="text-slate-400 hover:text-white cursor-pointer" size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6">Platform</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white">Dashboard</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Analytics</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Leaderboard</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Rewards</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white">Training Materials</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Best Practices</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Success Stories</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Mail className="text-slate-400 mr-3" size={16} />
                  <span className="text-slate-400">support@fundraiseportal.com</span>
                </li>
                <li className="flex items-center">
                  <Phone className="text-slate-400 mr-3" size={16} />
                  <span className="text-slate-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="text-slate-400 mr-3" size={16} />
                  <span className="text-slate-400">New York, NY</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              © 2025 FundRaise Portal. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>

      {/* Onboarding Overlay */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative border border-slate-200">
            <button
              onClick={closeOnboarding}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
            
            <div className="text-center">
              <div className="mb-6">
                {onboardingSteps[currentStep].icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {onboardingSteps[currentStep].title}
              </h3>
              <p className="text-slate-600 mb-8">
                {onboardingSteps[currentStep].description}
              </p>
              
              {/* Progress indicators */}
              <div className="flex justify-center space-x-2 mb-8">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentStep ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextStep}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}