const DEFAULT_API_BASE = 'http://localhost:5000/api'

export const API_BASE = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE

export const getApiUrl = (path = '') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE}${normalizedPath}`
}

export const getBackendHealthUrl = () => API_BASE.replace(/\/api\/?$/, '') + '/health'
