import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { RewardItem } from '../../shared/types/domain';
import { Gift, Zap, CheckCircle2, Ticket, AlertTriangle, ArrowLeft, ShoppingBag } from 'lucide-react';

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
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-[#121826] border border-white/10 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <h1 className="font-heading font-extrabold text-white text-base">
          REWARDS MARKETPLACE
        </h1>
      </div>

      {/* Credit Wallet Balance Hero Header Card */}
      <div className="glass-card rounded-3xl p-5 border border-amber-500/30 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
            YOUR HERO REWARD WALLET
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
            <h2 className="font-heading font-black text-2xl text-white">
              {currentUser.totalCredits} <span className="text-sm font-bold text-amber-300">Credits</span>
            </h2>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 block">Redeemed</span>
          <span className="text-sm font-bold text-slate-200">{redemptions.length} Vouchers</span>
        </div>
      </div>

      {/* Result Toast Banner */}
      {redemptionResult && (
        <div className={`p-4 rounded-2xl text-xs border space-y-1 ${
          redemptionResult.success
            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
            : 'bg-red-500/10 border-red-500/40 text-red-300'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm">
            {redemptionResult.success ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            <span>{redemptionResult.success ? 'Voucher Redeemed!' : 'Redemption Failed'}</span>
          </div>
          <p>{redemptionResult.message}</p>
          {redemptionResult.code && (
            <div className="mt-2 p-2 bg-[#080B12] rounded-xl text-center font-mono font-bold text-amber-300 text-sm border border-amber-500/30">
              VOUCHER CODE: {redemptionResult.code}
            </div>
          )}
        </div>
      )}

      {/* Sub Tabs: Store / My Vouchers */}
      <div className="flex items-center justify-around glass-card rounded-2xl p-1 border border-white/10">
        <button
          onClick={() => setActiveTab('store')}
          className={`flex-1 py-2 rounded-xl text-xs font-heading font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'store'
              ? 'bg-amber-500 text-slate-950 font-extrabold shadow-[0_0_10px_rgba(245,158,11,0.4)]'
              : 'text-slate-400'
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>REWARDS STORE</span>
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`flex-1 py-2 rounded-xl text-xs font-heading font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'wallet'
              ? 'bg-amber-500 text-slate-950 font-extrabold shadow-[0_0_10px_rgba(245,158,11,0.4)]'
              : 'text-slate-400'
          }`}
        >
          <Ticket className="w-3.5 h-3.5" />
          <span>MY PASSES ({redemptions.length})</span>
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
                className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all group flex flex-col"
              >
                <div className="h-32 w-full relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md border border-amber-500/40 px-2.5 py-1 rounded-xl flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-heading font-extrabold text-amber-300 text-xs">
                      {item.creditCost} Credits
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-slate-300 font-semibold">
                    Partner: {item.partnerName}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-heading font-bold text-slate-100 text-base">
                    {item.name}
                  </h3>
                  <p className="text-slate-300 text-xs line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-[11px] text-slate-400">
                      Stock: {item.stock} remaining
                    </span>

                    <button
                      onClick={() => setSelectedReward(item)}
                      disabled={!canAfford || item.stock <= 0}
                      className={`px-4 py-2 rounded-xl text-xs font-heading font-extrabold transition-all ${
                        canAfford && item.stock > 0
                          ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
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
            <div className="glass-card rounded-2xl p-8 text-center space-y-2">
              <Ticket className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="font-heading font-bold text-slate-300">No Vouchers Redeemed Yet</h3>
              <p className="text-xs text-slate-400">
                Complete neighborhood missions to earn Gig Credits and unlock local vouchers!
              </p>
            </div>
          ) : (
            redemptions.map((red) => (
              <div
                key={red.id}
                className="glass-card rounded-2xl p-4 border border-amber-500/30 space-y-2 bg-gradient-to-r from-amber-500/10 to-transparent"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    {red.partnerName}
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                    ACTIVE PASS
                  </span>
                </div>

                <h4 className="font-heading font-bold text-white text-sm">
                  {red.rewardName}
                </h4>

                <div className="bg-[#080B12] p-3 rounded-xl border border-white/10 text-center font-mono font-bold text-amber-300 text-base tracking-wider">
                  {red.redemptionCode}
                </div>

                <p className="text-[11px] text-slate-400 text-center">
                  Show code to cashier at checkout. Redeemed on {new Date(red.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Confirm Redemption Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-sm w-full rounded-3xl p-5 border border-amber-500/40 space-y-4">
            <h3 className="font-heading font-extrabold text-white text-lg text-center">
              Confirm Reward Redemption
            </h3>

            <div className="text-center space-y-1">
              <h4 className="font-bold text-amber-300 text-sm">{selectedReward.name}</h4>
              <p className="text-xs text-slate-300">{selectedReward.description}</p>
            </div>

            <div className="bg-[#080B12] p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400">Deduct Credits:</span>
              <span className="font-bold text-amber-400">-{selectedReward.creditCost} Credits</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedReward(null)}
                className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
              >
                CANCEL
              </button>
              <button
                onClick={handleRedeemConfirm}
                className="flex-1 py-2.5 bg-amber-400 text-slate-950 font-heading font-extrabold text-xs rounded-xl hover:bg-amber-300"
              >
                CONFIRM & REDEEM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
