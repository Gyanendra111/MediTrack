import React from 'react';
import { Gift, Zap, TrendingUp } from 'lucide-react';

const FigmaRewards = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="figma-title text-3xl font-bold text-slate-900">Rewards</h1>
        <p className="text-slate-500">Earn points by scanning and safely disposing of expired medicines</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-600/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-blue-100">Total Points</p>
              <h2 className="text-3xl font-bold">1,250</h2>
            </div>
          </div>
          <p className="text-sm text-blue-200">Keep scanning to reach the next tier!</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <p className="text-sm text-slate-500">This Month</p>
          <h2 className="figma-title text-3xl font-bold text-slate-900 mt-2">+320</h2>
          <p className="text-sm text-emerald-600 mt-2 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> 18% better than last month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <p className="text-sm text-slate-500">Next Milestone</p>
          <h2 className="figma-title text-3xl font-bold text-slate-900 mt-2">1500 pts</h2>
          <div className="w-full mt-4 h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full w-[83%] bg-blue-600 rounded-full" />
          </div>
          <p className="text-xs text-slate-500 mt-2">250 points to unlock premium offers</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Gift className="w-5 h-5 text-blue-600" /> Available Offers
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex gap-4">
             <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
               <span className="font-bold text-xl text-slate-400">10%</span>
             </div>
             <div className="flex-1 flex flex-col justify-center">
               <h4 className="font-semibold text-slate-900">Apollo Pharmacy Discount</h4>
               <p className="text-sm text-slate-500">Cost: 500 points</p>
             </div>
          </div>
          
           <div className="border border-slate-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex gap-4">
             <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
               <span className="font-bold text-xl text-slate-400">Free</span>
             </div>
             <div className="flex-1 flex flex-col justify-center">
               <h4 className="font-semibold text-slate-900">Basic Doctor Consult</h4>
               <p className="text-sm text-slate-500">Cost: 1000 points</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigmaRewards;
