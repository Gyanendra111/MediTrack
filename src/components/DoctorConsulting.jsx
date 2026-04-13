import React, { useState } from 'react';
import { Calendar, Clock, Star, MapPin, Sparkles } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const doctors = [
  {
    name: "Dr. Sarah Chen",
    spec: "General Physician",
    rating: 4.8,
    reviews: 124,
    dist: "2.5 km",
    avail: "Available Today"
  },
  {
    name: "Dr. Michael Ross",
    spec: "Dermatologist",
    rating: 4.9,
    reviews: 89,
    dist: "3.8 km",
    avail: "Next available: Tomorrow"
  }
];

const FigmaDoctorConsulting = () => {
  const [tab, setTab] = useState('find');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('09:00 AM');
  const { appointments, bookAppointment, cancelAppointment } = useAppData();

  const slotOptions = ['09:00 AM', '11:30 AM', '02:00 PM', '05:30 PM'];

  const handleBook = (doc) => {
    bookAppointment({
      doctor: doc.name,
      specialization: doc.spec,
      slot: selectedSlot,
      date: selectedDate || 'TBD',
      distance: doc.dist,
      status: 'Coming Soon - Waitlist',
      mode: 'Coming Soon',
    });
    setTab('appointments');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="figma-title text-3xl font-bold text-slate-900">Doctor Consulting</h1>
        <p className="text-slate-500">Book appointments with verified healthcare professionals</p>
      </div>

      <div className="flex border-b border-slate-200 overflow-x-auto">
        <button 
          onClick={() => setTab('find')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${tab === 'find' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Find Doctors
        </button>
        <button 
          onClick={() => setTab('appointments')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${tab === 'appointments' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          My Appointments
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800 inline-flex items-start gap-3">
        <Sparkles className="w-5 h-5 mt-0.5" />
        <div>
          <p className="font-semibold">Appointment Booking (Coming Soon)</p>
          <p className="text-sm">You can select date and slot now to join the waitlist. Live confirmations and payments will be enabled soon.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-slate-600 mb-2">Preferred Date</p>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="panel-input w-full p-3" />
        </div>
        <div>
          <p className="text-sm text-slate-600 mb-2">Preferred Time Slot</p>
          <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} className="panel-input w-full p-3">
            {slotOptions.map((slot) => <option key={slot}>{slot}</option>)}
          </select>
        </div>
      </div>

      {tab === 'find' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {doctors.map((doc, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex-shrink-0 overflow-hidden">
                 <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${doc.name}`} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{doc.name}</h3>
                    <p className="text-blue-600 font-medium text-sm mb-2">{doc.spec}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-sm font-medium">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> {doc.rating}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {doc.dist}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {doc.avail}</span>
                </div>

                <button onClick={() => handleBook(doc)} className="w-full py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition-colors">
                  Add to Waitlist (Coming Soon)
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'appointments' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          {appointments.length === 0 ? (
            <div className="text-center py-10">
              <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No upcoming appointments</h3>
              <p className="text-slate-500">You don't have any doctor consultations scheduled.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((a) => (
                <div key={a.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{a.doctor}</p>
                    <p className="text-sm text-slate-500">{a.specialization} • {a.date || 'TBD'} • {a.slot} • {a.distance}</p>
                    <p className="text-xs text-slate-400 mt-1">Status: {a.status}</p>
                  </div>
                  <button disabled={a.status === 'Cancelled'} onClick={() => cancelAppointment(a.id)} className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50">
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FigmaDoctorConsulting;
