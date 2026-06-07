import React from 'react';
import { Link } from 'react-router-dom'; // keeping Link for now, but in SPA it might be better to pass setActiveTab
import { Package, CalendarCheck, Heart, TrendingUp, Clock, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './dashboard.css';
import img1 from '../../assets/images/restaurant_interior.png';

const RECENT_ORDERS = [
  { id: '#2451', name: 'Grilled Salmon + Pasta Bella', status: 'on-way', statusLabel: 'On the Way', time: '20 min ETA', price: '$34.00' },
  { id: '#2448', name: 'Truffle Burger + Fries', status: 'delivered', statusLabel: 'Delivered', time: 'Yesterday', price: '$18.50' },
  { id: '#2440', name: 'Vegan Bowl + Juice', status: 'delivered', statusLabel: 'Delivered', time: '3 days ago', price: '$15.00' },
];

const UPCOMING_BOOKINGS = [
  { id: 1, restaurant: 'The Golden Plate', date: 'Tue, 10 Jun', time: '7:00 PM', guests: 2, status: 'confirmed' },
  { id: 2, restaurant: 'Sushi Master', date: 'Fri, 13 Jun', time: '8:30 PM', guests: 4, status: 'pending' },
];

const DashboardHome = ({ setActiveTab }) => {
  const { user } = useAuth();

  return (
    <>
      <div className="page-header">
        <h1>Welcome back, {user?.name?.split(' ')[0] || 'Guest'}! 👋</h1>
        <p>Here's what's happening with your dining experience today.</p>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-card-icon"><Package size={22} /></div>
          <div className="stat-card-label">Total Orders</div>
          <div className="stat-card-value">24</div>
          <div className="stat-card-change up"><TrendingUp size={14} /> +3 this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon"><CalendarCheck size={22} /></div>
          <div className="stat-card-label">Upcoming Bookings</div>
          <div className="stat-card-value">2</div>
          <div className="stat-card-change neutral"><Clock size={14} /> Next: Tue 7PM</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon"><Heart size={22} /></div>
          <div className="stat-card-label">Favorites</div>
          <div className="stat-card-value">8</div>
          <div className="stat-card-change neutral"><Star size={14} /> Saved restaurants</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon"><Star size={22} /></div>
          <div className="stat-card-label">Avg. Rating Given</div>
          <div className="stat-card-value">4.6</div>
          <div className="stat-card-change up"><TrendingUp size={14} /> 12 reviews</div>
        </div>
      </div>

      <div className="dash-grid-2">
        {/* Recent Orders */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <h3>Recent Orders</h3>
            <button className="link-btn" onClick={() => setActiveTab('orders')}>View All</button>
          </div>
          {RECENT_ORDERS.map(order => (
            <div key={order.id} className="list-row">
              <div className="list-row-left">
                <div className="list-row-img" style={{ background: '#222', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Package size={20} color="rgba(255,255,255,0.5)" />
                </div>
                <div>
                  <div className="list-row-title">{order.name}</div>
                  <div className="list-row-sub">{order.id} · {order.time}</div>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'0.4rem' }}>
                <span className={`status-badge status-${order.status}`}>{order.statusLabel}</span>
                <span style={{ color: 'var(--dash-accent, #C6F135)', fontWeight: 600 }}>{order.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Bookings */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <h3>Upcoming Bookings</h3>
            <button className="link-btn" onClick={() => setActiveTab('bookings')}>View All</button>
          </div>
          {UPCOMING_BOOKINGS.map(b => (
            <div key={b.id} className="list-row">
              <div>
                <div className="list-row-title">{b.restaurant}</div>
                <div className="list-row-sub">{b.date} · {b.time} · {b.guests} guests</div>
              </div>
              <span className={`status-badge status-${b.status}`}>{b.status}</span>
            </div>
          ))}
          <button className="dash-btn-primary" style={{ width:'100%', marginTop:'1.5rem' }} onClick={() => setActiveTab('book-table')}>
            + New Booking
          </button>
        </div>
      </div>

      {/* Favorite Restaurants */}
      <div className="dash-panel">
        <div className="dash-panel-header">
          <h3>Favorite Restaurants</h3>
          <button className="link-btn" onClick={() => setActiveTab('favorites')}>View All</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {['The Golden Plate', 'Pasta Bella', 'Sushi Master'].map((r, i) => (
            <div key={i} className="fav-card" style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', cursor:'pointer' }}>
              <img src={img1} alt={r} style={{ width:'100%', height:'110px', objectFit:'cover' }} />
              <div style={{ padding: '0.75rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize:'0.9rem' }}>{r}</div>
                <div style={{ color: 'var(--dash-accent, #C6F135)', fontSize:'0.8rem', marginTop:'0.25rem' }}>★ 4.8 · Fine Dining</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
