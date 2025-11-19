import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  Shield, 
  QrCode, 
  FileCheck, 
  Mail, 
  Zap, 
  Lock, 
  BarChart3, 
  UploadCloud, 
  ScanLine, 
  Keyboard, 
  Menu, 
  X, 
  Check, 
  ChevronRight, 
  ArrowRight 
} from 'lucide-react';

// --- Sub-Components (Defined first for use in LandingPage) ---

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-xl border border-slate-100 hover:shadow-xl transition-all duration-300 group text-left">
    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
      <div className="text-blue-600 group-hover:text-white transition-colors">
        {React.cloneElement(icon, { width: 24, height: 24 })}
      </div>
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const StepCard = ({ number, icon, title, desc }) => (
  <div className="relative flex-1 flex flex-col items-center text-center z-10 group">
    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mb-6 shadow-lg ring-4 ring-white group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { width: 28, height: 28 })}
      <span className="absolute -top-2 -right-2 bg-amber-400 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
        {number}
      </span>
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{desc}</p>
  </div>
);

const PricingCard = ({ title, desc, price, period, features, icon, buttonText, isPopular = false, buttonColor = "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50" }) => (
  <div className={`w-full max-w-sm bg-white rounded-2xl p-8 flex flex-col h-full ${isPopular ? 'shadow-2xl ring-1 ring-slate-200' : 'shadow-lg border border-slate-100'}`}>
    <div className="flex flex-col items-center text-center mb-8">
      <div className="mb-4 bg-slate-50 p-3 rounded-xl">
          {icon || <Zap className="w-6 h-6 text-blue-500" />}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-xs text-slate-500 h-8">{desc}</p>
      <div className="mt-6 flex items-end justify-center gap-1 text-slate-800">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-sm text-slate-400 mb-1">{period}</span>
      </div>
    </div>
    
    <div className="flex-1 mb-8">
      <ul className="space-y-3">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
            <Check className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </div>
    
    <button className={`w-full py-3 rounded-lg font-bold transition-colors ${buttonColor}`}>
      {buttonText}
    </button>
  </div>
);


