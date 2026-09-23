import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, ShieldCheck, Zap, Copy, Store, Calendar, ExternalLink } from 'lucide-react';
import { Redemption } from '../types/domain';
import { soundService } from '../../core/services/soundService';

interface QrPassModalProps {
  redemption: Redemption | null;
  onClose: () => void;
}

export const QrPassModal: React.FC<QrPassModalProps> = ({ redemption, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isMarkedUsed, setIsMarkedUsed] = useState(false);

  if (!redemption) return null;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(redemption.redemptionCode);
    soundService.playClickSound();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleMarkAsUsed = () => {
    soundService.playCreditSound();
    setIsMarkedUsed(true);
  };

  // Generate SVG QR Matrix Data
  const qrCells = Array.from({ length: 81 }, (_, i) => {
    const row = Math.floor(i / 9);
    const col = i % 9;
    // Corner finder patterns
    const isCorner1 = row < 3 && col < 3;
    const isCorner2 = row < 3 && col > 5;
    const isCorner3 = row > 5 && col < 3;
    const isData = (row * 3 + col * 7 + redemption.redemptionCode.length) % 2 === 0;
    return isCorner1 || isCorner2 || isCorner3 || isData;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-fnsm">
      <div className="relative w-full max-w-sm bg-[#05070D] border-2 border-amber-500/60 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.3)]">
        
        {/* HEADER PASS CARD */}
        <div className="p-4 bg-gradient-to-r from-amber-600/30 via-yellow-500/20 to-[#05070D] border-b border-amber-500/30 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 px-3 py-0.5 rounded-full text-[10px] font-orbitron font-extrabold text-amber-300 uppercase tracking-widest mb-1 shadow-inner">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>NEIGHBORHOOD HERO OFFICIAL PASS</span>
          </div>

          <h3 className="font-orbitron font-black text-white text-base tracking-wider uppercase truncate px-4">
            {redemption.rewardName}
          </h3>

          <p className="text-xs text-amber-300/90 font-mono flex items-center justify-center gap-1 mt-0.5">
            <Store className="w-3.5 h-3.5 text-amber-400" />
            <span>Merchant: <strong>{redemption.partnerName}</strong></span>
          </p>
        </div>

        {/* SCANNABLE QR MATRIX CONTAINER */}
        <div className="p-5 space-y-4 text-center">
          
          <div className="relative bg-white p-4 rounded-2xl border-4 border-amber-500/40 inline-block shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            
            {/* SVG 9x9 QR GRID */}
            <div className="grid grid-cols-9 gap-1 w-44 h-44 bg-white p-1">
              {qrCells.map((fill, idx) => (
                <div
                  key={idx}
                  className={`rounded-xs transition-colors ${
                    fill ? 'bg-slate-950' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            {/* STAMPED VERIFIED BADGE OVERLAY IF USED */}
            {(isMarkedUsed || redemption.status === 'USED') && (
              <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center p-3 animate-fade-in border-4 border-emerald-400">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce mb-1" />
                <span className="font-orbitron font-black text-emerald-300 text-xs uppercase tracking-widest text-center">
                  VOUCHER VERIFIED & STAMPED AT COUNTER
                </span>
                <span className="text-[9px] text-emerald-200 font-mono mt-1">
                  Redeemed on {new Date().toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* BARCODE VISUALIZER */}
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-0.5 h-8 opacity-85">
              {[3,1,2,4,1,3,2,1,4,2,1,3,2,4,1,2,3,1,4,2].map((w, i) => (
                <div key={i} className={`bg-amber-400 h-full`} style={{ width: `${w * 2}px` }} />
              ))}
            </div>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest block">
              SERIAL: 8842-7719-2026-FNSM
            </span>
          </div>

          {/* VOUCHER CODE DISPLAY BOX */}
          <div className="p-3 bg-[#05070D] rounded-xl border border-amber-500/50 flex items-center justify-between text-xs font-mono">
            <div className="text-left">
              <span className="text-[9px] text-slate-400 block font-bold">VOUCHER CODE</span>
              <span className="font-bold text-amber-300 text-sm tracking-widest">
                {redemption.redemptionCode}
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-orbitron font-bold text-[10px] border border-amber-400/40 flex items-center gap-1 transition-all"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{isCopied ? 'COPIED!' : 'COPY'}</span>
            </button>
          </div>

          {/* COUNTER INSTRUCTIONS */}
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 leading-relaxed text-left space-y-1 font-sans">
            <span className="font-orbitron font-bold text-amber-300 text-[10px] uppercase block">
              📍 REDEMPTION INSTRUCTIONS
            </span>
            <p>
              Present this QR code or 12-digit code to the cashier at <strong>{redemption.partnerName}</strong> in Sunny Enclave / Sector 125 to claim your offer.
            </p>
          </div>

          {/* STAMP AT COUNTER ACTION BUTTON */}
          {!isMarkedUsed && redemption.status !== 'USED' && (
            <button
              onClick={handleMarkAsUsed}
              className="w-full py-3 px-4 rounded-xl font-orbitron font-extrabold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 uppercase tracking-wider active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>STAMP & MARK AS REDEEMED AT COUNTER</span>
            </button>
          )}

        </div>

        {/* FOOTER */}
        <div className="p-3 bg-[#05070D] border-t border-amber-500/20 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-orbitron font-bold text-slate-300 uppercase tracking-wider transition-all"
          >
            CLOSE VOUCHER PASS
          </button>
        </div>

      </div>
    </div>
  );
};
