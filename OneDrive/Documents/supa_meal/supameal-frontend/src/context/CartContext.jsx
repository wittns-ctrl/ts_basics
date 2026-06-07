import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { menusApi } from '../services/api';

const CartContext = createContext(null);

export const MENU_ITEMS = [];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [loadingMenu, setLoadingMenu] = useState(false);

  const loadMenu = useCallback(async (restaurantId) => {
    if (!restaurantId) return;
    setLoadingMenu(true);
    try {
      const items = await menusApi.list(restaurantId);
      setMenuItems(items);
      setSelectedRestaurantId(restaurantId);
    } catch (err) {
      console.error('Failed to load menu:', err);
    } finally {
      setLoadingMenu(false);
    }
  }, []);

  useEffect(() => {
    const savedRestaurant = localStorage.getItem('selectedRestaurantId');
    if (savedRestaurant) loadMenu(savedRestaurant);
  }, [loadMenu]);

  const selectRestaurant = useCallback((restaurantId) => {
    localStorage.setItem('selectedRestaurantId', restaurantId);
    setCart({});
    loadMenu(restaurantId);
  }, [loadMenu]);

  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const updated = { ...prev };
      if (updated[id] > 1) updated[id]--;
      else delete updated[id];
      return updated;
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => {
      const updated = { ...prev };
      const next = (updated[id] || 0) + delta;
      if (next <= 0) delete updated[id];
      else updated[id] = next;
      return updated;
    });
  };

  const clearCart = () => setCart({});

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const item = menuItems.find(m => m.id === id || m.id === String(id));
    return item ? { ...item, qty } : null;
  }).filter(Boolean);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      cart, cartItems, cartCount, subtotal, menuItems, loadingMenu,
      selectedRestaurantId, selectRestaurant, loadMenu,
      addToCart, removeFromCart, updateQty, clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
