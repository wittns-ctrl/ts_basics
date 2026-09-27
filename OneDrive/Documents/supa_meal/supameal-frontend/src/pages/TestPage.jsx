import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationsContext';
import { useCart } from '../context/CartContext';
import { Sun, Moon, Bell, ShoppingCart, Plus, Trash2, Check } from 'lucide-react';

export default function TestPage() {
  const { user, login, logout, isAuthenticated, loading } = useAuth();
  const { showToast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount, addNotification, markAllRead, clearAll, markRead, remove } = useNotifications();
  const { cart, cartCount, subtotal, addToCart, clearCart, menuItems } = useCart();

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      padding: 24,
      background: theme === 'dark' ? '#0f172a' : '#f9fafb',
      color: theme === 'dark' ? '#e2e8f0' : '#0f172a',
      transition: 'background 200ms ease, color 200ms ease',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 28,
          padding: '16px 20px',
          borderRadius: 14,
          background: theme === 'dark' ? '#1e293b' : '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>🧪 Context Test Page</h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.7 }}>
              Verify all providers and hooks are wired correctly.
            </p>
          </div>
          <button
            onClick={toggleTheme}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 14px',
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 13,
              background: theme === 'dark' ? '#334155' : '#f1f5f9',
              color: theme === 'dark' ? '#e2e8f0' : '#0f172a',
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            Theme: <span style={{ textTransform: 'capitalize' }}>{theme}</span>
          </button>
        </header>

        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <Card title="🍞 ToastContext" theme={theme}>
            <p style={{ margin: '0 0 12px', fontSize: 14, opacity: 0.85 }}>
              Trigger each toast type. They should auto-dismiss in ~4s.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Btn onClick={() => showToast('Here is some useful info', 'info')} color="#2563eb">Info</Btn>
              <Btn onClick={() => showToast('Action completed successfully!', 'success')} color="#16a34a">Success</Btn>
              <Btn onClick={() => showToast('Something went wrong. Please try again.', 'error')} color="#dc2626">Error</Btn>
              <Btn onClick={() => showToast('Heads up — this action is reversible', 'warning')} color="#d97706">Warning</Btn>
            </div>
          </Card>

          <Card title="🎨 ThemeContext" theme={theme}>
            <p style={{ margin: '0 0 12px', fontSize: 14, opacity: 0.85 }}>
              Current theme: <b style={{ textTransform: 'capitalize' }}>{theme}</b>. Toggle should flip <code style={{ fontSize: 12 }}>data-theme</code> on html.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn onClick={toggleTheme} color="#7c3aed">Toggle</Btn>
              <div style={{
                alignSelf: 'center', fontSize: 12, opacity: 0.7,
                padding: '6px 10px', borderRadius: 8,
                background: theme === 'dark' ? '#334155' : '#f1f5f9',
              }}>
                html[data-theme="{theme}"]
              </div>
            </div>
          </Card>

          <Card title={`🔔 Notifications (${unreadCount} unread)`} theme={theme}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              <Btn onClick={() => addNotification({ title: 'Order update', message: `Your order #${Math.floor(Math.random() * 9000) + 1000} is being prepared.` })} color="#db2777">
                <Plus size={14} /> Add
              </Btn>
              <Btn onClick={markAllRead} color="#0ea5e9" variant="ghost" theme={theme}>
                <Check size={14} /> Mark all read
              </Btn>
              <Btn onClick={clearAll} color="#64748b" variant="ghost" theme={theme}>
                <Trash2 size={14} /> Clear
              </Btn>
            </div>
            <div style={{
              maxHeight: 180,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}>
              {notifications.length === 0 && (
                <div style={{ padding: 16, textAlign: 'center', fontSize: 13, opacity: 0.6 }}>
                  <Bell size={20} style={{ marginBottom: 4 }} /><br />
                  No notifications yet.
                </div>
              )}
              {notifications.map((n) => (
                <div key={n.id} style={{
                  padding: 10,
                  borderRadius: 10,
                  background: theme === 'dark' ? '#334155' : '#f8fafc',
                  border: n.read ? 'none' : '1px solid #f59e0b',
                  display: 'flex',
                  gap: 8,
                  alignItems: 'flex-start',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{n.title}</div>
                    <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>{n.message}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                    {!n.read && <MiniBtn onClick={() => markRead(n.id)} theme={theme} title="Mark read"><Check size={12} /></MiniBtn>}
                    <MiniBtn onClick={() => remove(n.id)} theme={theme} title="Remove"><Trash2 size={12} /></MiniBtn>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title={`🛒 CartContext (${cartCount} items)`} theme={theme}>
            <p style={{ margin: '0 0 12px', fontSize: 14, opacity: 0.85 }}>
              Menu loaded: <b>{menuItems.length}</b> items. Subtotal: <b>${subtotal.toFixed(2)}</b>.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              <Btn onClick={() => {
                const fakeId = `demo_${Math.floor(Math.random() * 1000)}`;
                addToCart(fakeId);
                showToast(`Added item ${fakeId} to cart`, 'info');
              }} color="#f97316">
                <ShoppingCart size={14} /> Add demo item
              </Btn>
              <Btn onClick={clearCart} color="#64748b" variant="ghost" theme={theme}>Clear cart</Btn>
            </div>
            <pre style={{
              margin: 0,
              background: theme === 'dark' ? '#0f172a' : '#f1f5f9',
              padding: 10,
              borderRadius: 10,
              fontSize: 12,
              overflowX: 'auto',
            }}>{JSON.stringify(cart, null, 2)}</pre>
          </Card>

          <Card title="🔐 AuthContext" theme={theme}>
            <div style={{ fontSize: 14, marginBottom: 12 }}>
              <div>Loading: <b>{loading ? 'true' : 'false'}</b></div>
              <div>Authenticated: <b>{isAuthenticated ? 'true' : 'false'}</b></div>
              <div style={{ marginTop: 8 }}>
                User:
                <pre style={{
                  margin: '6px 0 0',
                  background: theme === 'dark' ? '#0f172a' : '#f1f5f9',
                  padding: 10,
                  borderRadius: 10,
                  fontSize: 12,
                  overflowX: 'auto',
                }}>{JSON.stringify(user, null, 2)}</pre>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Btn onClick={() => login(null, null, 'customer').then(() => showToast('Entered as demo customer', 'success')).catch((e) => showToast(`Login failed: ${e?.message || e}`, 'error'))} color="#16a34a">Demo Login (customer)</Btn>
              <Btn onClick={() => logout().then(() => showToast('Logged out', 'info'))} color="#dc2626" variant="ghost" theme={theme}>Logout</Btn>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children, theme }) {
  return (
    <section style={{
      background: theme === 'dark' ? '#1e293b' : '#fff',
      padding: 20,
      borderRadius: 14,
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      <h2 style={{ margin: '0 0 14px', fontSize: 16, fontWeight: 800 }}>{title}</h2>
      {children}
    </section>
  );
}

function Btn({ children, onClick, color, variant = 'solid', theme }) {
  const isSolid = variant === 'solid';
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '9px 14px',
        borderRadius: 10,
        border: 'none',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        background: isSolid ? color : (theme === 'dark' ? '#334155' : '#f1f5f9'),
        color: isSolid ? '#fff' : color,
        boxShadow: isSolid ? `0 4px 12px ${color}33` : 'none',
      }}
    >
      {children}
    </button>
  );
}

function MiniBtn({ children, onClick, theme, title }) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        width: 24, height: 24, borderRadius: 6, border: 'none',
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: theme === 'dark' ? '#475569' : '#e2e8f0',
        color: theme === 'dark' ? '#e2e8f0' : '#334155',
      }}
    >
      {children}
    </button>
  );
}
