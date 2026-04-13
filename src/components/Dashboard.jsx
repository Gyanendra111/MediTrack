import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, Clock, Box, TriangleAlert, ShieldAlert, Gem } from 'lucide-react';

const dataLine = [
  { name: 'Oct', expired: 0, expiringSoon: 0 },
  { name: 'Nov', expired: 1, expiringSoon: 2 },
  { name: 'Dec', expired: 0, expiringSoon: 1 },
  { name: 'Jan', expired: 2, expiringSoon: 4 },
  { name: 'Feb', expired: 1, expiringSoon: 3 },
  { name: 'Mar', expired: 0, expiringSoon: 5 },
  { name: 'Apr', expired: 1, expiringSoon: 6 },
];

const pieData = [
  { name: 'Medicine', value: 400 },
  { name: 'Grocery', value: 300 },
  { name: 'Cosmetics', value: 300 },
];
const COLORS = ['#10b981', '#f59e0b', '#6366f1'];

const summaryCards = [
  { label: 'Total Products', value: '127', note: 'Across all categories', icon: Box, tone: 'text-blue-600 bg-blue-50 border-blue-100' },
  { label: 'Expiring Soon', value: '23', note: 'Within notification period', icon: TriangleAlert, tone: 'text-amber-600 bg-amber-50 border-amber-100' },
  { label: 'Expired Items', value: '5', note: 'Exchange for rewards', icon: ShieldAlert, tone: 'text-red-600 bg-red-50 border-red-100' },
  { label: 'Rewards Points', value: '1250', note: 'Up to 30% discount available', icon: Gem, tone: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="figma-title text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Track your products and manage expiry dates</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <h3 className="figma-title text-3xl font-bold mt-2 text-slate-900">{card.value}</h3>
                  <p className="text-xs text-slate-500 mt-1">{card.note}</p>
                </div>
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${card.tone}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Expiry Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataLine}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip />
                <Line type="monotone" dataKey="expired" stroke="#ef4444" strokeWidth={3} dot={{r: 3}} />
                <Line type="monotone" dataKey="expiringSoon" stroke="#f59e0b" strokeWidth={3} dot={{r: 3}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 text-sm text-slate-600">
             <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> expired</span>
             <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> expiringSoon</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Category Distribution</h3>
          <div className="h-56 flex items-center justify-center">
             <PieChart width={300} height={200}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs text-slate-600 mt-2">
            <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-2 py-2 text-center">Medicine: 35%</div>
            <div className="rounded-lg bg-amber-50 border border-amber-100 px-2 py-2 text-center">Grocery: 41%</div>
            <div className="rounded-lg bg-indigo-50 border border-indigo-100 px-2 py-2 text-center">Cosmetics: 24%</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Products Expiring Soon</h3>
        <div className="space-y-3">
          {[ 
             { name: 'Paracetamol 500mg', cat: 'Medicine', date: '2026-04-20', days: 8, color: 'text-amber-500' },
             { name: 'Organic Milk', cat: 'Grocery', date: '2026-04-14', days: 2, color: 'text-red-500', alert: true },
             { name: 'Face Cream SPF 50', cat: 'Cosmetics', date: '2026-05-01', days: 19, color: 'text-emerald-500' }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/70">
              <div>
                <h4 className="font-semibold text-slate-900">{item.name}</h4>
                <p className="text-sm text-slate-500">{item.cat} • Expires: {item.date}</p>
              </div>
              <div className={`flex items-center gap-2 font-medium ${item.color}`}>
                {item.days} days left
                {item.alert ? <AlertTriangle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
              </div>
            </div>
          ))}
        </div>
        <button className="w-full text-center mt-4 p-3 font-medium text-slate-900 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
