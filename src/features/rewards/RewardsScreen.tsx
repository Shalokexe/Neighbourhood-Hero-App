import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { RewardItem } from '../../shared/types/domain';
import { Gift, Zap, CheckCircle2, Ticket, AlertTriangle, ArrowLeft, Hexagon } from 'lucide-react';

interface RewardsScreenProps {
  onBack: () => void;
}

export const RewardsScreen: React.FC<RewardsScreenProps> = ({ onBack }) => {
  const { currentUser, rewards, redemptions, redeemReward } = useApp();
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [redemptionResult, setRedemptionResult] = useState<{ success: boolean; message: string; code?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'store' | 'wallet'>('store');

  const handleRedeemConfirm = () => {
    if (!selectedReward) return;
    const res = redeemReward(selectedReward.id);
    setRedemptionResult(res);
    if (res.success) {
      setSelectedReward(null);
    }
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4 font-fnsm text-slate-100">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-3 py-1.5 rounded-lg bg-[#0B1120]/80 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:text-white flex items-center gap-1.5 text-xs font-bold font-orbitron transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ⓛ1 BACK</span>
        </button>

        <div className="text-right">
          <h1 className="font-orbitron font-extrabold text-white text-base tracking-widest uppercase flex items-center gap-1.5 justify-end">
            <Hexagon className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
            TECH REWARDS WAREHOUSE
          </h1>
          <p className="text-[10px] text-cyan-400 font-bold tracking-wider">
            FNSM LOCAL VOUCHERS & EQUIPMENT
          </p>
        </div>
      </div>

      {/* Credit Wallet Balance Hero Header Card */}
      <div className="fnsm-app-container rounded-2xl p-5 border border-amber-500/40 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent flex items-center justify-between shadow-[0_0_20px_rgba(245,158,11,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 font-orbitron flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            HERO REWARD BALANCE
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <h2 className="font-orbitron font-black text-3xl text-white tracking-wider">
              {currentUser.totalCredits}
            </h2>
            <span className="text-xs font-bold text-amber-300 font-orbitron uppercase tracking-widest">
              ⬡ CREDITS
            </span>
          </div>
        </div>

        <div className="text-right bg-[#05070D]/80 px-3 py-2 rounded-xl border border-amber-500/30">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">UNLOCKED PASSES</span>
          <span className="text-sm font-extrabold text-amber-400 font-orbitron">{redemptions.length} VOUCHERS</span>
        </div>
      </div>

      {/* Result Toast Banner */}
      {redemptionResult && (
        <div className={`p-4 rounded-xl text-xs border space-y-1 font-fnsm ${
          redemptionResult.success
            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
            : 'bg-red-500/10 border-red-500/50 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
        }`}>
          <div className="flex items-center gap-2 font-orbitron font-bold text-sm">
            {redemptionResult.success ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            <span>{redemptionResult.success ? 'VOUCHER REDEEMED SUCCESSFULLY!' : 'REDEMPTION FAILED'}</span>
          </div>
          <p className="text-xs">{redemptionResult.message}</p>
          {redemptionResult.code && (
            <div className="mt-2 p-2 bg-[#05070D] rounded-lg text-center font-mono font-bold text-amber-300 text-sm border border-amber-500/40 tracking-widest">
              VOUCHER CODE: {redemptionResult.code}
            </div>
          )}
        </div>
      )}

      {/* Sub Tabs: Store / My Vouchers */}
      <div className="flex items-center justify-around bg-[#05070D]/90 p-1.5 rounded-xl border border-cyan-500/30 gap-2">
        <button
          onClick={() => setActiveTab('store')}
          className={`flex-1 py-2 text-xs font-orbitron font-extrabold transition-all flex items-center justify-center gap-1.5 uppercase ${
            activeTab === 'store'
              ? 'fnsm-tab-active bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.4)]'
              : 'text-slate-400 hover:text-cyan-400'
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>REWARDS WAREHOUSE</span>
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`flex-1 py-2 text-xs font-orbitron font-extrabold transition-all flex items-center justify-center gap-1.5 uppercase ${
            activeTab === 'wallet'
              ? 'fnsm-tab-active bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.4)]'
              : 'text-slate-400 hover:text-cyan-400'
          }`}
        >
          <Ticket className="w-3.5 h-3.5" />
          <span>MY ACTIVE PASSES ({redemptions.length})</span>
        </button>
      </div>

      {/* TAB 1: REWARDS CATALOG */}
      {activeTab === 'store' && (
        <div className="space-y-3">
          {rewards.map((item) => {
            const canAfford = currentUser.totalCredits >= item.creditCost;
            return (
              <div
                key={item.id}
                className="fnsm-app-container rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/60 transition-all group flex flex-col"
              >
                <div className="h-32 w-full relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-transparent" />
                  
                  <div className="absolute top-2 right-2 bg-[#05070D]/90 backdrop-blur-md border border-amber-500/50 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                    <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-orbitron font-extrabold text-amber-300 text-xs tracking-wider">
                      {item.creditCost} ⬡ CREDITS
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2 bg-[#05070D]/90 backdrop-blur-md border border-cyan-500/30 px-2 py-0.5 rounded text-[10px] text-cyan-300 font-orbitron font-bold">
                    PARTNER: {item.partnerName.toUpperCase()}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-orbitron font-bold text-white text-base tracking-wide">
                    {item.name}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-cyan-500/20">
                    <span className="text-[11px] font-bold text-slate-400 font-orbitron">
                      STOCK: {item.stock} REMAINING
                    </span>

                    <button
                      onClick={() => setSelectedReward(item)}
                      disabled={!canAfford || item.stock <= 0}
                      className={`px-4 py-2 rounded-lg text-xs font-orbitron font-extrabold transition-all uppercase tracking-wider ${
                        canAfford && item.stock > 0
                          ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                          : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                      }`}
                    >
                      {item.stock <= 0 ? 'OUT OF STOCK' : canAfford ? 'REDEEM VOUCHER' : 'NEED MORE CREDITS'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: MY REDEEMED VOUCHERS WALLET */}
      {activeTab === 'wallet' && (
        <div className="space-y-3">
          {redemptions.length === 0 ? (
            <div className="fnsm-app-container rounded-2xl p-8 text-center space-y-2 border border-slate-700">
              <Ticket className="w-10 h-10 text-cyan-400/50 mx-auto" />
              <h3 className="font-orbitron font-bold text-slate-200">NO PASSES UNLOCKED YET</h3>
              <p className="text-xs text-slate-400">
                Complete neighborhood activities to earn credits and claim local tech passes!
              </p>
            </div>
          ) : (
            redemptions.map((red) => (
              <div
                key={red.id}
                className="fnsm-app-container rounded-2xl p-4 border border-amber-500/40 space-y-2 bg-gradient-to-r from-amber-500/10 to-transparent shadow-[0_0_15px_rgba(245,158,11,0.1)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-orbitron font-extrabold text-amber-400 uppercase tracking-widest">
                    {red.partnerName}
                  </span>
                  <span className="text-[10px] font-orbitron bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded border border-emerald-500/30">
                    ACTIVE SPIDEY PASS
                  </span>
                </div>

                <h4 className="font-orbitron font-bold text-white text-sm">
                  {red.rewardName}
                </h4>

                <div className="bg-[#05070D] p-3 rounded-xl border border-amber-500/40 text-center font-mono font-bold text-amber-300 text-base tracking-widest shadow-inner">
                  {red.redemptionCode}
                </div>

                <p className="text-[11px] text-slate-400 text-center font-fnsm">
                  Show code to merchant at checkout. Claimed on {new Date(red.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Confirm Redemption Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="fnsm-app-container max-w-sm w-full rounded-2xl p-5 border border-amber-500/50 space-y-4 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
            <h3 className="font-orbitron font-extrabold text-white text-lg text-center tracking-wider uppercase">
              CONFIRM VOUCHER UNLOCK
            </h3>

            <div className="text-center space-y-1">
              <h4 className="font-orbitron font-bold text-amber-300 text-sm">{selectedReward.name}</h4>
              <p className="text-xs text-slate-300">{selectedReward.description}</p>
            </div>

            <div className="bg-[#05070D] p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs font-orbitron">
              <span className="text-slate-400 font-bold">DEDUCT CREDITS:</span>
              <span className="font-extrabold text-amber-400">-{selectedReward.creditCost} ⬡ CREDITS</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedReward(null)}
                className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-orbitron font-bold text-xs rounded-xl hover:bg-slate-700 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleRedeemConfirm}
                className="flex-1 py-2.5 bg-amber-400 text-slate-950 font-orbitron font-extrabold text-xs rounded-xl hover:bg-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] uppercase tracking-wider"
              >
                CONFIRM & CLAIM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
