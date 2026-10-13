import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Layout({ children, user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => { localStorage.removeItem('fittrack_token'); navigate('/login'); };
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand">Fit<span>Track</span></div>
      <nav>
        <Link className={location.pathname === '/' ? 'active' : ''} to="/">Dashboard</Link>
        <Link className={location.pathname === '/workout' ? 'active' : ''} to="/workout">Workouts</Link>
        <Link className={location.pathname === '/profile' ? 'active' : ''} to="/profile">Profile</Link>
      </nav>
      <button className="logout" onClick={logout}>Log out</button>
    </aside>
    <main className="main-content">
      <header className="topbar"><div><p className="eyebrow">FITNESS TRACKER</p><h1>{location.pathname === '/' ? 'Your Dashboard' : location.pathname.slice(1).replace(/\b\w/g, c => c.toUpperCase())}</h1></div><div className="user-chip">{user?.name?.[0]?.toUpperCase()} <span>{user?.name}</span></div></header>
      {children}
    </main>
  </div>;
}
