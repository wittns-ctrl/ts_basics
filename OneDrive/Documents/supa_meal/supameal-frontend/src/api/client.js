const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function apiRequest(path, options = {}) {
  const { skipAuth, headers: extraHeaders, ...rest } = options;
  const token = localStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(extraHeaders || {}),
  };
  if (!skipAuth && token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...rest,
      headers,
    });
  } catch (err) {
    throw new ApiError(err.message || 'Network error', 0);
  }

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new ApiError(data.message || data.error || 'Request failed', res.status);
  }
  return data;
}

export { API_URL, ApiError };
