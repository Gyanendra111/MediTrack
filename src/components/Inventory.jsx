import React, { useMemo, useState } from 'react';
import { Search, Filter, Edit, Trash2 } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

const statusClass = {
  Expiring: 'bg-amber-100 text-amber-700',
  'Expires Soon': 'bg-orange-100 text-orange-700',
  Safe: 'bg-emerald-100 text-emerald-700',
  Expired: 'bg-red-100 text-red-700',
};

const FigmaInventory = () => {
  const { products, updateProduct, deleteProduct } = useAppData();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [status, setStatus] = useState('All Status');

  const categories = useMemo(() => ['All Categories', ...new Set(products.map((p) => p.cat))], [products]);
  const statuses = ['All Status', 'Expiring', 'Expires Soon', 'Safe', 'Expired'];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const q = query.trim().toLowerCase();
      const passSearch = !q || p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q);
      const passCat = category === 'All Categories' || p.cat === category;
      const passStatus = status === 'All Status' || p.status === status;
      return passSearch && passCat && passStatus;
    });
  }, [products, query, category, status]);

  const onEdit = (p) => {
    const qty = window.prompt('Update quantity', String(p.qty));
    if (qty === null) return;
    const parsed = Number(qty);
    if (Number.isNaN(parsed) || parsed < 0) return;
    updateProduct(p.id, { qty: parsed });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="figma-title text-3xl font-bold text-slate-900">Inventory</h1>
        <p className="text-slate-500">Manage your products and track expiry dates</p>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg flex items-center justify-center gap-2">
          <Filter className="w-4 h-4" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-transparent outline-none">
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg flex items-center justify-center gap-2">
          <Filter className="w-4 h-4" />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-transparent outline-none">
            {statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Products ({filtered.length} items)</h3>
        </div>
        
        <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[780px]">
          <thead className="bg-slate-50 sticky top-0">
            <tr>
              <th className="p-4 font-semibold text-slate-600">Product Name</th>
              <th className="p-4 font-semibold text-slate-600">Category</th>
              <th className="p-4 font-semibold text-slate-600">Expiry Date</th>
              <th className="p-4 font-semibold text-slate-600">Quantity</th>
              <th className="p-4 font-semibold text-slate-600">Status</th>
              <th className="p-4 font-semibold text-slate-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/50">
                <td className="p-4 font-medium text-slate-900">{p.name}</td>
                <td className="p-4 text-slate-500">{p.cat}</td>
                <td className="p-4 text-slate-500">{p.date}</td>
                <td className="p-4 text-slate-500">{p.qty}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClass[p.status] || statusClass.Safe}`}>
                    {p.status || 'Safe'}
                  </span>
                </td>
                <td className="p-4 flex items-center justify-end gap-3 text-slate-400">
                  <button onClick={() => onEdit(p)} className="hover:text-blue-600"><Edit className="w-4 h-4"/></button>
                  <button onClick={() => deleteProduct(p.id)} className="hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default FigmaInventory;
