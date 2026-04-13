import React from 'react';
import { Factory, Truck, MapPin, Leaf } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const partners = [
  { name: 'GreenLoop Pharma Recycler', categories: ['Expired Medicine', 'Syrups', 'Blister Packs'], distance: '1.8 km' },
  { name: 'BioSoil Organics', categories: ['Food Waste', 'Vegetable Scraps', 'Dairy Waste'], distance: '3.1 km' },
  { name: 'EcoDerma Materials', categories: ['Cosmetic Containers', 'Skincare Tubes', 'Plastic Bottles'], distance: '4.4 km' },
];

const RecycleHub = () => {
  const { createRecycleRequest, points, recycleRequests } = useAppData();

  const onSchedule = (partner, category, method) => {
    createRecycleRequest({
      partner,
      category,
      method,
      rewardType: method === 'visit' ? 'Visit Drop-off' : 'Pickup Service',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="figma-title text-3xl font-bold text-slate-900">Recycle Hub</h1>
        <p className="text-slate-500">Recycle medicines and food items with verified partners and earn points.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Current Reward Points</p>
          <p className="figma-title text-3xl text-slate-900">{points}</p>
        </div>
        <div className="text-sm text-slate-600 inline-flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-600" /> Visit drop-off gives +120 pts, pickup gives +60 pts.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {partners.map((partner) => (
          <div key={partner.name} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900 inline-flex items-center gap-2">
                  <Factory className="w-4 h-4 text-blue-600" /> {partner.name}
                </h3>
                <p className="text-sm text-slate-500 inline-flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {partner.distance}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {partner.categories.map((category) => (
                <span key={category} className="text-xs bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-slate-700">{category}</span>
              ))}
            </div>

            <div className="space-y-2">
              {partner.categories.slice(0, 2).map((category) => (
                <div key={category} className="flex flex-col sm:flex-row gap-2">
                  <button onClick={() => onSchedule(partner.name, category, 'visit')} className="flex-1 rounded-lg bg-emerald-600 text-white px-3 py-2 hover:bg-emerald-700">
                    Visit & Recycle (+120)
                  </button>
                  <button onClick={() => onSchedule(partner.name, category, 'pickup')} className="flex-1 rounded-lg bg-blue-600 text-white px-3 py-2 hover:bg-blue-700 inline-flex items-center justify-center gap-2">
                    <Truck className="w-4 h-4" /> Pickup (+60)
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Recent Recycling Requests</h2>
        <div className="space-y-3">
          {(recycleRequests || []).length === 0 ? (
            <p className="text-sm text-slate-500">No recycling requests yet. Schedule one above.</p>
          ) : (
            recycleRequests.slice(0, 6).map((r) => (
              <div key={r.id} className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">{r.partner}</p>
                  <p className="text-sm text-slate-500">{r.category} • {r.rewardType} • {r.status}</p>
                </div>
                <p className="font-semibold text-emerald-600">+{r.earnedPoints} pts</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecycleHub;
