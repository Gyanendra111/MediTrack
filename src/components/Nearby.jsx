import React, { useMemo, useState } from 'react';
import { MapPin, Star, Building2, Navigation, LocateFixed } from 'lucide-react';

const stores = [
  { name: 'Apollo Pharmacy', distance: '0.5km', rating: 4.5, tag: 'Partner Exchange Enabled' },
  { name: 'MedPlus', distance: '1.2km', rating: 4.2, tag: 'Emergency Stock Available' },
  { name: 'Wellness Hub', distance: '2.4km', rating: 4.6, tag: 'Late-night support' },
];

const hospitals = [
  { name: 'City Care Hospital', distance: '2.1km', emergencyWard: 'Available 24x7', rating: 4.7 },
  { name: 'Greenline Medical Center', distance: '3.4km', emergencyWard: 'Available', rating: 4.3 },
];

const createMapEmbedUrl = (lat, lng) => {
  const delta = 0.02;
  const left = lng - delta;
  const right = lng + delta;
  const bottom = lat - delta;
  const top = lat + delta;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&marker=${lat}%2C${lng}&layer=mapnik`;
};

const Nearby = () => {
  const logoSrc = import.meta.env.VITE_APP_LOGO_SRC || '/MediTrack%20logo.png';
  const [mapUrl, setMapUrl] = useState('https://www.openstreetmap.org/export/embed.html?bbox=77.55%2C12.90%2C77.70%2C13.05&layer=mapnik');
  const [mapStatus, setMapStatus] = useState('');
  const canUseGeo = useMemo(() => typeof navigator !== 'undefined' && 'geolocation' in navigator, []);

  const recenterToMyLocation = () => {
    if (!canUseGeo) {
      setMapStatus('Geolocation is not supported on this device/browser.');
      return;
    }

    setMapStatus('Fetching your current location...');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const nextUrl = createMapEmbedUrl(coords.latitude, coords.longitude);
        setMapUrl(nextUrl);
        setMapStatus('Map recentered to your live location.');
      },
      () => {
        setMapStatus('Location access denied or unavailable. Please allow location permission.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="figma-title text-3xl font-bold text-slate-900">Nearby Stores</h1>
        <p className="text-slate-500">Find pharmacies and emergency hospitals around you.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden">
              <img
                src={logoSrc}
                alt="MediTrack Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/logo-placeholder.svg';
                }}
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Store Map</h2>
              <p className="text-xs brand-tagline">Your Path to Wellness, Tracked</p>
            </div>
          </div>
          <button
            onClick={recenterToMyLocation}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <LocateFixed className="w-4 h-4" /> Recenter to My Location
          </button>
        </div>
        <div className="rounded-xl overflow-hidden border border-slate-200">
          <iframe
            title="Nearby stores map"
            src={mapUrl}
            className="w-full h-72"
          />
        </div>
        {mapStatus && <p className="text-sm text-slate-500 mt-3">{mapStatus}</p>}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" /> Medical Stores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {stores.map((store) => (
            <div key={store.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{store.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{store.distance} • {store.tag}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-600 text-sm font-medium">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  {store.rating}
                </div>
              </div>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name)}`} target="_blank" rel="noreferrer" className="mt-4 w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2">
                <Navigation className="w-4 h-4" /> Navigate
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-600" /> Emergency Hospitals
        </h2>
        <div className="space-y-3">
          {hospitals.map((hospital) => (
            <div key={hospital.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{hospital.name}</p>
                <p className="text-sm text-slate-500">{hospital.distance} • {hospital.emergencyWard}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-600 font-medium">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                {hospital.rating}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nearby;
