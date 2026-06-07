import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, MapPin, Package, Truck, Home } from 'lucide-react';
import { ordersApi } from '../../services/api';
import './dashboard.css';
import './OrderTracking.css';

const ICON_MAP = { placed: Package, confirmed: CheckCircle, preparing: Clock, 'on-way': Truck, delivered: Home };

const OrderTracking = ({ orderId, setActiveTab }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!orderId) return;
      try {
        const data = await ordersApi.tracking(orderId);
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) return <div className="page-header"><p>Loading order tracking...</p></div>;
  if (!order) return <div className="page-header"><p>Order not found</p></div>;

  const steps = order.timeline?.length ? order.timeline : [
    { key: 'placed', label: 'Order Placed', done: true, time: '—' },
    { key: 'preparing', label: 'Preparing', done: false },
    { key: 'on-way', label: 'Out for Delivery', done: false },
    { key: 'delivered', label: 'Delivered', done: false },
  ];

  const activeIndex = steps.findIndex(s => !s.done) - 1;

  return (
    <>
      <div className="page-header">
        <h1>Order Tracking</h1>
        <p>Live status timeline, ETA, and delivery updates for order #{order.orderId || orderId?.slice(-4)}.</p>
      </div>

      <div className="dash-grid-sidebar">
        <div className="dash-panel" style={{ marginBottom: 0 }}>
          <div className="dash-panel-header">
            <h3>Status Timeline</h3>
            <span style={{ color: 'var(--dash-accent, #C6F135)', fontWeight: 600, fontSize: '0.88rem' }}>ETA: {order.eta}</span>
          </div>

          <div className="tracking-timeline">
            {steps.map((step, i) => {
              const Icon = ICON_MAP[step.key] || Package;
              const isActive = i === activeIndex + 1 || (activeIndex === -1 && i === steps.length - 1 && step.done);
              return (
                <div key={step.key} className={`tracking-step ${step.done ? 'done' : ''} ${isActive ? 'active' : ''}`}>
                  <div className="tracking-step-line">
                    <div className={`tracking-dot ${isActive ? 'pulse' : ''}`}>
                      {step.done && !isActive && <CheckCircle size={16} color="#000" />}
                      {isActive && <Truck size={16} color="#000" />}
                    </div>
                    {i < steps.length - 1 && <div className="tracking-connector" />}
                  </div>
                  <div className="tracking-step-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div className="tracking-step-label">{step.label}</div>
                      </div>
                      <span className="tracking-time">{step.time || ''}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="dash-panel" style={{ marginBottom: 0 }}>
            <h3 style={{ marginBottom: '1rem' }}>Delivery Updates</h3>
            {(order.updates || []).map((u, i) => (
              <div key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--dash-muted)' }}>{u.time}</div>
                <div style={{ fontSize: '0.88rem' }}>{u.message}</div>
              </div>
            ))}
          </div>

          <div className="dash-panel" style={{ marginBottom: 0 }}>
            <h3 style={{ marginBottom: '1rem' }}>Order Details</h3>
            <p style={{ color: 'var(--dash-muted)', fontSize: '0.88rem', marginBottom: '0.5rem' }}><strong>Restaurant:</strong> {order.restaurant}</p>
            <p style={{ color: 'var(--dash-muted)', fontSize: '0.88rem', marginBottom: '0.5rem' }}><strong>Items:</strong> {order.itemsSummary}</p>
            <p style={{ color: 'var(--dash-muted)', fontSize: '0.88rem', marginBottom: '0.5rem' }}><strong>Rider:</strong> {order.rider}</p>
            {order.deliveryAddress && (
              <p style={{ color: 'var(--dash-muted)', fontSize: '0.88rem', display: 'flex', gap: '0.35rem' }}>
                <MapPin size={14} /> {order.deliveryAddress.street}, {order.deliveryAddress.city}
              </p>
            )}
          </div>

          <button className="dash-btn-outline" onClick={() => setActiveTab('orders')}>Back to Orders</button>
        </div>
      </div>
    </>
  );
};

export default OrderTracking;
