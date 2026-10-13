import React from 'react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import api from '../services/api.js';

export default function Workout() {
  const [user, setUser] = useState(null); const [workouts, setWorkouts] = useState([]); const [message,setMessage]=useState('');
  const [form,setForm]=useState({type:'Running',duration:'30',calories:'250',steps:'3000',distance:'2.5'});
  const load=()=>Promise.all([api.get('/auth/me'),api.get('/workouts')]).then(([u,w])=>{setUser(u.data.user);setWorkouts(w.data.workouts)});
  useEffect(()=>{load()},[]);
  const submit=async e=>{e.preventDefault();setMessage('');try{await api.post('/workouts',{...form,duration:+form.duration,calories:+form.calories,steps:+form.steps,distance:+form.distance});setMessage('Workout added successfully');await load();}catch(err){setMessage(err.response?.data?.message||'Could not save workout')} };
  return <Layout user={user}><div className="content-grid"><div className="panel"><h3>Add workout</h3><p>Record today's exercise.</p>{message&&<div className="notice">{message}</div>}<form className="workout-form" onSubmit={submit}><label>Workout type<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Running</option><option>Walking</option><option>Cycling</option><option>Gym</option><option>Swimming</option><option>Other</option></select></label><div className="form-row"><label>Duration (min)<input type="number" min="1" required value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})}/></label><label>Calories<input type="number" min="0" required value={form.calories} onChange={e=>setForm({...form,calories:e.target.value})}/></label></div><div className="form-row"><label>Steps<input type="number" min="0" value={form.steps} onChange={e=>setForm({...form,steps:e.target.value})}/></label><label>Distance (km)<input type="number" min="0" step="0.1" value={form.distance} onChange={e=>setForm({...form,distance:e.target.value})}/></label></div><button className="primary" type="submit">Save workout</button></form></div><div className="panel"><h3>Workout history</h3><div className="history">{workouts.length===0?<p>No workouts yet.</p>:workouts.map(w=><div className="history-item" key={w._id}><div><strong>{w.type}</strong><span>{new Date(w.date).toLocaleString()}</span></div><div><b>{w.calories} kcal</b><span>{w.duration} min</span></div></div>)}</div></div></div></Layout>;
}
