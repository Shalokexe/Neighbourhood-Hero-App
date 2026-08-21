import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { CITIES_SEED, LOCALITIES_SEED } from '../../core/config/citiesData';
import { Smartphone, Mail, ShieldCheck, ArrowRight, X, CheckCircle2 } from 'lucide-react';

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
      <div className="glass-card max-w-sm w-full rounded-3xl p-5 border border-white/20 shadow-2xl space-y-4 relative overflow-hidden bg-black text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-2xl bg-white text-black font-black flex items-center justify-center mx-auto text-lg">
            ⚡
          </div>
          <h3 className="font-heading font-extrabold text-white text-lg">
            {step === 'ONBOARDING' ? 'COMPLETE YOUR HERO PROFILE' : 'NEIGHBORHOOD HERO LOGIN'}
          </h3>
          <p className="text-xs text-slate-400">
            {step === 'INPUT' && 'Enter your mobile number for fast 1-tap OTP authentication.'}
            {step === 'OTP' && `Sent 4-digit verification code to ${phoneInput}`}
            {step === 'ONBOARDING' && 'Set up your hero identity for Kharar, Mohali, Chandigarh & Panchkula.'}
          </p>
        </div>

        {/* STEP 1: PHONE / EMAIL INPUT */}
        {step === 'INPUT' && (
          <form onSubmit={handleSendOtp} className="space-y-3">
            <div className="flex items-center justify-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setAuthMode('PHONE')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  authMode === 'PHONE' ? 'bg-white text-black' : 'text-slate-400'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Phone OTP</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('EMAIL')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  authMode === 'EMAIL' ? 'bg-white text-black' : 'text-slate-400'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>
            </div>

            {authMode === 'PHONE' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-heading font-extrabold text-xs rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>SEND OTP CODE</span>
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
              className="w-48 bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-center text-lg font-mono font-bold tracking-widest text-white mx-auto focus:outline-none focus:border-white"
            />
            <p className="text-[11px] text-slate-400">Demo OTP Code: Enter any 4 digits</p>

            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-heading font-extrabold text-xs rounded-xl hover:bg-slate-200 transition-colors"
            >
              VERIFY & CONTINUE →
            </button>
          </form>
        )}

        {/* STEP 3: ONBOARDING PROFILE */}
        {step === 'ONBOARDING' && (
          <form onSubmit={handleCompleteOnboarding} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Bio</label>
              <textarea
                rows={2}
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                placeholder="Tell neighbors how you can help..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-heading font-extrabold text-xs rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>SAVE PROFILE & LAUNCH</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