const LandingPage = () => {
  // --- FIX: State declaration is now correctly inside the component function ---
  const [selectedPlan, setSelectedPlan] = useState('Professional'); // Default middle one selected
  // --------------------------------------------------------------------------

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload', 'scan', 'id'

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <Shield className="w-8 h-8 text-blue-600 fill-blue-600" />
            <span className="text-2xl font-bold text-blue-600 tracking-tight">CertiSure</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button onClick={() => scrollToSection('features')} className="hover:text-blue-600 transition-colors">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-blue-600 transition-colors">How It Works</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-blue-600 transition-colors">Pricing</button>
            <button onClick={() => scrollToSection('verify')} className="hover:text-blue-600 transition-colors">Verify Document</button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-sm font-semibold text-slate-700 hover:text-blue-600">Sign In</button>
            <button className="bg-amber-400 hover:bg-amber-500 text-white text-sm font-bold py-2.5 px-6 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full">
            <div className="flex flex-col p-4 space-y-4 font-medium text-slate-600">
              <button onClick={() => scrollToSection('features')} className="text-left hover:text-blue-600">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-left hover:text-blue-600">How It Works</button>
              <button onClick={() => scrollToSection('pricing')} className="text-left hover:text-blue-600">Pricing</button>
              <button onClick={() => scrollToSection('verify')} className="text-left hover:text-blue-600">Verify Document</button>
              <hr />
              <button className="text-left text-slate-800">Sign In</button>
              <button className="bg-amber-400 text-white font-bold py-2 px-4 rounded-lg w-full">Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 bg-white overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3 h-3" /> India's Trusted Verification Platform
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15]">
                Stop Certificate Fraud. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">Verify Instantly.</span>
              </h1>
              
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Issue tamper-proof offer letters, certificates, and documents with unique verification codes. Build trust with instant authenticity checks.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-white text-base font-bold py-3.5 px-8 rounded-lg shadow-lg hover:shadow-amber-400/30 transition-all transform hover:-translate-y-1">
                  Start Free Trial
                </button>
                <button 
                  onClick={() => scrollToSection('verify')}
                  className="w-full sm:w-auto bg-white border-2 border-slate-800 text-slate-800 hover:bg-slate-50 text-base font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Verify a Document
                </button>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> AI Powered Detection</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Unique QR Codes</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Bank-Grade Security</span>
              </div>
            </div>

            {/* Right Image/Illustration */}
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-200 bg-gradient-to-br from-teal-400 to-emerald-500 p-8 lg:p-12 h-[400px] flex items-center justify-center">
                {/* Mock UI elements for the illustration */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                
                <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl w-full max-w-md">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-20 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center p-2">
                        <div className="w-full h-1 bg-slate-200 mb-1"></div>
                        <div className="w-full h-1 bg-slate-200 mb-1"></div>
                        <div className="w-2/3 h-1 bg-slate-200"></div>
                        <div className="mt-2 w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-500" />
                        </div>
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-white/80 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-white/50 rounded w-1/2"></div>
                    </div>
                    <Shield className="w-12 h-12 text-amber-300 drop-shadow-lg" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white/20 rounded p-3">
                      <span className="text-white font-medium text-sm">Document ID</span>
                      <span className="text-white font-mono text-sm">#8X92-K291</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/20 rounded p-3">
                      <span className="text-white font-medium text-sm">Status</span>
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">VERIFIED</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="bg-blue-100 p-2 rounded-full"><Shield className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <p className="text-xs text-slate-500">Verification Speed</p>
                    <p className="text-sm font-bold text-slate-800">&lt; 1 Second</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Everything You Need to <span className="text-teal-500">Eliminate Fraud</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-16">
            Powerful features designed to protect your organization and build trust with every document you issue.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<QrCode />} 
              title="Unique ID & QR Codes" 
              desc="Every document gets a cryptographic unique identifier and scannable QR code that can't be duplicated or forged." 
            />
            <FeatureCard 
              icon={<Shield />} 
              title="AI Document Scanning" 
              desc="Advanced AI detects tampering, edits, and forgeries by analyzing document hashes and signatures." 
            />
            <FeatureCard 
              icon={<Mail />} 
              title="Direct Email Integration" 
              desc="Send verified documents directly through our platform with embedded authenticity codes." 
            />
            <FeatureCard 
              icon={<Zap />} 
              title="Instant Verification" 
              desc="Verify any document in seconds - just upload the file or scan the QR code for immediate results." 
            />
            <FeatureCard 
              icon={<Lock />} 
              title="Bank-Grade Security" 
              desc="Enterprise-level encryption and secure cloud storage keep all documents protected from unauthorized access." 
            />
            <FeatureCard 
              icon={<BarChart3 />} 
              title="Analytics Dashboard" 
              desc="Track documents issued, verification success rates, and detailed analytics for your organization." 
            />
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              How <span className="text-blue-600">CertiSure</span> Works
            </h2>
            <p className="text-slate-600 mt-4">Four simple steps to eliminate document fraud and build trust.</p>
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-start max-w-5xl mx-auto gap-8">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-8 left-12 right-12 h-0.5 bg-blue-100 -z-0"></div>

              <StepCard number="01" icon={<UploadCloud />} title="Upload Document" desc="Companies upload certificates, offer letters, or any official document to our secure platform." />
              <StepCard number="02" icon={<ScanLine />} title="AI Verification" desc="Our AI scans the document for authenticity, assigns a unique cryptographic ID, and embeds a QR code." />
              <StepCard number="03" icon={<Mail />} title="Secure Distribution" desc="Send verified documents directly through our platform or download them with embedded verification codes." />
              <StepCard number="04" icon={<Check />} title="Instant Verification" desc="Anyone can verify document authenticity by uploading it or scanning the QR code - results in seconds." />
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center ">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 ">
            Simple, Transparent <span className="text-teal-500">Pricing</span>
          </h2>
          <p className="text-slate-600 mb-12">Choose the plan that fits your needs.</p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto py-10 px-4">
 
            {/* Basic Plan */}
            <div 
              onClick={() => setSelectedPlan('Basic')}
              className={`cursor-pointer transition-all duration-300 ease-in-out transform 
                ${selectedPlan === 'Basic' 
                  ? 'scale-105 z-20 shadow-2xl ring-2 ring-blue-200 rounded-xl bg-white' 
                  : 'scale-100 hover:scale-102 opacity-90 hover:opacity-100'
                }`}
            >
              <PricingCard 
                title="Basic" 
                desc="Perfect for small businesses and startups" 
                price="₹149" 
                period="/month"
                icon={<Zap className="w-6 h-6 text-blue-500" />}
                features={[
                  "Upload up to 150 documents/month",
                  "Generate unique IDs & QR codes",
                  "Document download (no email sending)",
                  "Basic AI scanning",
                  "Standard support"
                ]}
                buttonText="Start Basic"
                // Optional: Button style change based on selection
                buttonColor={selectedPlan === 'Basic' ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-200"}
              />
            </div>

            {/* Professional Plan (Highlighted) */}
            <div 
              onClick={() => setSelectedPlan('Professional')}
              className={`relative w-full max-w-sm cursor-pointer transition-all duration-300 ease-in-out transform
                ${selectedPlan === 'Professional' 
                  ? 'lg:-translate-y-6 scale-105 z-30 shadow-2xl' // Selected: Thoda aur upar aur bada
                  : 'lg:-translate-y-4 scale-100 z-10 opacity-90 hover:opacity-100' // Unselected: Normal position
                }`}
            >
              <div className="absolute -top-4 left-0 right-0 flex justify-center z-40">
                <span className="bg-amber-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md animate-pulse">Most Popular</span>
              </div>
              <PricingCard 
                isPopular={true}
                title="Professional" 
                desc="For growing companies with verification needs" 
                price="₹229" 
                period="/month"
                icon={<div className="bg-blue-100 p-2 rounded-md"><FileCheck className="w-6 h-6 text-blue-600" /></div>}
                features={[
                  "Upload 150 + Send 150 documents",
                  "Direct email integration",
                  "Advanced AI tamper detection",
                  "Priority scanning",
                  "Email & chat support",
                  "Custom branding options"
                ]}
                buttonText="Start Professional"
                buttonColor="bg-amber-400 hover:bg-amber-500 text-white"
              />
            </div>

            {/* Enterprise Plan */}
            <div 
              onClick={() => setSelectedPlan('Enterprise')}
              className={`cursor-pointer transition-all duration-300 ease-in-out transform
                ${selectedPlan === 'Enterprise' 
                  ? 'scale-105 z-20 shadow-2xl ring-2 ring-blue-200 rounded-xl bg-white' 
                  : 'scale-100 hover:scale-102 opacity-90 hover:opacity-100'
                }`}
            >
              <PricingCard 
                title="Enterprise" 
                desc="For large organizations and institutions" 
                price="₹2,199" 
                period="/year"
                icon={<div className="bg-blue-50 p-2 rounded-full"><Shield className="w-6 h-6 text-blue-600" /></div>}
                features={[
                  "Upload 250 + Send 250 documents/month",
                  "Full white-label branding",
                  "Advanced analytics dashboard",
                  "Multi-user access",
                  "API integration support",
                  "Dedicated account manager",
                  "Priority support 24/7"
                ]}
                buttonText="Start Enterprise"
                buttonColor={selectedPlan === 'Enterprise' ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-200"}
              />
            </div>
          </div>

          {/* Individual Verification Card */}
          <div className="mt-16 max-w-3xl mx-auto bg-white border border-teal-100 rounded-2xl p-8 shadow-lg text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-teal-400"></div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Individual Verification</h3>
              <p className="text-slate-500 mb-6">For students, employees, or anyone who needs to verify a document</p>
              
              <div className="flex items-center justify-center gap-1 mb-6">
                <span className="text-5xl font-bold text-teal-500">₹1</span>
                <span className="text-slate-400 text-lg self-end mb-2">per document</span>
              </div>
              
              <p className="text-sm text-slate-600 max-w-lg mx-auto mb-8">
                Upload any certificate, offer letter, or official document and verify its authenticity instantly.
              </p>

              <button className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all">
                Verify a Document Now
              </button>
          </div>
        </div>
      </section>

      {/* --- VERIFY DOCUMENT TOOL --- */}
      <section id="verify" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Verify a Document <span className="text-teal-500">Instantly</span>
            </h2>
            <p className="text-slate-600 mt-4">Check if any certificate or offer letter is authentic. Results in seconds.</p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-slate-100">
              <button 
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'upload' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                <UploadCloud className="w-4 h-4" /> Upload Document
              </button>
              <button 
                onClick={() => setActiveTab('scan')}
                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'scan' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                <QrCode className="w-4 h-4" /> Scan QR Code
              </button>
              <button 
                onClick={() => setActiveTab('id')}
                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'id' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                <Keyboard className="w-4 h-4" /> Enter Document ID
              </button>
            </div>

            {/* Tool Body */}
            <div className="p-8">
              {activeTab === 'upload' && (
                <div className="border-2 border-dashed border-blue-300 rounded-xl bg-blue-50/30 h-64 flex flex-col items-center justify-center text-center p-6 transition-all">
                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                      <UploadCloud className="w-8 h-8 text-slate-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-700 mb-1">Drop your document here</h4>
                    <p className="text-xs text-slate-400 mb-6">Supports PDF, JPG, PNG (Max 10MB)</p>
                    <button className="bg-white border border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-blue-50 transition-colors">
                      Browse Files
                    </button>
                </div>
              )}

              {activeTab === 'scan' && (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  <div className="w-32 h-32 bg-slate-100 rounded-lg flex items-center justify-center mb-4 border-2 border-slate-200">
                    <QrCode className="w-12 h-12 text-slate-400" />
                  </div>
                  <p className="text-slate-600 mb-4">Allow camera access to scan verification QR codes</p>
                  <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700">
                    Enable Camera
                  </button>
                </div>
              )}

              {activeTab === 'id' && (
                <div className="h-64 flex flex-col items-center justify-center text-center px-4">
                  <h4 className="text-lg font-semibold text-slate-700 mb-4">Enter Unique Document ID</h4>
                  <div className="flex w-full max-w-md gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. 8X92-K291-00Z" 
                      className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 text-white font-semibold px-6 rounded-lg hover:bg-blue-700">
                      Verify
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-4">The ID is usually located at the bottom of the certificate.</p>
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
              <p className="text-sm font-bold text-slate-700">One-time verification fee: ₹1</p>
              <p className="text-xs text-slate-500 mt-1">Instant results • 100% secure • No data stored</p>
            </div>
            
            <div className="p-4">
              <button className="w-full bg-amber-200 hover:bg-amber-300 text-amber-800 font-bold py-4 rounded-lg transition-colors">
                Verify Document (₹1)
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-8 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-teal-400"></div> Bank-Grade Encryption</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-teal-400"></div> No Data Stored</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-teal-400"></div> Instant Results</span>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-100 pt-16 pb-8 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-blue-700 fill-blue-700" />
                <span className="text-xl font-bold text-slate-800">CertiSure</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                India's trusted platform for document verification. Eliminate fraud with AI-powered authenticity checks.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-800 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li onClick={() => scrollToSection('features')} className="hover:text-blue-600 cursor-pointer">Features</li>
                <li onClick={() => scrollToSection('how-it-works')} className="hover:text-blue-600 cursor-pointer">How It Works</li>
                <li onClick={() => scrollToSection('pricing')} className="hover:text-blue-600 cursor-pointer">Pricing</li>
                <li onClick={() => scrollToSection('verify')} className="hover:text-blue-600 cursor-pointer">Verify Document</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="hover:text-blue-600 cursor-pointer">About Us</li>
                <li className="hover:text-blue-600 cursor-pointer">Careers</li>
                <li className="hover:text-blue-600 cursor-pointer">Blog</li>
                <li className="hover:text-blue-600 cursor-pointer">Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> varshitjaiswal407@gmail.com</li>
                <li className="flex items-center gap-2"><div className="w-4 h-4 flex justify-center">📞</div> +91 7869581407</li>
                <li className="flex items-center gap-2"><div className="w-4 h-4 flex justify-center">📍</div> Bhopal , Madhya Pradesh India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2025 CertiSure. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-800">Privacy Policy</a>
              <a href="#" className="hover:text-slate-800">Terms of Service</a>
              <a href="#" className="hover:text-slate-800">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  return (
    <Router>
       <Routes>
         <Route path="/" element={<LandingPage />} />
         {/* You can add more routes here like <Route path="/login" element={<Login />} /> */}
       </Routes>
    </Router>
  );
}