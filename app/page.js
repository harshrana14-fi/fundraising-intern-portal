'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { Gift, TrendingUp, Users, Trophy, Target, Award, BarChart3, Clock, CheckCircle, X,ArrowRight,Mail,Phone,MapPin,Facebook,Twitter,Linkedin,Instagram,Star,Quote,Share2,Zap,Shield,Lightbulb} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
    const token = document.cookie.includes('token=');
    if (token) {
      router.push('/dashboard');
    }
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited && !token) {
      setTimeout(() => setShowOnboarding(true), 2000);
    }
  }, [router]);

  const onboardingSteps = [
    {title: "Welcome to FundRaise Portal",
      description: "Join our exclusive intern program and start making a difference while earning rewards.",
      icon: <Gift className="text-emerald-600" size={48} />
    },
    {title: "Track Your Progress",
      description: "Monitor your fundraising goals with real-time analytics and detailed performance metrics.",
      icon: <TrendingUp className="text-emerald-600" size={48} />
    },
    {title: "Compete & Win",
      description: "Climb the leaderboard, earn badges, and unlock exclusive rewards as you reach milestones.",
      icon: <Trophy className="text-emerald-600" size={48} />
    },
    {title: "Ready to Start?",
      description: "Create your account now and join hundreds of successful fundraising interns.",
      icon: <CheckCircle className="text-emerald-600" size={48} />
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

  const stats = [{ number: "2,500+", label: "Active Interns", icon: <Users size={24} /> },
    { number: "$1.2M+", label: "Funds Raised", icon: <Target size={24} /> },
    { number: "98%", label: "Success Rate", icon: <Award size={24} /> },
    { number: "50+", label: "Partner Organizations", icon: <BarChart3 size={24} /> }
  ];

  const testimonials = [
    { name: "Rahul",
      role: "Marketing Intern",
      content: "This platform transformed my fundraising experience. I raised $15,000 in just 3 months!",
      rating: 5,
      avatar: "RL"
    },
    { name: "Raj",
      role: "Business Development Intern",
      content: "The analytics and tracking tools are incredible. I could see exactly what strategies worked best.",
      rating: 5,
      avatar: "RJ"
    },
    { name: "Mahi",
      role: "Communications Intern",
      content: "The competitive aspect made fundraising fun and engaging. Great community support!",
      rating: 5,
      avatar: "MH"
    }
  ];

  const howItWorks = [
    { step: "01",
      title: "Sign Up & Get Onboarded",
      description: "Create your account and complete our comprehensive onboarding process to understand your role and goals.",
    },
    { step: "02",
      title: "Get Your Referral Code",
      description: "Receive your unique referral code and start building your network. Earn bonus rewards for every successful referral.",
    },
    { step: "03",
      title: "Set Goals & Start Fundraising",
      description: "Work with our team to establish realistic targets and use our tools to reach potential donors effectively.",
    },
    { step: "04",
      title: "Track Progress & Earn Rewards",
      description: "Monitor your performance in real-time, unlock achievements, and earn tangible rewards as you hit milestones.",
    }
  ];

  return (
    <>
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
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">About</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Success Stories</a>
              <button onClick={() => router.push('/auth')} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-0.5">
                Sign In
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-emerald-200/50 shadow-sm">
              <Zap className="text-emerald-600 mr-3" size={18} />
              <span className="text-gray-700 text-sm font-semibold">Early Access Program - Limited Spots Available</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">Professional
              <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Fundraising Platform</span>
              <span className="block text-gray-700 text-4xl md:text-5xl mt-2">for Future Leaders</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              Join our exclusive intern program designed for ambitious students. Master the art of fundraising, 
              track your progress with cutting-edge analytics, and compete with peers while building your professional legacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button onClick={() => router.push('/auth')} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-emerald-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group">Get Started
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button 
                onClick={() => setShowOnboarding(true)}
                className="border-2 border-emerald-500 text-emerald-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300 hover:shadow-lg">Quick Tour
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-4 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Top Performers Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Experience the most sophisticated fundraising platform designed exclusively for ambitious student professionals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-500 border border-gray-100 group hover:-translate-y-2">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-5 w-20 h-20 mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Analytics</h3>
              <p className="text-gray-600 leading-relaxed">Leverage machine learning insights with predictive analytics, behavioral tracking, and personalized recommendations to optimize your fundraising strategy.</p>
            </div>
            <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-500 border border-gray-100 group hover:-translate-y-2">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-5 w-20 h-20 mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Elite Recognition System</h3>
              <p className="text-gray-600 leading-relaxed">Earn prestigious badges, unlock exclusive rewards, and gain industry recognition through our comprehensive achievement framework.</p>
            </div>
            <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-500 border border-gray-100 group hover:-translate-y-2">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-5 w-20 h-20 mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mentorship Network</h3>
              <p className="text-gray-600 leading-relaxed">Connect with industry leaders, participate in exclusive masterclasses, and accelerate your career through our premium mentorship program.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="how-it-works" className="bg-gradient-to-br from-emerald-50 to-teal-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Your Journey to Success</h2>
            <p className="text-xl text-gray-600">Four strategic steps to transform your fundraising career</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-2xl font-bold rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="testimonials" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Success Stories</h2>
            <p className="text-xl text-gray-600">Testimonials from our top-performing interns</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl relative shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1">
                <Quote className="absolute top-6 right-6 text-emerald-200 group-hover:text-emerald-300 transition-colors" size={40} />
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-emerald-600 font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={18} />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed text-lg">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="about" className="bg-gray-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-white mb-8">About FundRaise Portal</h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Founded by successful alumni who revolutionized the fundraising industry, FundRaise Portal 
                represents the pinnacle of professional development platforms for ambitious students.</p>
              <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                We combine Silicon Valley innovation with proven methodologies, creating an ecosystem 
                where exceptional talent thrives and industry leaders are born.</p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-emerald-400 mb-3">Our Mission</h3>
                  <p className="text-gray-300">Cultivating the next generation of fundraising executives</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-emerald-400 mb-3">Our Vision</h3>
                  <p className="text-gray-300">Redefining impact through strategic innovation</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-500">
              <h3 className="text-3xl font-bold text-white mb-8">Platform Excellence</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <CheckCircle className="text-emerald-400 mr-4 mt-1 flex-shrink-0" size={22} />
                  <span className="text-gray-300 text-lg">Executive-level training and mentorship programs</span></li>
                <li className="flex items-start">
                  <CheckCircle className="text-emerald-400 mr-4 mt-1 flex-shrink-0" size={22} />
                  <span className="text-gray-300 text-lg">Advanced AI-powered performance analytics</span></li>
                <li className="flex items-start">
                  <CheckCircle className="text-emerald-400 mr-4 mt-1 flex-shrink-0" size={22} />
                  <span className="text-gray-300 text-lg">Premium rewards and industry recognition</span></li>
                <li className="flex items-start">
                  <CheckCircle className="text-emerald-400 mr-4 mt-1 flex-shrink-0" size={22} />
                  <span className="text-gray-300 text-lg">Exclusive network of high-achievers</span></li>
                <li className="flex items-start">
                  <CheckCircle className="text-emerald-400 mr-4 mt-1 flex-shrink-0" size={22} />
                  <span className="text-gray-300 text-lg">Strategic referral program with premium benefits</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-teal-600/90"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-5xl font-bold text-white mb-8">Ready to Lead the Future?</h2>
          <p className="text-xl text-emerald-100 mb-12 leading-relaxed">Join an elite community of future leaders who are reshaping the fundraising landscape</p>
          <button onClick={() => router.push('/auth')} className="bg-white text-emerald-700 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 inline-flex items-center shadow-2xl hover:shadow-white/25 group">Begin Your Journey<ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} /></button>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-xl">
                  <Gift className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold">FundRaise Portal</span>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Empowering exceptional talent through innovative technology and comprehensive professional development programs.</p>
              <div className="flex space-x-5">
                <div className="bg-gray-800 p-3 rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer">
                  <Facebook size={20} /></div>
                <div className="bg-gray-800 p-3 rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer">
                  <Twitter size={20} /></div>
                <div className="bg-gray-800 p-3 rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer">
                  <Linkedin size={20} /></div>
                <div className="bg-gray-800 p-3 rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer">
                  <Instagram size={20} /></div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-8">Platform</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Executive Dashboard</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Advanced Analytics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Elite Leaderboard</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Premium Rewards</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-8">Resources</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Training Academy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Strategic Frameworks</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Success Case Studies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Knowledge Base</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-8">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Mail className="text-emerald-400 mr-4" size={18} />
                  <span className="text-gray-400">fundraiseportal@gmail.com</span></li>
                <li className="flex items-center">
                  <Phone className="text-emerald-400 mr-4" size={18} />
                  <span className="text-gray-400">+91 XXXXXXXXXX</span></li>
                <li className="flex items-center">
                  <MapPin className="text-emerald-400 mr-4" size={18} />
                  <span className="text-gray-400">New delhi, India</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-10 text-center">
            <p className="text-gray-400">
              © 2025 FundRaise Portal. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {showOnboarding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-10 relative shadow-2xl border border-gray-100">
            <button
              onClick={closeOnboarding}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors">
              <X size={20} />
            </button>
            
            <div className="text-center">
              <div className="mb-8">
                {onboardingSteps[currentStep].icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {onboardingSteps[currentStep].title}</h3>
              <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                {onboardingSteps[currentStep].description}</p>

              <div className="flex justify-center space-x-3 mb-10">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index <= currentStep ? 'bg-emerald-600 scale-110' : 'bg-gray-300'
                    }`}
                    />
                ))}
              </div>
              
              <button
                onClick={nextStep}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-0.5">
                {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}