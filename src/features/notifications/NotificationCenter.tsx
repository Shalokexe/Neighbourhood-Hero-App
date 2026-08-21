import React, { useState } from 'react';
import { Bell, Zap, Trophy, ShieldCheck, MessageSquare, ArrowLeft, CheckCircle2 } from 'lucide-react';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: 'GIG' | 'CREDIT' | 'BADGE' | 'SYSTEM';
  createdAt: string;
  isRead: boolean;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    title: 'Mission Accepted! 🚀',
    body: 'Simran Kaur accepted your "Carry groceries" mission in Sector 125.',
    type: 'GIG',
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    isRead: false
  },
  {
    id: 'notif_2',
    title: '+35 Gig Credits Awarded! ⭐',
    body: '5-star completion bonus awarded for Python Tutoring task.',
    type: 'CREDIT',
    createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
    isRead: false
  },
  {
    id: 'notif_3',
    title: 'Badge Unlocked: Five-Star Hero 🏆',
    body: 'You maintained a perfect 5.0 rating across 5 completed missions.',
    type: 'BADGE',
    createdAt: new Date(Date.now() - 360 * 60000).toISOString(),
    isRead: true
  },
  {
    id: 'notif_4',
    title: 'New Voucher Available 🎁',
    body: 'Brew & Bean Co. added a new ₹100 local café voucher in Kharar.',
    type: 'SYSTEM',
    createdAt: new Date(Date.now() - 1440 * 60000).toISOString(),
    isRead: true
  }
];

interface NotificationCenterProps {
  onBack: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ onBack }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'ALL' | 'GIG' | 'CREDIT' | 'BADGE'>('ALL');

  const filtered = notifications.filter(n => filter === 'ALL' || n.type === filter);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-[#121826] border border-white/10 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <h1 className="font-heading font-extrabold text-white text-base flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-[#00E5FF]" />
          ACTIVITY CENTER
        </h1>

        <button
          onClick={markAllRead}
          className="text-[11px] font-bold text-[#00E5FF] hover:underline"
        >
          Mark all read
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {['ALL', 'GIG', 'CREDIT', 'BADGE'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-3 py-1 rounded-xl text-[11px] font-heading font-bold transition-all ${
              filter === f
                ? 'bg-white text-black font-extrabold shadow-sm'
                : 'bg-slate-900 text-slate-400 border border-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center text-xs text-slate-400">
            No notifications in this filter.
          </div>
        ) : (
          filtered.map((notif) => (
            <div
              key={notif.id}
              className={`glass-card rounded-2xl p-3.5 border transition-all flex items-start gap-3 ${
                notif.isRead ? 'border-white/5 opacity-75' : 'border-[#00E5FF]/30 bg-[#00E5FF]/5'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0">
                {notif.type === 'GIG' && <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />}
                {notif.type === 'CREDIT' && <Zap className="w-4 h-4 text-amber-400" />}
                {notif.type === 'BADGE' && <Trophy className="w-4 h-4 text-purple-400" />}
                {notif.type === 'SYSTEM' && <Bell className="w-4 h-4 text-emerald-400" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-white text-xs">
                    {notif.title}
                  </h4>
                  <span className="text-[9px] text-slate-500">
                    {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                  {notif.body}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
