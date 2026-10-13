import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Layout from '../components/Layout.jsx';
import api from '../services/api.js';

export default function Dashboard() {
  const [data, setData] = useState(null); const [error, setError] = useState('');
  useEffect(() => { api.get('/workouts/dashboard').then(r=>setData(r.data)).catch(e=>setError(e.response?.data?.message || 'Unable to load dashboard')); }, []);
  if (error) return <div className="center-message">{error}</div>;
  if (!data) return <div className="center-message">Loading dashboard...</div>;
  const u = data.user; const t = data.totals;
  const chart = [...data.recentWorkouts].reverse().map(w => ({ date: new Date(w.date).toLocaleDateString(undefined,{month:'short',day:'numeric'}), calories:w.calories, duration:w.duration }));
  return <Layout user={u}><section className="welcome-row"><div><h2>Hello, {u.name.split(' ')[0]} 👋</h2><p>Here is your activity for today.</p></div><Link to="/workout" className="primary small">+ Add workout</Link></section>
    <div className="stats-grid">
      <Stat icon="👟" label="Steps" value={t.steps.toLocaleString()} goal={u.dailyStepGoal}/>
      <Stat icon="🔥" label="Calories" value={`${t.calories} kcal`} goal={u.dailyCalorieGoal} />
      <Stat icon="⏱️" label="Workout time" value={`${t.duration} min`} />
      <Stat icon="⚖️" label="BMI" value={data.bmi} />
    </div>
    <div className="content-grid"><div className="panel"><div className="panel-head"><div><h3>Recent activity</h3><p>Calories burned by workout</p></div></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><BarChart data={chart}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="date"/><YAxis/><Tooltip/><Bar dataKey="calories" name="Calories" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer></div></div><div className="panel"><h3>Today's summary</h3><div className="summary-list"><div><span>Distance</span><strong>{t.distance.toFixed(1)} km</strong></div><div><span>Calories goal</span><strong>{Math.min(100, Math.round((t.calories/u.dailyCalorieGoal)*100))}%</strong></div><div><span>Steps goal</span><strong>{Math.min(100, Math.round((t.steps/u.dailyStepGoal)*100))}%</strong></div><div><span>Weight</span><strong>{u.weight} kg</strong></div></div></div></div>
  </Layout>;
}
function Stat({icon,label,value,goal}) { const pct=goal?Math.min(100,Math.round((Number(String(value).replace(/[^0-9.]/g,''))/goal)*100)):null; return <div className="stat-card"><div className="stat-icon">{icon}</div><div><span>{label}</span><h3>{value}</h3>{goal&&<div className="progress"><i style={{width:`${pct}%`}}/></div>}</div></div> }
