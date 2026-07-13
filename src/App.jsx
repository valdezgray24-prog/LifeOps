import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    responsibility: '',
    area: 'healthcare-appointments',
    consent: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
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

  const styles = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px', fontFamily: 'system-ui, -apple-system, sans-serif' },
    nav: { position: 'sticky', top: 0, backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '16px 0', zIndex: 50 },
    navContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    logo: { fontSize: '20px', fontWeight: 'bold', color: '#111' },
    navLinks: { display: 'flex', gap: '32px', alignItems: 'center' },
    navLink: { color: '#374151', cursor: 'pointer', fontSize: '14px', fontWeight: '500' },
    button: { padding: '10px 24px', backgroundColor: '#111', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' },
    hero: { backgroundColor: '#f9fafb', padding: '60px 0', textAlign: 'center' },
    heroTitle: { fontSize: '48px', fontWeight: 'bold', color: '#111', marginBottom: '24px', lineHeight: '1.2' },
    heroText: { fontSize: '18px', color: '#374151', maxWidth: '600px', margin: '0 auto 32px', lineHeight: '1.6' },
    heroCta: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' },
    section: { padding: '60px 0' },
    sectionTitle: { fontSize: '40px', fontWeight: 'bold', color: '#111', textAlign: 'center', marginBottom: '48px' },
    sectionSubtitle: { color: '#059669', fontWeight: '600', marginBottom: '16px', textAlign: 'center' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' },
    card: { backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' },
    feature: { textAlign: 'center' },
    featureIcon: { width: '64px', height: '64px', backgroundColor: '#d1fae5', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' },
    quote: { backgroundColor: '#d1fae5', borderRadius: '12px', padding: '32px', textAlign: 'center', fontSize: '20px', fontWeight: '600', color: '#111', marginTop: '32px' },
    formSection: { backgroundColor: '#f9fafb', padding: '60px 0' },
    form: { backgroundColor: '#fff', padding: '48px', borderRadius: '12px', border: '1px solid #e5e7eb', maxWidth: '800px', margin: '0 auto' },
    formGroup: { marginBottom: '24px' },
    formLabel: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#111', marginBottom: '8px' },
    formInput: { width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' },
    formButton: { width: '100%', padding: '12px', backgroundColor: '#111', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', marginTop: '32px' },
    faqSection: { backgroundColor: '#f9fafb', padding: '60px 0' },
    faqItem: { backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '16px' },
    faqQuestion: { padding: '24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600', color: '#111' },
    faqAnswer: { padding: '0 24px 24px 24px', color: '#4b5563', lineHeight: '1.6', borderTop: '1px solid #e5e7eb' },
    footer: { backgroundColor: '#111', color: '#9ca3af', padding: '48px 0', borderTop: '1px solid #374151' },
    footerGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', marginBottom: '32px' },
    footerTitle: { color: '#fff', fontWeight: '600', marginBottom: '16px' },
    successMessage: { textAlign: 'center', padding: '48px' }
  };

  return (
    <div>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={{...styles.container, ...styles.navContent}}>
          <div style={styles.logo}>✓ LifeOps</div>
          <div style={styles.navLinks}>
            <span style={styles.navLink}>The Problem</span>
            <span style={styles.navLink}>How It Works</span>
            <span style={styles.navLink}>FAQ</span>
            <button style={styles.button}>Join the Beta</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <h1 style={styles.heroTitle}>You don't have to carry everything anymore.</h1>
          <p style={styles.heroText}>LifeOps is being built to help busy people manage recurring responsibilities without adding more work, more reminders, or more screen time. We are starting with healthcare appointments—helping users remember what is due, find their provider, prepare the request, and communicate with the office with their approval.</p>
          <div style={styles.heroCta}>
            <button style={styles.button}>Join the Early Beta</button>
            <button style={{...styles.button, backgroundColor: 'transparent', color: '#111', border: '2px solid #111'}}>See How It Works</button>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={{textAlign: 'center', marginBottom: '48px'}}>
            <p style={{color: '#059669', fontWeight: '600', marginBottom: '8px'}}>The invisible workload of adulthood</p>
            <h2 style={styles.sectionTitle}>Adult life comes with too many things to remember.</h2>
            <p style={{fontSize: '18px', color: '#374151', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6'}}>Doctor appointments, dental cleanings, prescription follow-ups, vehicle maintenance, renewals, school forms, home repairs, and dozens of other responsibilities compete for attention every day. The burden comes from having to remember all of them.</p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={{textAlign: 'center', marginBottom: '48px'}}>
            <p style={{color: '#059669', fontWeight: '600', marginBottom: '8px'}}>A quieter way to manage life</p>
            <h2 style={styles.sectionTitle}>Meet LifeOps.</h2>
          </div>
          <div style={styles.grid}>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>📅</div>
              <h3 style={{fontWeight: 'bold', marginBottom: '12px'}}>Remember</h3>
              <p style={{color: '#374151', lineHeight: '1.6'}}>LifeOps keeps track of recurring responsibilities and knows when the next action is approaching.</p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>📝</div>
              <h3 style={{fontWeight: 'bold', marginBottom: '12px'}}>Prepare</h3>
              <p style={{color: '#374151', lineHeight: '1.6'}}>LifeOps gathers provider details, remembers your preferences, and prepares the communication for review.</p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>✓</div>
              <h3 style={{fontWeight: 'bold', marginBottom: '12px'}}>Handle</h3>
              <p style={{color: '#374151', lineHeight: '1.6'}}>After you approve the action, LifeOps sends the request and tracks what happens next.</p>
            </div>
          </div>
          <div style={styles.quote}>
            "You provide the direction. LifeOps handles the administration."
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section style={styles.formSection} id="waitlist">
        <div style={styles.container}>
          {!formSubmitted ? (
            <div style={styles.form}>
              <h2 style={{fontSize: '32px', fontWeight: 'bold', color: '#111', marginBottom: '16px', textAlign: 'center'}}>Join the LifeOps Early Beta</h2>
              <p style={{color: '#374151', textAlign: 'center', marginBottom: '32px'}}>Tell us where LifeOps could remove the most mental load from your life.</p>
              <form onSubmit={handleFormSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>First name *</label>
                  <input type="text" name="firstName" placeholder="Your first name" value={formData.firstName} onChange={handleInputChange} style={styles.formInput} required />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Email address *</label>
                  <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} style={styles.formInput} required />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>What is one recurring responsibility you wish someone else would handle? *</label>
                  <textarea name="responsibility" placeholder="Scheduling appointments, prescription refills, vehicle maintenance..." value={formData.responsibility} onChange={handleInputChange} style={{...styles.formInput, resize: 'vertical', height: '100px'}} required />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Which area would you want help with first?</label>
                  <select name="area" value={formData.area} onChange={handleInputChange} style={styles.formInput}>
                    <option value="healthcare-appointments">Healthcare appointments</option>
                    <option value="prescription-management">Prescription management</option>
                    <option value="family-responsibilities">Family responsibilities</option>
                    <option value="home-maintenance">Home maintenance</option>
                  </select>
                </div>
                <div style={{...styles.formGroup, display: 'flex', gap: '12px', alignItems: 'flex-start'}}>
                  <input type="checkbox" name="consent" checked={formData.consent} onChange={handleInputChange} style={{marginTop: '6px'}} required />
                  <label style={{fontSize: '14px', color: '#374151'}}>I agree to receive LifeOps beta updates and understand that the product is still being developed. *</label>
                </div>
                <button type="submit" style={styles.formButton}>Join the Early Beta</button>
                <p style={{fontSize: '12px', color: '#9ca3af', textAlign: 'center', marginTop: '16px'}}>No spam. No selling your information. Unsubscribe at any time.</p>
              </form>
            </div>
          ) : (
            <div style={styles.form}>
              <div style={styles.successMessage}>
                <h2 style={{fontSize: '32px', fontWeight: 'bold', color: '#111', marginBottom: '24px'}}>You're on the list.</h2>
                <p style={{color: '#374151', marginBottom: '24px'}}>Thank you for helping us build LifeOps. We will send you product updates and let you know when founding beta access opens.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section style={styles.faqSection} id="faq">
        <div style={styles.container}>
          <h2 style={{...styles.sectionTitle, marginBottom: '32px'}}>Frequently asked questions</h2>
          {faqItems.map((item, idx) => (
            <div key={idx} style={styles.faqItem}>
              <div style={styles.faqQuestion} onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}>
                <span>{item.question}</span>
                <span>{expandedFaq === idx ? '▼' : '▶'}</span>
              </div>
              {expandedFaq === idx && (
                <div style={styles.faqAnswer}>{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerGrid}>
            <div>
              <div style={{...styles.footerTitle, marginBottom: '12px'}}>✓ LifeOps</div>
              <p style={{fontSize: '14px'}}>Less time managing life. More time living it.</p>
            </div>
            <div>
              <div style={styles.footerTitle}>Product</div>
              <p style={{fontSize: '14px', cursor: 'pointer'}}>How it works</p>
              <p style={{fontSize: '14px', cursor: 'pointer'}}>FAQ</p>
            </div>
          </div>
          <div style={{borderTop: '1px solid #374151', paddingTop: '32px'}}>
            <p style={{fontSize: '12px', color: '#6b7280'}}>© 2026 LifeOps. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
