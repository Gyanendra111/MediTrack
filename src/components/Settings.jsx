import React, { useState } from 'react';
import { BellRing, CheckCircle2, Moon, Sun } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { getBackendHealthUrl } from '../config/api';

const Settings = () => {
  const { settings, saveSettings, theme, setTheme } = useAppData();
  const [status, setStatus] = useState('');

  const testBackend = async () => {
    setStatus('Checking backend...');
    try {
      const res = await fetch(getBackendHealthUrl());
      if (!res.ok) throw new Error('Unavailable');
      const json = await res.json();
      setStatus(`Connected: ${json.service}`);
    } catch {
      setStatus('Backend is not reachable on localhost:5000. Start backend server to enable API features.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="figma-title text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Configure reminders, notifications, and appearance.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <h2 className="font-semibold text-slate-900">Notifications</h2>
        {[
          ['emailAlerts', 'Email alerts'],
          ['pushAlerts', 'Push alerts'],
          ['smsAlerts', 'SMS alerts'],
        ].map(([key, label]) => (
          <label key={key} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-slate-700">{label}</span>
            <input
              type="checkbox"
              checked={settings[key]}
              onChange={(e) => saveSettings({ [key]: e.target.checked })}
            />
          </label>
        ))}

        <label className="block">
          <span className="text-sm text-slate-600">Reminder days before expiry</span>
          <input
            type="number"
            min="1"
            max="30"
            value={settings.reminderDays}
            onChange={(e) => saveSettings({ reminderDays: Number(e.target.value || 1) })}
            className="panel-input w-full mt-2 p-3"
          />
        </label>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Appearance</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setTheme('light')}
            className={`px-4 py-2 rounded-lg border inline-flex items-center gap-2 ${theme === 'light' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}
          >
            <Sun className="w-4 h-4" /> Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`px-4 py-2 rounded-lg border inline-flex items-center gap-2 ${theme === 'dark' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}
          >
            <Moon className="w-4 h-4" /> Dark
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-900 mb-4 inline-flex items-center gap-2">
          <BellRing className="w-5 h-5 text-blue-600" /> Backend Connectivity Test
        </h2>
        <button onClick={testBackend} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
          Run Test
        </button>
        {status && <p className="text-sm text-slate-600 mt-3 inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> {status}</p>}
      </div>
    </div>
  );
};

export default Settings;
