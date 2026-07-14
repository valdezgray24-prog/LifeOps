import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://fbmqiynfwhrfkawuycih.supabase.co',
  'sb_publishable_6luha9vi7YF6FYbGW3b-uw_EbIcJuCY'
);

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
  const [showDashboard, setShowDashboard] = useState(false);
  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await supabase.from('signups').insert([formData]);
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
    } catch (error) {
      console.error('Error saving signup:', error);
    }
  };

  const loadSignups = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from('signups').select('*').order('created_at', { ascending: false });
      setSignups(data || []);
    } catch (error) {
      console.error('Error loading signups:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (showDashboard) {
      loadSignups();
    }
  }, [showDashboard]);

  const faqItems = [
    { question: 'Is LifeOps available now?', answer: 'LifeOps is currently being designed and prepared for an early beta.' },
    { question: 'Will LifeOps book appointments without my permission?', answer: 'The first version is being designed around user approval.' },
    { question: 'Will LifeOps replace my calendar or reminder app?', answer: 'No. LifeOps is designed to reduce administrative work, not create more reminders.' },
    { question: 'What if my provider cannot be found?', answer: 'Users will be able to add a provider manually.' },
    { question: 'Will LifeOps store medical records?', answer: 'The initial beta is focused on appointment administration and provider information.' },
    { question: 'How will LifeOps protect personal information?', answer: 'Privacy, transparency, and user control are core product principles.' }
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
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' },
    card: { backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' },
    feature: { textAlign: 'center' },
    featureIcon: { width: '64px', height: '64px', backgroundColor: '#d1fae5', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' },
    formSection: { backgroundColor: '#f9fafb', padding: '60px 0' },
    form: { backgroundColor: '#fff', padding: '48px', borderRadius: '12px', border: '1px solid #e5e7eb', maxWidth: '800px', margin: '0 auto' },
    formGroup: { marginBottom: '24px' },
    formLabel: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#111', marginBottom: '8px' },
    formInput: { width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' },
    formButton: { width: '100%', padding: '12px', backgroundColor: '#111', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', marginTop: '32px' },
    dashboard: { backgroundColor: '#f9fafb', padding: '60px 0', minHeight: '100vh' },
    table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' },
    th: { backgroundColor: '#f3f4f6', padding: '12px', textAlign: 'left', fontWeight: '600', color: '#111', borderBottom: '1px solid #e5e7eb' },
    td: { padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#374151' },
    footer: { backgroundColor: '#111', color: '#9ca3af', padding: '48px 0' }
  };

  if (showDashboard) {
    return (
      <div>
        <nav style={styles.nav}>
          <div style={{...styles.container, ...styles.navContent}}>
            <div style={styles.logo}>✓ LifeOps Dashboard</div>
            <button style={styles.button} onClick={() => setShowDashboard(false)}>Back to Landing Page</button>
          </div>
        </nav>

        <section style={styles.dashboard}>
          <div style={styles.container}>
            <h1 style={{...styles.sectionTitle, marginBottom: '32px'}}>Beta Signups ({signups.length})</h1>
            {loading ? (
              <p>Loading...</p>
            ) : signups.length === 0 ? (
              <p style={{textAlign: 'center', color: '#9ca3af'}}>No signups yet</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Responsibility</th>
                    <th style={styles.th}>Area</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {signups.map((signup, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}>{signup.first_name}</td>
                      <td style={styles.td}>{signup.email}</td>
                      <td style={styles.td}>{signup.responsibility.substring(0, 50)}...</td>
                      <td style={styles.td}>{signup.area}</td>
                      <td style={styles.td}>{new Date(signup.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <nav style={styles.nav}>
        <div style={{...styles.container, ...styles.navContent}}>
          <div style={styles.logo}>✓ LifeOps</div>
          <button style={styles.button} onClick={() => setShowDashboard(true)}>View Signups</button>
        </div>
      </nav>

      <section style={styles.hero}>
        <div style={styles.container}>
          <h1 style={styles.heroTitle}>You don't have to carry everything anymore.</h1>
          <p style={styles.heroText}>LifeOps is being built to help busy people manage recurring responsibilities without adding more work, more reminders, or more screen time.</p>
          <div style={styles.heroCta}>
            <button style={styles.button} onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>Join the Early Beta</button>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Meet LifeOps.</h2>
          <div style={styles.grid}>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>📅</div>
              <h3 style={{fontWeight: 'bold', marginBottom: '12px'}}>Remember</h3>
              <p style={{color: '#374151', lineHeight: '1.6'}}>LifeOps keeps track of recurring responsibilities and knows when the next action is approaching.</p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>📝</div>
              <h3 style={{fontWeight: 'bold', marginBottom: '12px'}}>Prepare</h3>
              <p style={{color: '#374151', lineHeight: '1.6'}}>LifeOps gathers provider details and prepares the communication for review.</p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>✓</div>
              <h3 style={{fontWeight: 'bold', marginBottom: '12px'}}>Handle</h3>
              <p style={{color: '#374151', lineHeight: '1.6'}}>After you approve, LifeOps sends the request and tracks what happens next.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.formSection} id="waitlist">
        <div style={styles.container}>
          {!formSubmitted ? (
            <div style={styles.form}>
              <h2 style={{fontSize: '32px', fontWeight: 'bold', color: '#111', marginBottom: '16px', textAlign: 'center'}}>Join the LifeOps Early Beta</h2>
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
                  <textarea name="responsibility" placeholder="Scheduling appointments, prescription refills..." value={formData.responsibility} onChange={handleInputChange} style={{...styles.formInput, resize: 'vertical', height: '100px'}} required />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Which area would you want help with first?</label>
                  <select name="area" value={formData.area} onChange={handleInputChange} style={styles.formInput}>
                    <option value="healthcare-appointments">Healthcare appointments</option>
                    <option value="prescription-management">Prescription management</option>
                    <option value="family-responsibilities">Family responsibilities</option>
                  </select>
                </div>
                <div style={{...styles.formGroup, display: 'flex', gap: '12px'}}>
                  <input type="checkbox" name="consent" checked={formData.consent} onChange={handleInputChange} required />
                  <label style={{fontSize: '14px', color: '#374151'}}>I agree to receive LifeOps beta updates *</label>
                </div>
                <button type="submit" style={styles.formButton}>Join the Early Beta</button>
              </form>
            </div>
          ) : (
            <div style={styles.form}>
              <h2 style={{fontSize: '32px', fontWeight: 'bold', color: '#111', textAlign: 'center'}}>You're on the list. Thank you!</h2>
            </div>
          )}
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={{...styles.sectionTitle, marginBottom: '32px'}}>Frequently asked questions</h2>
          {faqItems.map((item, idx) => (
            <div key={idx} style={{...styles.card, marginBottom: '16px'}}>
              <div style={{padding: '16px', cursor: 'pointer', fontWeight: '600'}} onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}>
                {item.question} {expandedFaq === idx ? '▼' : '▶'}
              </div>
              {expandedFaq === idx && (
                <div style={{padding: '0 16px 16px 16px', color: '#4b5563', borderTop: '1px solid #e5e7eb', paddingTop: '16px'}}>
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.container}>
          <p style={{textAlign: 'center', fontSize: '14px'}}>© 2026 LifeOps. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
