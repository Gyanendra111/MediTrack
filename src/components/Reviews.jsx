import React from 'react';
import { Star, MessageSquare, ShieldCheck } from 'lucide-react';

const reviewSummary = {
  avg: 4.4,
  total: 218,
  flagged: 5,
};

const recentReviews = [
  {
    id: 1,
    product: 'Paracetamol 500mg',
    reviewer: 'A. Sharma',
    rating: 5,
    note: 'Delivery was fast and packaging was safe.',
  },
  {
    id: 2,
    product: 'Vitamin C',
    reviewer: 'N. Khan',
    rating: 4,
    note: 'Good value, but stock availability can improve.',
  },
];

const Reviews = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="figma-title text-3xl font-bold text-slate-900">Reviews</h1>
        <p className="text-slate-500">Monitor verified user and partner feedback.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-sm text-slate-500">Average Rating</p>
          <p className="figma-title text-3xl font-bold text-slate-900 mt-2">{reviewSummary.avg}/5</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-sm text-slate-500">Total Reviews</p>
          <p className="figma-title text-3xl font-bold text-slate-900 mt-2">{reviewSummary.total}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-sm text-slate-500">Flagged For Audit</p>
          <p className="figma-title text-3xl font-bold text-slate-900 mt-2">{reviewSummary.flagged}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Recent Feedback
        </h2>
        <div className="space-y-3">
          {recentReviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-slate-900">{review.product}</p>
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{review.rating}</span>
                </div>
              </div>
              <p className="text-sm text-slate-500">By {review.reviewer}</p>
              <p className="text-sm text-slate-700 mt-2">{review.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 panel-accent p-4 text-sm text-slate-700 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5" />
          <p>API placeholder: connect moderation and verified-purchase logic in this module.</p>
        </div>

        <button className="mt-6 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
          Open Review Moderation Queue
        </button>
      </div>
    </div>
  );
};

export default Reviews;
