import React from 'react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import api from '../services/api.js';

export default function Profile(){ const [user,setUser]=useState(null); useEffect(()=>{api.get('/auth/me').then(r=>setUser(r.data.user))},[]); if(!user)return <div className="center-message">Loading...</div>; const bmi=(user.weight/((user.height/100)**2)).toFixed(1); return <Layout user={user}><div className="panel profile-panel"><h3>Profile</h3><p>Your basic fitness information.</p><div className="profile-grid"><Info label="Name" value={user.name}/><Info label="Email" value={user.email}/><Info label="Age" value={`${user.age} years`}/><Info label="Height" value={`${user.height} cm`}/><Info label="Weight" value={`${user.weight} kg`}/><Info label="BMI" value={bmi}/><Info label="Step goal" value={`${user.dailyStepGoal.toLocaleString()} / day`}/><Info label="Calorie goal" value={`${user.dailyCalorieGoal} kcal / day`}/></div></div></Layout> }
function Info({label,value}){return <div className="info-box"><span>{label}</span><strong>{value}</strong></div>}
