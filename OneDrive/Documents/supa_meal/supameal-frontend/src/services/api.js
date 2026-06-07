import { apiRequest } from '../api/client';

// Auth
export const authApi = {
  signup: (data) => apiRequest('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  verifyOtp: (data) => apiRequest('/auth/verifyOtp', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => apiRequest('/auth/Login', { method: 'POST', body: JSON.stringify(data) }),
  forgot: (data) => apiRequest('/auth/forgot', { method: 'POST', body: JSON.stringify(data) }),
  reset: (data) => apiRequest('/auth/reset', { method: 'POST', body: JSON.stringify(data) }),
  logout: (data) => apiRequest('/auth/logout', { method: 'POST', body: JSON.stringify(data) }),
};

// Restaurants
export const restaurantsApi = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return apiRequest(`/restaurants${q ? `?${q}` : ''}`);
  },
  get: (id) => apiRequest(`/restaurants/${id}`),
  register: (data) => apiRequest('/restaurants/register', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/restaurants/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  byOwner: (ownerId) => apiRequest(`/restaurants/owner/${ownerId}`),
  approve: (id, approved) => apiRequest(`/restaurants/${id}/approve`, { method: 'PATCH', body: JSON.stringify({ approved }) }),
  setStatus: (id, status) => apiRequest(`/restaurants/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  addImages: (id, images) => apiRequest(`/restaurants/${id}/images`, { method: 'POST', body: JSON.stringify({ images }) }),
  removeImage: (id, imageUrl) => apiRequest(`/restaurants/${id}/images`, { method: 'DELETE', body: JSON.stringify({ imageUrl }) }),
  analyticsOverview: (id) => apiRequest(`/restaurants/${id}/analytics/overview`),
  analyticsRevenue: (id, period) => apiRequest(`/restaurants/${id}/analytics/revenue?period=${period || 'week'}`),
  analyticsPeakHours: (id) => apiRequest(`/restaurants/${id}/analytics/peak-hours`),
};

// Menus
export const menusApi = {
  list: (restaurantId) => apiRequest(`/menus${restaurantId ? `?restaurantId=${restaurantId}` : ''}`),
  create: (data) => apiRequest('/menus', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/menus/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/menus/${id}`, { method: 'DELETE' }),
};

// Orders
export const ordersApi = {
  create: (data) => apiRequest('/orders', { method: 'POST', body: JSON.stringify(data) }),
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return apiRequest(`/orders${q ? `?${q}` : ''}`);
  },
  get: (id) => apiRequest(`/orders/${id}`),
  tracking: (id) => apiRequest(`/orders/${id}/tracking`),
  updateStatus: (id, status) => apiRequest(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  reorder: (id) => apiRequest(`/orders/${id}/reorder`, { method: 'POST' }),
};

// Bookings
export const bookingsApi = {
  create: (data) => apiRequest('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return apiRequest(`/bookings${q ? `?${q}` : ''}`);
  },
  update: (id, data) => apiRequest(`/bookings/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  cancel: (id) => apiRequest(`/bookings/${id}`, { method: 'DELETE' }),
};

// Users
export const usersApi = {
  get: (id) => apiRequest(`/users/${id}`),
  update: (id, data) => apiRequest(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  changePassword: (id, data) => apiRequest(`/users/${id}/password`, { method: 'PATCH', body: JSON.stringify(data) }),
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return apiRequest(`/users${q ? `?${q}` : ''}`);
  },
  setStatus: (id, status) => apiRequest(`/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  favorites: (id) => apiRequest(`/users/${id}/favorites`),
  addFavorite: (id, restaurantId) => apiRequest(`/users/${id}/favorites/${restaurantId}`, { method: 'POST' }),
  removeFavorite: (id, restaurantId) => apiRequest(`/users/${id}/favorites/${restaurantId}`, { method: 'DELETE' }),
};

// Reviews
export const reviewsApi = {
  list: (restaurantId) => apiRequest(`/reviews${restaurantId ? `?restaurantId=${restaurantId}` : ''}`),
  create: (data) => apiRequest('/reviews', { method: 'POST', body: JSON.stringify(data) }),
};

// Notifications
export const notificationsApi = {
  list: (userId) => apiRequest(`/notifications${userId ? `?userId=${userId}` : ''}`),
  dismiss: (id) => apiRequest(`/notifications/${id}`, { method: 'DELETE' }),
};

// Admin
export const adminApi = {
  overview: () => apiRequest('/admin/analytics/overview'),
  revenue: (period) => apiRequest(`/admin/analytics/revenue?period=${period || 'month'}`),
  settings: () => apiRequest('/admin/settings'),
  updateSettings: (data) => apiRequest('/admin/settings', { method: 'PATCH', body: JSON.stringify(data) }),
  maintenance: (action) => apiRequest(`/admin/maintenance/${action}`, { method: 'POST' }),
};

// Promos & Mail
export const promosApi = {
  validate: (code) => apiRequest('/promos/validate', { method: 'POST', body: JSON.stringify({ code }) }),
};

export const mailApi = {
  contact: (data) => apiRequest('/mail/contact', { method: 'POST', body: JSON.stringify(data) }),
};

// Demo credentials mapped to roles (seeded in backend)
export const DEMO_CREDENTIALS = {
  customer: { email: 'alex@supameal.com', password: 'Password123!' },
  restaurant_owner: { email: 'maria@goldenplate.com', password: 'Password123!' },
  admin: { email: 'admin@supameal.com', password: 'Password123!' },
};
