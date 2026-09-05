import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { Smartphone, Mail, ArrowRight, X, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { updateUserProfile, currentUser } = useApp();
  const [authMode, setAuthMode] = useState<'PHONE' | 'EMAIL'>('PHONE');
  const [step, setStep] = useState<'INPUT' | 'OTP' | 'ONBOARDING'>('INPUT');

  const [phoneInput, setPhoneInput] = useState('+91 98765 43210');
  const [otpInput, setOtpInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  const [nameInput, setNameInput] = useState(currentUser.name);
  const [bioInput, setBioInput] = useState(currentUser.bio || '');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'PHONE' && !phoneInput.trim()) return;
    setStep('OTP');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('ONBOARDING');
  };

  const handleCompleteOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: nameInput,
      phone: phoneInput,
      email: emailInput || currentUser.email,
      bio: bioInput
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="fnsm-app-container max-w-sm w-full rounded-2xl p-5 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,229,255,0.2)] space-y-4 relative overflow-hidden text-white font-fnsm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-cyan-400/70 hover:text-cyan-300 transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-[#05070D] border border-cyan-400 text-cyan-300 font-orbitron font-black flex items-center justify-center mx-auto text-lg shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            🕷️
          </div>
          <h3 className="font-orbitron font-extrabold text-white text-base tracking-wider uppercase">
            {step === 'ONBOARDING' ? 'CONFIGURE SPIDEY DOSSIER' : 'FNSM HERO AUTHENTICATION'}
          </h3>
          <p className="text-[11px] text-cyan-400 font-orbitron font-bold tracking-wider">
            {step === 'INPUT' && 'SELECT LOGIN FREQUENCY FOR 1-TAP VERIFICATION'}
            {step === 'OTP' && `SECURITY OTP TRANSMITTED TO ${phoneInput}`}
            {step === 'ONBOARDING' && 'SET UP HERO IDENTITY FOR TRICITY DISPATCH NETWORK'}
          </p>
        </div>

        {/* STEP 1: PHONE / EMAIL INPUT */}
        {step === 'INPUT' && (
          <form onSubmit={handleSendOtp} className="space-y-3">
            <div className="flex items-center justify-center gap-1.5 bg-[#05070D] p-1 rounded-xl border border-cyan-500/30">
              <button
                type="button"
                onClick={() => setAuthMode('PHONE')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-orbitron font-bold transition-all flex items-center justify-center gap-1 uppercase ${
                  authMode === 'PHONE' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,229,255,0.4)]' : 'text-slate-400'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>PHONE OTP</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('EMAIL')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-orbitron font-bold transition-all flex items-center justify-center gap-1 uppercase ${
                  authMode === 'EMAIL' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,229,255,0.4)]' : 'text-slate-400'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>EMAIL CHANNEL</span>
              </button>
            </div>

            {authMode === 'PHONE' ? (
              <div>
                <label className="block text-xs font-orbitron font-extrabold text-cyan-300 mb-1 uppercase tracking-wider">MOBILE FREQUENCY</label>
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#05070D] border border-cyan-500/30 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-fnsm"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-orbitron font-extrabold text-cyan-300 mb-1 uppercase tracking-wider">EMAIL ADDRESS</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="hero@fnsm-network.com"
                  className="w-full bg-[#05070D] border border-cyan-500/30 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-fnsm"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 text-slate-950 font-orbitron font-black text-xs rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-1.5 uppercase tracking-widest shadow-[0_0_15px_rgba(0,229,255,0.4)]"
            >
              <span>TRANSMIT OTP CODE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === 'OTP' && (
          <form onSubmit={handleVerifyOtp} className="space-y-3 text-center">
            <input
              type="text"
              maxLength={4}
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              placeholder="4 2 8 0"
              className="w-48 bg-[#05070D] border border-cyan-500/40 rounded-xl px-4 py-3 text-center text-lg font-mono font-bold tracking-widest text-cyan-300 mx-auto focus:outline-none focus:border-cyan-400 shadow-inner"
            />
            <p className="text-[11px] text-slate-400 font-orbitron">TEST SIGNAL CODE: ENTER ANY 4 DIGITS</p>

            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 text-slate-950 font-orbitron font-black text-xs rounded-xl hover:bg-cyan-400 transition-all uppercase tracking-widest shadow-[0_0_15px_rgba(0,229,255,0.4)]"
            >
              AUTHENTICATE SIGNAL →
            </button>
          </form>
        )}

        {/* STEP 3: ONBOARDING PROFILE */}
        {step === 'ONBOARDING' && (
          <form onSubmit={handleCompleteOnboarding} className="space-y-3">
            <div>
              <label className="block text-xs font-orbitron font-extrabold text-cyan-300 mb-1 uppercase tracking-wider">HERO FULL NAME</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full bg-[#05070D] border border-cyan-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-fnsm"
              />
            </div>

            <div>
              <label className="block text-xs font-orbitron font-extrabold text-cyan-300 mb-1 uppercase tracking-wider">HERO BIO & SPECIALTIES</label>
              <textarea
                rows={2}
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                placeholder="Specify your skills and assistance capability..."
                className="w-full bg-[#05070D] border border-cyan-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-fnsm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 text-slate-950 font-orbitron font-black text-xs rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-1.5 uppercase tracking-widest shadow-[0_0_15px_rgba(0,229,255,0.4)]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>INITIALIZE DOSSIER & LAUNCH</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

