import { useState } from 'react';
import axios from 'axios';
import './signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.type) {
      setStatus({ type: '', message: '' });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!name || !email || !password || !confirmPassword) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    if (name.length < 2) {
      setStatus({ type: 'error', message: 'Name must be at least 2 characters long.' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (password.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters long.' });
      return;
    }

    if (password !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post('http://localhost:3000/create', {
        name,
        email,
        role: 'Student',
        memberSince: new Date().toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
      });

      setStatus({ type: 'success', message: 'Account created successfully!' });
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Unable to create account right now.';
      setStatus({ type: 'error', message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="signup-page">
      <div className="signup-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
            />
          </label>

          {status.message && (
            <p className={`signup-status ${status.type}`}>{status.message}</p>
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Signup;