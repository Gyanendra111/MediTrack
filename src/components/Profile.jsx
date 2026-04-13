import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';

const Profile = () => {
  const { user } = useAuth();
  const { profile, saveProfile } = useAppData();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const onSave = (e) => {
    e.preventDefault();
    saveProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="figma-title text-3xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-500">Update your account and emergency details.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-sm text-slate-500 mb-4">Account email: {user?.email || 'Guest session'}</p>
        <form onSubmit={onSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="panel-input p-3" placeholder="Full name" value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} />
          <input className="panel-input p-3" placeholder="Phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
          <input type="date" className="panel-input p-3" value={form.dob} onChange={(e) => setForm((p) => ({ ...p, dob: e.target.value }))} />
          <input className="panel-input p-3" placeholder="Blood group" value={form.bloodGroup} onChange={(e) => setForm((p) => ({ ...p, bloodGroup: e.target.value }))} />
          <input className="panel-input p-3 md:col-span-2" placeholder="Address" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} />
          <input className="panel-input p-3 md:col-span-2" placeholder="Emergency contact" value={form.emergencyContact} onChange={(e) => setForm((p) => ({ ...p, emergencyContact: e.target.value }))} />
          <button className="md:col-span-2 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700">Save Profile</button>
          {saved && <p className="md:col-span-2 text-sm text-emerald-600">Saved successfully.</p>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
