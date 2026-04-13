import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { getApiUrl } from '../config/api';

const STORAGE_KEY = 'meditrack-app-data-v1';

const defaultProducts = [
  { id: 1, name: 'Paracetamol 500mg', cat: 'Medicine', date: '2026-04-20', qty: 2 },
  { id: 2, name: 'Organic Milk', cat: 'Grocery', date: '2026-04-14', qty: 1 },
  { id: 3, name: 'Face Cream SPF 50', cat: 'Cosmetics', date: '2026-05-01', qty: 1 },
  { id: 4, name: 'Vitamin D3', cat: 'Medicine', date: '2026-04-18', qty: 3 },
  { id: 5, name: 'Expired Antibiotic', cat: 'Medicine', date: '2026-04-01', qty: 1 },
];

const defaultState = {
  products: defaultProducts,
  appointments: [],
  doctorApplications: [],
  partnerApplications: [],
  points: 1250,
  recycleRequests: [],
  profile: {
    fullName: 'Guest User',
    phone: '',
    dob: '',
    bloodGroup: '',
    address: '',
    emergencyContact: '',
  },
  settings: {
    emailAlerts: true,
    pushAlerts: true,
    smsAlerts: false,
    reminderDays: 7,
  },
  theme: 'light',
};

const AppDataContext = createContext(null);

const normalizeStatus = (expiryDate) => {
  const now = new Date();
  const date = new Date(expiryDate);
  const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

  if (Number.isNaN(diffDays)) return 'Safe';
  if (diffDays < 0) return 'Expired';
  if (diffDays <= 7) return 'Expiring';
  if (diffDays <= 14) return 'Expires Soon';
  return 'Safe';
};

export const AppDataProvider = ({ children }) => {
  const { user } = useAuth();
  const userKey = user?.uid || 'guest';
  const hydratedRef = useRef(false);

  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...defaultState, ...JSON.parse(raw) };
        return {
          ...parsed,
          products: (parsed.products || []).map((p) => ({
            ...p,
            status: p.status || normalizeStatus(p.date),
          })),
        };
      }
      return {
        ...defaultState,
        products: defaultState.products.map((p) => ({ ...p, status: normalizeStatus(p.date) })),
      };
    } catch {
      return {
        ...defaultState,
        products: defaultState.products.map((p) => ({ ...p, status: normalizeStatus(p.date) })),
      };
    }
  });

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      try {
        const res = await fetch(getApiUrl(`/app-state/${encodeURIComponent(userKey)}`));
        if (!res.ok) throw new Error('Backend unavailable');
        const payload = await res.json();
        if (cancelled) return;

        const remote = payload?.state;
        if (remote) {
          setState({
            ...defaultState,
            ...remote,
            products: (remote.products || []).map((p) => ({
              ...p,
              status: p.status || normalizeStatus(p.date),
            })),
          });
          hydratedRef.current = true;
          return;
        }
      } catch {
        // Fall through to local state.
      }

      hydratedRef.current = true;
    };

    hydratedRef.current = false;
    hydrate();

    return () => {
      cancelled = true;
    };
  }, [userKey]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!hydratedRef.current) return;

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      fetch(getApiUrl(`/app-state/${encodeURIComponent(userKey)}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state }),
        signal: controller.signal,
      }).catch(() => {
        // Keep local mode when backend is offline.
      });
    }, 220);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [state, userKey]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  const actions = useMemo(() => ({
    addProduct: (payload) => {
      setState((prev) => ({
        ...prev,
        products: [
          {
            id: Date.now(),
            ...payload,
            status: normalizeStatus(payload.date),
          },
          ...prev.products,
        ],
      }));
    },
    updateProduct: (id, patch) => {
      setState((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          p.id === id ? { ...p, ...patch, status: normalizeStatus(patch.date || p.date) } : p
        ),
      }));
    },
    deleteProduct: (id) => {
      setState((prev) => ({
        ...prev,
        products: prev.products.filter((p) => p.id !== id),
      }));
    },
    bookAppointment: (payload) => {
      setState((prev) => ({
        ...prev,
        appointments: [
          {
            id: Date.now(),
            bookedAt: new Date().toISOString(),
            status: 'Booked',
            ...payload,
          },
          ...prev.appointments,
        ],
      }));
    },
    cancelAppointment: (id) => {
      setState((prev) => ({
        ...prev,
        appointments: prev.appointments.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a)),
      }));
    },
    saveProfile: (profile) => setState((prev) => ({ ...prev, profile: { ...prev.profile, ...profile } })),
    saveSettings: (settings) => setState((prev) => ({ ...prev, settings: { ...prev.settings, ...settings } })),
    toggleTheme: () =>
      setState((prev) => ({
        ...prev,
        theme: prev.theme === 'light' ? 'dark' : 'light',
      })),
    setTheme: (theme) => setState((prev) => ({ ...prev, theme })),
    registerDoctor: (payload) => {
      setState((prev) => ({
        ...prev,
        doctorApplications: [{ id: Date.now(), submittedAt: new Date().toISOString(), ...payload }, ...prev.doctorApplications],
      }));
    },
    registerPartnerApplication: (payload) => {
      setState((prev) => ({
        ...prev,
        partnerApplications: [
          {
            id: Date.now(),
            submittedAt: new Date().toISOString(),
            status: 'Under Team Review',
            ...payload,
          },
          ...(prev.partnerApplications || []),
        ],
      }));
    },
    createRecycleRequest: (payload) => {
      const earnedPoints = payload.method === 'visit' ? 120 : 60;
      setState((prev) => ({
        ...prev,
        points: (prev.points || 0) + earnedPoints,
        recycleRequests: [
          {
            id: Date.now(),
            earnedPoints,
            createdAt: new Date().toISOString(),
            status: 'Scheduled',
            ...payload,
          },
          ...(prev.recycleRequests || []),
        ],
      }));
    },
  }), []);

  const value = useMemo(
    () => ({
      ...state,
      ...actions,
    }),
    [state, actions]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
};
