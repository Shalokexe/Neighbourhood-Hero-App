import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { 
  ShieldAlert, Users, Layers, Award, Flag, ArrowLeft, 
  Ban, CheckCircle2, Search, Sliders, DollarSign 
} from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const { 
    allUsers, 
    gigs, 
    reports, 
    creditTransactions, 
    redemptions,
    adminToggleBlockUser,
    adminRemoveGig,
    adminAdjustCredits,
    adminResolveReport
  } = useApp();

  const [activeTab, setActiveTab] = useState<'users' | 'gigs' | 'reports' | 'adjust'>('users');
  const [userSearch, setUserSearch] = useState('');
  const [adjustUserId, setAdjustUserId] = useState(allUsers[0]?.id || '');
  const [adjustAmount, setAdjustAmount] = useState(50);
  const [adjustReason, setAdjustReason] = useState('Community Helper Bonus');
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Analytics Metrics
  const totalUsers = allUsers.length;
  const totalGigs = gigs.length;
  const completedGigs = gigs.filter(g => g.status === 'COMPLETED' || g.status === 'REVIEWED').length;
  const completionRate = totalGigs > 0 ? Math.round((completedGigs / totalGigs) * 100) : 0;
  const totalCreditsIssued = creditTransactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);

  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.cityName.toLowerCase().includes(userSearch.toLowerCase())
  );

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustUserId || !adjustReason) return;
    adminAdjustCredits(adjustUserId, Number(adjustAmount), adjustReason);
    alert(`Adjusted ${adjustAmount} credits for user.`);
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
          <span>Exit Admin</span>
        </button>

        <div className="flex items-center gap-1 text-purple-400 font-heading font-extrabold text-sm">
          <ShieldAlert className="w-5 h-5" />
          <span>ADMIN OPERATIONS</span>
        </div>
      </div>

      {/* Analytics KPI Dashboard Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="glass-card p-3 rounded-2xl border border-purple-500/30">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>Total Users</span>
          </div>
          <span className="font-heading font-extrabold text-white text-xl">{totalUsers}</span>
        </div>

        <div className="glass-card p-3 rounded-2xl border border-purple-500/30">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Completion Rate</span>
          </div>
          <span className="font-heading font-extrabold text-cyan-300 text-xl">{completionRate}%</span>
        </div>

        <div className="glass-card p-3 rounded-2xl border border-purple-500/30">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Credits Issued</span>
          </div>
          <span className="font-heading font-extrabold text-amber-300 text-xl">+{totalCreditsIssued}</span>
        </div>

        <div className="glass-card p-3 rounded-2xl border border-purple-500/30">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Flag className="w-3.5 h-3.5 text-red-400" />
            <span>Pending Reports</span>
          </div>
          <span className="font-heading font-extrabold text-red-300 text-xl">
            {reports.filter(r => r.status === 'PENDING').length}
          </span>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center justify-around glass-card rounded-2xl p-1 border border-white/10">
        {[
          { id: 'users', label: 'USERS' },
          { id: 'gigs', label: 'GIGS' },
          { id: 'reports', label: 'REPORTS' },
          { id: 'adjust', label: 'CREDITS' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 py-1.5 rounded-xl text-[11px] font-heading font-bold transition-all ${
              activeTab === t.id
                ? 'bg-purple-500 text-white font-extrabold shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="space-y-3">
          <input
            type="text"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder="Search users by name, email or city..."
            className="w-full bg-[#121826] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500"
          />

          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="glass-card rounded-2xl p-3 border border-white/10 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <img src={user.profileImageUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-white flex items-center gap-1">
                      <span>{user.name}</span>
                      {user.isBlocked && (
                        <span className="bg-red-500/20 text-red-300 text-[9px] px-1 rounded">BLOCKED</span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {user.localityName}, {user.cityName} · Level {user.level}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => adminToggleBlockUser(user.id)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-bold ${
                    user.isBlocked
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}
                >
                  {user.isBlocked ? 'UNBLOCK' : 'BLOCK'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: GIG MODERATION */}
      {activeTab === 'gigs' && (
        <div className="space-y-2">
          {gigs.map((g) => (
            <div
              key={g.id}
              className="glass-card rounded-2xl p-3 border border-white/10 flex items-center justify-between text-xs"
            >
              <div>
                <span className="text-[9px] font-bold text-cyan-400 uppercase">{g.category} · {g.status}</span>
                <h4 className="font-bold text-white line-clamp-1">{g.title}</h4>
                <span className="text-[10px] text-slate-400">Poster: {g.posterName}</span>
              </div>

              {g.status !== 'CANCELLED' && (
                <button
                  onClick={() => adminRemoveGig(g.id, 'Moderation violation')}
                  className="px-2.5 py-1 bg-red-500/20 text-red-300 font-bold rounded-lg text-[10px]"
                >
                  REMOVE
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: SAFETY REPORTS QUEUE */}
      {activeTab === 'reports' && (
        <div className="space-y-2">
          {reports.length === 0 ? (
            <div className="glass-card p-6 text-center text-xs text-slate-400">
              No reported safety issues in moderation queue.
            </div>
          ) : (
            reports.map((rep) => (
              <div key={rep.id} className="glass-card rounded-2xl p-3 border border-red-500/30 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-400">{rep.reason}</span>
                  <span className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">{rep.status}</span>
                </div>
                <p className="text-slate-300">{rep.description}</p>
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => adminResolveReport(rep.id, 'Resolved by admin')}
                    className="py-1 px-3 bg-emerald-500/20 text-emerald-300 font-bold rounded-lg text-[10px]"
                  >
                    RESOLVE
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 4: MANUAL CREDIT ADJUSTMENT */}
      {activeTab === 'adjust' && (
        <form onSubmit={handleAdjustSubmit} className="glass-card rounded-2xl p-4 border border-white/10 space-y-3">
          <h3 className="font-heading font-bold text-white text-sm">
            Manual Credit Audit Adjustment
          </h3>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Target User</label>
            <select
              value={adjustUserId}
              onChange={(e) => setAdjustUserId(e.target.value)}
              className="w-full bg-[#121826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            >
              {allUsers.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.cityName})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Adjustment Amount (+ or -)</label>
            <input
              type="number"
              value={adjustAmount}
              onChange={(e) => setAdjustAmount(Number(e.target.value))}
              className="w-full bg-[#121826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Audit Reason</label>
            <input
              type="text"
              value={adjustReason}
              onChange={(e) => setAdjustReason(e.target.value)}
              className="w-full bg-[#121826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-purple-500 text-white font-heading font-bold text-xs rounded-xl hover:bg-purple-600"
          >
            EXECUTE ADJUSTMENT
          </button>
        </form>
      )}
    </div>
  );
};
