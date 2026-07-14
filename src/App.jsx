import React, { useState, useRef } from 'react';
import { Menu, X, Check, Calendar, FileText, CheckCircle, ChevronDown } from 'lucide-react';

const LifeOpsLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    responsibility: '',
    area: 'healthcare-appointments',
    consent: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [expandedFaq, setExpandedFaq] = useState(null);
  const formSectionRef = useRef(null);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.responsibility.trim()) {
      errors.responsibility = 'Please tell us about a responsibility';
    }
    
    if (!formData.consent) {
      errors.consent = 'You must agree to receive updates';
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Form submission logic
    // TODO: Connect to backend service here
    // Options:
    // 1. Formspree: POST to https://formspree.io/f/{FORM_ID}
    // 2. Supabase: Insert into table using createClient
    // 3. Mailchimp: Use API to add subscriber to list
    // 4. ConvertKit: POST to https://api.convertkit.com/v3/subscribers
    // 5. Beehiiv: POST to their subscriber API endpoint
    // 6. Custom backend: POST to your own endpoint
    
    // For now, just show success message
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    // Reset form after showing success
    setTimeout(() => {
      setFormData({
        firstName: '',
        email: '',
        responsibility: '',
        area: 'healthcare-appointments',
        consent: false,
      });
    }, 2000);
  };

  const faqItems = [
    {
      question: 'Is LifeOps available now?',
      answer: 'LifeOps is currently being designed and prepared for an early beta. Joining the waitlist gives you the opportunity to receive updates and be considered for early access.'
    },
    {
      question: 'Will LifeOps book appointments without my permission?',
      answer: 'The first version is being designed around user approval. LifeOps prepares the communication, and the user reviews and approves it before it is sent.'
    },
    {
      question: 'Will LifeOps replace my calendar or reminder app?',
      answer: 'No. LifeOps is being designed to reduce the administrative work behind recurring responsibilities, not simply create more reminders.'
    },
    {
      question: 'What if my provider cannot be found?',
      answer: 'Users will be able to add a provider manually, including specialty doctors or offices located outside their normal search radius.'
    },
    {
      question: 'Will LifeOps store medical records?',
      answer: 'The initial beta is focused on appointment administration and provider information, not medical diagnosis or full medical-record storage.'
    },
    {
      question: 'How will LifeOps protect personal information?',
      answer: 'Privacy, transparency, and user control are core product principles. The beta will clearly explain what information is collected, why it is needed, and how users can delete or change it.'
    }
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
              ✓
            </div>
            <span className="text-xl font-bold text-gray-900">LifeOps</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('problem')} className="text-gray-700 hover:text-teal-600 font-medium transition">
              The Problem
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-teal-600 font-medium transition">
              How It Works
            </button>
            <button onClick={() => scrollToSection('why-lifeops')} className="text-gray-700 hover:text-teal-600 font-medium transition">
              Why LifeOps
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-700 hover:text-teal-600 font-medium transition">
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('waitlist')}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Join the Beta
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
              <button onClick={() => scrollToSection('problem')} className="text-left text-gray-700 font-medium">
                The Problem
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-left text-gray-700 font-medium">
                How It Works
              </button>
              <button onClick={() => scrollToSection('why-lifeops')} className="text-left text-gray-700 font-medium">
                Why LifeOps
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-left text-gray-700 font-medium">
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('waitlist')}
                className="w-full px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
              >
                Join the Beta
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-50 text-teal-700 rounded-full text-sm font-medium">
                  Coming soon: Your personal operations assistant
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                You don't have to carry everything anymore.
              </h1>

              <p className="text-lg text-gray-700 leading-relaxed max-w-md">
                LifeOps is being built to help busy people manage recurring responsibilities without adding more work, more reminders, or more screen time. We are starting with healthcare appointments—helping users remember what is due, find their provider, prepare the request, and communicate with the office with their approval.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('waitlist')}
                  className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition transform hover:scale-105"
                >
                  Join the Early Beta
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  See How It Works
                </button>
              </div>

              <p className="text-sm text-gray-600">
                Early access is free. No spam. Help shape the first version.
              </p>
            </div>

            {/* Right Side - Product Mockup */}
            <div className="hidden md:block">
              <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-lg">
                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 space-y-6">
                  <div>
                    <p className="text-sm text-gray-600">Good morning, Gray</p>
                    <h3 className="text-2xl font-bold text-gray-900">Everything is under control.</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">Dental Cleaning</p>
                          <p className="text-sm text-gray-600">Due in 18 days</p>
                        </div>
                        <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
                          Ready to schedule
                        </span>
                      </div>
                      <button className="w-full mt-3 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition">
                        Prepare Request
                      </button>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">Annual Eye Exam</p>
                          <p className="text-sm text-gray-600">Due in 4 months</p>
                        </div>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                          Tracking
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600 flex items-center gap-2">
                      <Check size={14} className="text-teal-600" />
                      LifeOps found your provider information.
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-2">
                      <Check size={14} className="text-teal-600" />
                      Your preferences are saved: Tuesday or Thursday mornings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-semibold mb-2">The invisible workload of adulthood</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Adult life comes with too many things to remember.
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Doctor appointments, dental cleanings, prescription follow-ups, vehicle maintenance, renewals, school forms, home repairs, and dozens of other responsibilities compete for attention every day. None of these tasks is difficult by itself. The burden comes from having to remember all of them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              'I still need to call the dentist.',
              'When was my last eye exam?',
              'I forgot to follow up with the doctor.',
              'I can only call during work hours.',
              'Which office location do I use?',
              'I know I need to do it—I just haven\'t had time.'
            ].map((card, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-md transition">
                <p className="text-gray-800 font-medium">{card}</p>
              </div>
            ))}
          </div>

          <div className="text-center bg-white rounded-2xl border border-gray-200 p-8">
            <p className="text-xl text-gray-900 font-semibold">
              The problem is not a lack of reminders. The problem is that you are still responsible for handling everything.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-semibold mb-2">A quieter way to manage life</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Meet LifeOps.
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              LifeOps is designed to become the trusted personal operations system that remembers recurring responsibilities, prepares the next step, and helps complete administrative work while keeping the user informed and in control.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto">
                <Calendar className="text-teal-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Remember</h3>
              <p className="text-gray-700">LifeOps keeps track of recurring responsibilities and knows when the next action is approaching.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto">
                <FileText className="text-teal-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Prepare</h3>
              <p className="text-gray-700">LifeOps gathers provider details, remembers your preferences, and prepares the communication for review.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto">
                <CheckCircle className="text-teal-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Handle</h3>
              <p className="text-gray-700">After you approve the action, LifeOps sends the supported request and tracks what happens next.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-teal-200 text-center">
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              "You provide the direction. LifeOps handles the administration."
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-16 text-center">
            How the first LifeOps experience will work
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Timeline Steps */}
            <div className="space-y-8">
              {[
                { num: '1', title: 'Tell LifeOps who your provider is', text: 'Enter your doctor\'s name and specialty.' },
                { num: '2', title: 'LifeOps searches for the correct office', text: 'Using your location and selected travel radius, LifeOps looks for matching providers and office locations.' },
                { num: '3', title: 'Choose the correct provider', text: 'If multiple results are found, select the name and address that match your office. If the provider is outside the radius or cannot be found, you can add the provider manually.' },
                { num: '4', title: 'Set your preferences', text: 'Choose how often you normally visit and which days and times work best.' },
                { num: '5', title: 'Approve the scheduling request', text: 'When the appointment is due, LifeOps prepares the message. You review it, approve it, and LifeOps sends it through a supported communication channel.' }
              ].map((step) => (
                <div key={step.num} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {step.num}
                    </div>
                    {step.num !== '5' && <div className="w-0.5 h-16 bg-gray-300 mt-2" />}
                  </div>
                  <div className="pt-1 pb-4">
                    <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Provider Search Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 h-fit">
              <h3 className="font-bold text-gray-900 mb-6">Example: Find your provider</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Doctor's name</label>
                  <input
                    type="text"
                    defaultValue="Dr. Sarah Johnson"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <input
                    type="text"
                    defaultValue="Dentist"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search radius</label>
                  <input
                    type="text"
                    defaultValue="Within 10 miles"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-3 mb-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700">Results:</p>
                {[
                  { name: 'Dr. Sarah Johnson', clinic: 'ABC Dental Care', address: '123 Main Street, Weatherford, TX', distance: '3.2 miles away' },
                  { name: 'Dr. Sarah Johnson', clinic: 'Parker County Dental Group', address: '450 Oak Avenue, Hudson Oaks, TX', distance: '8.7 miles away' }
                ].map((result, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <p className="font-medium text-gray-900">{result.name}</p>
                    <p className="text-sm text-gray-600">{result.clinic}</p>
                    <p className="text-sm text-gray-600">{result.address}</p>
                    <p className="text-xs text-teal-600 font-medium mt-2">{result.distance}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition">
                  Select Provider
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-900 text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition">
                  Add Manually
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Wow Moment Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
            The moment LifeOps becomes valuable
          </h2>

          <div className="space-y-8">
            {/* Notification */}
            <div className="bg-white text-gray-900 rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-bold">Your six-month dental cleaning is due soon.</h3>
              <p className="text-gray-700">
                I found your provider, saved your preferred times, and prepared the appointment request.
              </p>
              <div className="flex gap-3 pt-4">
                <button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition text-sm">
                  Review Request
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition text-sm">
                  Remind Me Later
                </button>
              </div>
            </div>

            {/* Email Preview */}
            <div className="bg-gray-800 rounded-2xl p-8 space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Subject:</p>
                <p className="font-semibold text-white">Appointment Request</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-6 space-y-4">
                <p className="text-gray-100">Hello,</p>
                <p className="text-gray-100 text-sm leading-relaxed">
                  I would like to schedule my next dental cleaning. My preferred availability is Tuesday or Thursday morning. Please let me know which appointments are available.
                </p>
                <p className="text-gray-100">Thank you.</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="px-6 py-2 border border-gray-600 text-white rounded-lg font-medium hover:border-gray-500 transition text-sm">
                  Edit
                </button>
                <button className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition text-sm">
                  Approve and Send
                </button>
              </div>
            </div>

            <p className="text-center text-gray-400 text-lg">
              The goal is not another notification. The goal is one less responsibility living in your head.
            </p>
          </div>
        </div>
      </section>

      {/* Why LifeOps Section */}
      <section id="why-lifeops" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-16 text-center">
            Built to reduce screen time—not create more of it.
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Minimum input',
                text: 'LifeOps should ask only for information it cannot reliably find.'
              },
              {
                title: 'Approval before action',
                text: 'Important communications remain under the user\'s control.'
              },
              {
                title: 'Quiet automation',
                text: 'The product should work in the background and interrupt only when needed.'
              },
              {
                title: 'Trust earned over time',
                text: 'LifeOps starts with one responsibility and earns the opportunity to handle more.'
              }
            ].map((principle, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h3>
                <p className="text-gray-700">{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Beta Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Help build the assistant you wish already existed.
          </h2>
          <p className="text-lg text-gray-700 mb-12">
            We are inviting a small group of founding beta members to help shape the first version of LifeOps. Founding members will provide feedback on the healthcare appointment workflow, trust settings, messaging, and overall experience.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              'Early access to the first beta',
              'Direct influence on product development',
              'Founding-member updates and behind-the-scenes progress'
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                <p className="text-gray-800 font-medium">{benefit}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('waitlist')}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition transform hover:scale-105"
          >
            Become a Founding Beta Member
          </button>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist" className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          {!formSubmitted ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                Join the LifeOps Early Beta
              </h2>
              <p className="text-gray-700 text-center mb-8">
                Tell us where LifeOps could remove the most mental load from your life.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    First name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-teal-600 transition ${
                      formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.firstName && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-teal-600 transition ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    What is one recurring responsibility you wish someone else would handle? *
                  </label>
                  <textarea
                    name="responsibility"
                    placeholder="Scheduling appointments, prescription refills, vehicle maintenance, renewals…"
                    value={formData.responsibility}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-teal-600 transition resize-none ${
                      formErrors.responsibility ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.responsibility && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.responsibility}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Which area would you want help with first?
                  </label>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-teal-600 transition"
                  >
                    <option value="healthcare-appointments">Healthcare appointments</option>
                    <option value="prescription-management">Prescription management</option>
                    <option value="family-responsibilities">Family responsibilities</option>
                    <option value="home-maintenance">Home maintenance</option>
                    <option value="vehicle-maintenance">Vehicle maintenance</option>
                    <option value="renewals-deadlines">Renewals and deadlines</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="w-5 h-5 mt-1 accent-teal-600 cursor-pointer"
                  />
                  <label className="text-sm text-gray-700">
                    I agree to receive LifeOps beta updates and understand that the product is still being developed. *
                  </label>
                </div>
                {formErrors.consent && (
                  <p className="text-red-600 text-sm">{formErrors.consent}</p>
                )}

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition transform hover:scale-105 mt-8"
                >
                  Join the Early Beta
                </button>

                <p className="text-xs text-gray-600 text-center">
                  No spam. No selling your information. Unsubscribe at any time.
                </p>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Check className="text-green-600" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                You're on the list.
              </h2>
              <p className="text-gray-700 max-w-md mx-auto">
                Thank you for helping us build LifeOps. We will send you product updates and let you know when founding beta access opens.
              </p>
              <button
                onClick={() => scrollToSection('problem')}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition inline-block"
              >
                Follow the Journey
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently asked questions
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <h3 className="font-semibold text-gray-900 text-left">{item.question}</h3>
                  <ChevronDown
                    size={20}
                    className={`text-gray-600 flex-shrink-0 transition ${expandedFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>

                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            One less thing to remember starts here.
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join the founding beta community and help build a calmer way to manage everyday life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('waitlist')}
              className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              Join the LifeOps Beta
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition"
            >
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
                  ✓
                </div>
                <span className="text-xl font-bold text-white">LifeOps</span>
              </div>
              <p className="text-sm">Less time managing life. More time living it.</p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('how-it-works')} className="text-sm hover:text-white transition block">How it works</button>
                <button onClick={() => scrollToSection('why-lifeops')} className="text-sm hover:text-white transition block">Why LifeOps</button>
                <button onClick={() => scrollToSection('faq')} className="text-sm hover:text-white transition block">FAQ</button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <div className="space-y-2">
                <a href="#" className="text-sm hover:text-white transition block">Privacy</a>
                <a href="#" className="text-sm hover:text-white transition block">Terms</a>
                <a href="#" className="text-sm hover:text-white transition block">Contact</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 space-y-4">
            <p className="text-xs text-gray-500">
              LifeOps is currently in development. Website content describes planned functionality and may change before release. LifeOps is not a healthcare provider and does not provide medical advice.
            </p>
            <p className="text-xs text-gray-500">
              © 2026 LifeOps. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LifeOpsLanding;
