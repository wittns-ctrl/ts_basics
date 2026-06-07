import React, { useState } from 'react';
import { MapPin, Tag, Clock, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ordersApi, promosApi } from '../../services/api';
import './dashboard.css';

const TIME_SLOTS = ['ASAP (25-35 min)', '12:00 PM', '12:30 PM', '1:00 PM', '7:00 PM', '7:30 PM', '8:00 PM'];

const CheckoutPage = ({ setActiveTab }) => {
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [placed, setPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [address, setAddress] = useState({ street: '', apartment: '', city: '', postalCode: '', instructions: '' });
  const { cartItems, subtotal, clearCart, selectedRestaurantId } = useCart();
  const { user } = useAuth();

  const delivery = cartItems.length > 0 ? 3.99 : 0;
  const discount = promoApplied ? 5 : 0;
  const total = subtotal + delivery - discount;

  const applyPromo = async () => {
    try {
      const res = await promosApi.validate(promo);
      if (res.valid) setPromoApplied(true);
    } catch {
      if (promo.toUpperCase() === 'SUPA10') setPromoApplied(true);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user?.id || !selectedRestaurantId) return;
    try {
      const order = await ordersApi.create({
        customerId: user.id,
        restaurantId: selectedRestaurantId,
        items: cartItems.map(i => ({ menuItemId: i.id, qty: i.qty })),
        deliveryAddress: address,
        timeSlot,
        promoCode: promoApplied ? promo : undefined,
      });
      setPlacedOrderId(order.orderId || order.id?.slice(-4));
      setPlaced(true);
      clearCart();
    } catch (err) {
      alert(err.message || 'Failed to place order');
    }
  };

  if (placed) {
    return (
      <>
        <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <CheckCircle size={80} color="var(--dash-accent, #C6F135)" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ color: 'var(--dash-text, #fff)', fontSize: '2rem', marginBottom: '0.75rem' }}>Order Placed!</h2>
          <p style={{ color: 'var(--dash-muted, #8a8a8a)', maxWidth: 400, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Your order <strong style={{ color: 'var(--dash-accent, #C6F135)' }}>#{placedOrderId}</strong> has been confirmed. Estimated delivery: 25–35 minutes.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="dash-btn-primary" onClick={() => setActiveTab('order-tracking')}>Track Order</button>
            <button className="dash-btn-outline" onClick={() => setActiveTab('overview')}>Back to Dashboard</button>
          </div>
        </div>
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <div className="page-header">
          <h1>Checkout</h1>
          <p>Complete your order details below.</p>
        </div>
        <div className="dash-panel empty-state">
          <p>Your cart is empty. Add items before checking out.</p>
          <button className="dash-btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setActiveTab('menu')}>Browse Menu</button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page-header">
        <h1>Checkout</h1>
        <p>Enter your delivery address, promo code, and preferred delivery time.</p>
      </div>

      <div className="dash-grid-sidebar">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="dash-panel" style={{ marginBottom: 0 }}>
            <h3 style={{ color: 'var(--dash-text, #fff)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <MapPin size={20} color="var(--dash-accent, #C6F135)" /> Delivery Address
            </h3>
            <div className="form-row">
              <div className="dash-form-group">
                <label>Street Address</label>
                <input className="dash-input" placeholder="123 Main Street" value={address.street} onChange={e => setAddress(p => ({ ...p, street: e.target.value }))} />
              </div>
              <div className="dash-form-group">
                <label>Apartment / Suite</label>
                <input className="dash-input" placeholder="Apt 4B (optional)" value={address.apartment} onChange={e => setAddress(p => ({ ...p, apartment: e.target.value }))} />
              </div>
            </div>
            <div className="form-row">
              <div className="dash-form-group">
                <label>City</label>
                <input className="dash-input" placeholder="Your City" value={address.city} onChange={e => setAddress(p => ({ ...p, city: e.target.value }))} />
              </div>
              <div className="dash-form-group">
                <label>Postal Code</label>
                <input className="dash-input" placeholder="12345" value={address.postalCode} onChange={e => setAddress(p => ({ ...p, postalCode: e.target.value }))} />
              </div>
            </div>
            <div className="dash-form-group" style={{ marginBottom: 0 }}>
              <label>Delivery Instructions (Optional)</label>
              <input className="dash-input" placeholder="Leave at door, ring bell, etc." value={address.instructions} onChange={e => setAddress(p => ({ ...p, instructions: e.target.value }))} />
            </div>
          </div>

          <div className="dash-panel" style={{ marginBottom: 0 }}>
            <h3 style={{ color: 'var(--dash-text, #fff)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Clock size={20} color="var(--dash-accent, #C6F135)" /> Delivery Time
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {TIME_SLOTS.map(slot => (
                <button key={slot} onClick={() => setTimeSlot(slot)} className={`category-pill ${timeSlot === slot ? 'active' : ''}`}>
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="dash-panel" style={{ marginBottom: 0 }}>
            <h3 style={{ color: 'var(--dash-text, #fff)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Tag size={20} color="var(--dash-accent, #C6F135)" /> Promo Code
            </h3>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input className="dash-input" placeholder="Enter promo code (try SUPA10)" value={promo} onChange={e => setPromo(e.target.value)} disabled={promoApplied} style={{ flex: 1 }} />
              {promoApplied ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4caf80', fontWeight: 600 }}><CheckCircle size={18} /> Applied!</div>
              ) : (
                <button className="dash-btn-outline" style={{ padding: '0 1.5rem', whiteSpace: 'nowrap' }} onClick={applyPromo}>Apply</button>
              )}
            </div>
            {promoApplied && <p style={{ color: '#4caf80', fontSize: '0.82rem', marginTop: '0.5rem' }}>$5.00 discount applied!</p>}
          </div>
        </div>

        <div>
          <div className="dash-panel" style={{ position: 'sticky', top: 88 }}>
            <h3 style={{ color: 'var(--dash-text, #fff)', marginBottom: '1.25rem' }}>Order Summary</h3>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem', color: 'var(--dash-muted, #8a8a8a)', fontSize: '0.88rem' }}>
                <span>{item.emoji} {item.name} ×{item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '1rem 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--dash-muted, #8a8a8a)', fontSize: '0.88rem' }}>
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--dash-muted, #8a8a8a)', fontSize: '0.88rem' }}>
                <span>Delivery Fee</span><span>${delivery.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4caf80', fontSize: '0.88rem' }}>
                  <span>Promo Discount</span><span>-$5.00</span>
                </div>
              )}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--dash-text, #fff)', fontWeight: 700, fontSize: '1.1rem' }}>
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="dash-btn-primary" style={{ width: '100%', fontSize: '0.95rem' }} onClick={handlePlaceOrder}>
              Place Order • ${total.toFixed(2)}
            </button>
            <p style={{ color: 'var(--dash-muted, #8a8a8a)', fontSize: '0.75rem', textAlign: 'center', marginTop: '0.75rem' }}>
              Secure payment processed safely
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
