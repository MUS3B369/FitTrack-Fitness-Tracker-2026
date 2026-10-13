import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api.js';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const submit = async (e) => { e.preventDefault(); setError(''); try { const { data } = await api.post('/auth/login', form); localStorage.setItem('fittrack_token', data.token); navigate('/'); } catch (err) { setError(err.response?.data?.message || 'Login failed'); } };
  return <div className="auth-page"><form className="auth-card" onSubmit={submit}><div className="brand big">Fit<span>Track</span></div><h2>Welcome back</h2><p>Track workouts, steps and progress in one place.</p>{error && <div className="error">{error}</div>}<label>Email<input type="email" required value={form.email} onChange={e => setForm({...form,email:e.target.value})}/></label><label>Password<input type="password" required value={form.password} onChange={e => setForm({...form,password:e.target.value})}/></label><button className="primary" type="submit">Login</button><p className="switch">Don't have an account? <Link to="/register">Create one</Link></p></form></div>;
}
