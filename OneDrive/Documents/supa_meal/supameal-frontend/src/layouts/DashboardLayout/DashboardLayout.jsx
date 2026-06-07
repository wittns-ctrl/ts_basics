import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu, X, Moon, RefreshCw, Globe, Bell, ChevronRight,
  LogOut, Home, Search, ChevronDown, User, CheckCircle, Package, Truck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo/Logo';
import './DashboardLayout.css';

const MOCK_NOTIFICATIONS = [
  { id: 1, text: '56 new users registered today', time: 'Just now', unread: true, icon: User },
  { id: 2, text: '132 orders placed this week', time: '10 min ago', unread: true, icon: Package },
  { id: 3, text: 'Your order #2451 is on its way!', time: '25 min ago', unread: true, icon: Truck },
  { id: 4, text: 'Table booking confirmed for 7 PM', time: '1 hour ago', unread: false, icon: CheckCircle },
];

const MOCK_ACTIVITIES = [
  { id: 1, user: 'Alex J.', action: 'Placed order #2452', time: '5 min ago', avatar: 'A' },
  { id: 2, user: 'System', action: 'Booking confirmed at The Golden Plate', time: '1 hour ago', avatar: 'S' },
  { id: 3, user: 'Alex J.', action: 'Added Pasta Bella to favorites', time: '2 hours ago', avatar: 'A' },
  { id: 4, user: 'Alex J.', action: 'Updated delivery address', time: 'Yesterday', avatar: 'A' },
];

const SidebarItem = ({ item, activeTab, setActiveTab, setSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon;

  const isActive = activeTab === item.id || (item.subItems && item.subItems.some(sub => sub.id === activeTab));

  const handleClick = () => {
    if (item.subItems) {
      setIsOpen(!isOpen);
    } else {
      setActiveTab(item.id);
      setSidebarOpen(false);
    }
  };

  return (
    <div className="sidebar-item-container">
      <button 
        className={`sidebar-nav-item ${isActive && !item.subItems ? 'active' : ''}`}
        onClick={handleClick}
      >
        <div className="nav-item-left">
          <Icon size={20} />
          <span>{item.label}</span>
          {item.badge && <span className="nav-badge">{item.badge}</span>}
        </div>
        {item.subItems && (
          <ChevronDown size={16} className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
        )}
      </button>

      {item.subItems && isOpen && (
        <div className="sidebar-subitems">
          {item.subItems.map(sub => (
            <button
              key={sub.id}
              className={`sidebar-subitem ${activeTab === sub.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(sub.id);
                setSidebarOpen(false);
              }}
            >
              {sub.label}
              {sub.badge && <span className="nav-badge">{sub.badge}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardLayout = ({ children, activeTab, setActiveTab, sidebarConfig, roleName }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Find current breadcrumb
  let currentBreadcrumb = 'Overview';
  sidebarConfig.forEach(item => {
    if (item.id === activeTab) currentBreadcrumb = item.label;
    if (item.subItems) {
      item.subItems.forEach(sub => {
        if (sub.id === activeTab) currentBreadcrumb = `${item.label} / ${sub.label}`;
      });
    }
  });

  return (
    <div className="dashboard-shell">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* LEFT SIDEBAR */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        
        <div className="sidebar-brand-top">
          <Logo />
        </div>

        <div className="sidebar-user">
          <div className="user-avatar-sm">
            {user?.name?.charAt(0) ?? 'U'}
          </div>
          <div className="user-info-sm">
            <span className="user-name-sm">{user?.name || 'User'}</span>
            <span className="user-role-sm">{roleName}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-group-label">MAIN MENU</p>
          {sidebarConfig.map(item => (
            <SidebarItem 
              key={item.id} 
              item={item} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              setSidebarOpen={setSidebarOpen} 
            />
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-nav-item home-link" onClick={() => navigate('/')}>
            <Home size={20} />
            <span>Back to Home</span>
          </button>
          <button className="sidebar-nav-item logout-link-prominent" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <nav className="topbar-breadcrumb" aria-label="Breadcrumb">
              <span className="breadcrumb-item">Dashboard</span>
              <ChevronRight size={14} className="breadcrumb-sep" />
              <span className="breadcrumb-current">{currentBreadcrumb}</span>
            </nav>
          </div>

          <div className="topbar-right">
            <div className="topbar-search">
              <Search size={16} />
              <input type="text" placeholder="Search..." />
            </div>
            <button className="topbar-icon-btn" aria-label="Toggle theme">
              <Moon size={18} />
            </button>
            <button className="topbar-icon-btn notif-btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="notif-dot" />
            </button>
            <div className="topbar-user" onClick={() => setActiveTab(sidebarConfig.some(i => i.id === 'profile') ? 'profile' : 'overview')}>
              <div className="user-avatar-sm">
                {user?.name?.charAt(0) ?? 'U'}
              </div>
              <span>{user?.name || 'User'}</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {children}
        </div>
      </div>

      {/* RIGHT SIDEBAR (Notifications / Activities) */}
      <aside className="dashboard-right-sidebar">
        <div className="right-sidebar-section">
          <h4>Notifications</h4>
          {MOCK_NOTIFICATIONS.map(n => {
            const Icon = n.icon;
            return (
              <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                <div className="notif-icon-circle"><Icon size={16} /></div>
                <div className="notif-body">
                  <p>{n.text}</p>
                  <span>{n.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="right-sidebar-section">
          <h4>Activities</h4>
          <div className="activities-list">
            {MOCK_ACTIVITIES.map(a => (
              <div key={a.id} className="activity-item">
                <div className="activity-avatar">{a.avatar}</div>
                <div className="activity-body">
                  <p><strong>{a.user}</strong> {a.action}</p>
                  <span>{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DashboardLayout;
