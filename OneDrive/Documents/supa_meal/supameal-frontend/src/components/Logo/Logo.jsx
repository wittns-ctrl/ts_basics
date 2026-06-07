import React from 'react';
import logoImg from '../../assets/images/logo.png';
import './Logo.css';

const Logo = ({ className = '' }) => {
  return (
    <div className={`logo-container ${className}`}>
      <span className="logo-text">Supa<span className="text-primary">Meal</span></span>
      <img src={logoImg} alt="SupaMeal Logo" className="logo-icon" />
    </div>
  );
};

export default Logo;
