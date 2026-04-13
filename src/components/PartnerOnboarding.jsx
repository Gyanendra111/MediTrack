import React, { useState } from 'react';
import { Building2, FileCheck2, ShieldCheck } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { getApiUrl } from '../config/api';

const partnerTypes = [
  'Recycle Industry Partner (Companies)',
  'Collection Partner (Medical/Partner Stores)',
  'Pickup Logistics Partner',
];

const PartnerOnboarding = () => {
  const { registerPartnerApplication, partnerApplications } = useAppData();
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    organizationName: '',
    partnerType: partnerTypes[0],
    acceptedCategories: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    businessLicenseUrl: '',
    taxDocUrl: '',
    addressProofUrl: '',
    additionalDocUrl: '',
  });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');

    try {
      const res = await fetch(getApiUrl('/partner/verify'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const payload = await res.json();
        throw new Error(payload?.message || 'Partner verification failed');
      }

      registerPartnerApplication(form);
      setStatus('Partner request submitted. Status: Under Team Review.');
    } catch (err) {
      setError(err.message || 'Unable to submit partner request.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="figma-title text-3xl font-bold text-slate-900">Partner Network Onboarding</h1>
        <p className="text-slate-500">Apply as a verified partner for recycling, collection, or pickup services.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-900 mb-4 inline-flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" /> Become a Partner
        </h2>

        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required className="panel-input p-3" placeholder="Organization Name" value={form.organizationName} onChange={(e) => setForm((p) => ({ ...p, organizationName: e.target.value }))} />
          <select className="panel-input p-3" value={form.partnerType} onChange={(e) => setForm((p) => ({ ...p, partnerType: e.target.value }))}>
            {partnerTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
          <input required className="panel-input p-3 md:col-span-2" placeholder="Accepted Categories (e.g. Manure, Medicine, Food Waste)" value={form.acceptedCategories} onChange={(e) => setForm((p) => ({ ...p, acceptedCategories: e.target.value }))} />
          <input required className="panel-input p-3" placeholder="Contact Person Name" value={form.contactName} onChange={(e) => setForm((p) => ({ ...p, contactName: e.target.value }))} />
          <input required type="email" className="panel-input p-3" placeholder="Contact Email" value={form.contactEmail} onChange={(e) => setForm((p) => ({ ...p, contactEmail: e.target.value }))} />
          <input required className="panel-input p-3" placeholder="Contact Phone" value={form.contactPhone} onChange={(e) => setForm((p) => ({ ...p, contactPhone: e.target.value }))} />
          <input required className="panel-input p-3" placeholder="Business License URL" value={form.businessLicenseUrl} onChange={(e) => setForm((p) => ({ ...p, businessLicenseUrl: e.target.value }))} />
          <input required className="panel-input p-3" placeholder="Tax / GST Document URL" value={form.taxDocUrl} onChange={(e) => setForm((p) => ({ ...p, taxDocUrl: e.target.value }))} />
          <input required className="panel-input p-3" placeholder="Address Proof URL" value={form.addressProofUrl} onChange={(e) => setForm((p) => ({ ...p, addressProofUrl: e.target.value }))} />
          <input className="panel-input p-3" placeholder="Additional Document URL (optional)" value={form.additionalDocUrl} onChange={(e) => setForm((p) => ({ ...p, additionalDocUrl: e.target.value }))} />

          <button className="md:col-span-2 bg-blue-600 text-white rounded-xl py-3 hover:bg-blue-700 font-semibold inline-flex items-center justify-center gap-2">
            <FileCheck2 className="w-4 h-4" /> Submit for Verification
          </button>

          {error && <p className="md:col-span-2 text-sm text-red-600">{error}</p>}
          {status && <p className="md:col-span-2 text-sm text-emerald-600">{status}</p>}
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-900 mb-4 inline-flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> Team Authorization Queue
        </h2>
        <div className="space-y-3">
          {(partnerApplications || []).length === 0 ? (
            <p className="text-sm text-slate-500">No partner applications submitted yet.</p>
          ) : (
            partnerApplications.slice(0, 6).map((app) => (
              <div key={app.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{app.organizationName}</p>
                <p className="text-sm text-slate-500">{app.partnerType}</p>
                <p className="text-sm text-slate-500">Categories: {app.acceptedCategories}</p>
                <p className="text-xs text-amber-700 mt-1">Status: {app.status}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerOnboarding;
