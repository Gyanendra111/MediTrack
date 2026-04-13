import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { getApiUrl } from '../config/api';

const DoctorRegister = () => {
  const navigate = useNavigate();
  const { registerDoctor } = useAppData();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialization: '',
    experienceYears: '',
    licenseNumber: '',
    medicalCouncil: '',
    clinicAddress: '',
    idProofUrl: '',
    degreeProofUrl: '',
    livePhotoUrl: '',
    consultationFee: '',
    bio: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(getApiUrl('/doctor/verify'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const payload = await res.json();
        throw new Error(payload?.message || 'Verification submit failed');
      }
    } catch (err) {
      setError(err.message || 'Could not connect to backend verification service.');
      return;
    }

    registerDoctor(form);
    setSubmitted(true);
    setTimeout(() => navigate('/doctor'), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
        <h1 className="figma-title text-3xl font-bold text-slate-900">Register as a Doctor</h1>
        <p className="text-slate-500 mt-2 mb-6">Submit verification details for onboarding and patient booking visibility.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['fullName', 'Full name'],
            ['email', 'Email'],
            ['phone', 'Phone'],
            ['specialization', 'Specialization'],
            ['experienceYears', 'Years of experience'],
            ['licenseNumber', 'Medical license number'],
            ['medicalCouncil', 'Medical council registration'],
            ['clinicAddress', 'Clinic/Hospital address'],
            ['idProofUrl', 'ID proof URL'],
            ['degreeProofUrl', 'Degree certificate URL'],
            ['livePhotoUrl', 'Live photo URL'],
            ['consultationFee', 'Consultation fee'],
          ].map(([key, label]) => (
            <input
              key={key}
              required
              className="panel-input p-3"
              placeholder={label}
              value={form[key]}
              onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
            />
          ))}

          <textarea
            className="panel-input p-3 md:col-span-2 min-h-28"
            placeholder="Professional bio"
            value={form.bio}
            onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
          />

          <button className="md:col-span-2 bg-blue-600 text-white rounded-xl py-3 hover:bg-blue-700 font-semibold">
            Submit for Verification
          </button>

          {error && <p className="md:col-span-2 text-red-600 text-sm">{error}</p>}
          {submitted && <p className="md:col-span-2 text-emerald-600 text-sm">Application submitted. Redirecting to doctor consulting.</p>}
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister;
