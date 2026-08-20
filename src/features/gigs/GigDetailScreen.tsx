import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { Gig } from '../../shared/types/domain';
import { CATEGORY_ICONS } from '../../core/config/levelConfig';
import { formatApproximateLocation } from '../../core/services/geoService';
import { 
  ArrowLeft, MapPin, Clock, Zap, Star, Shield, MessageSquare, 
  CheckCircle2, AlertTriangle, User, Flag, Lock, Sparkles 
} from 'lucide-react';
import * as Icons from 'lucide-react';

interface GigDetailScreenProps {
  gig: Gig;
  onBack: () => void;
  onOpenChat: (gigId: string) => void;
}

export const GigDetailScreen: React.FC<GigDetailScreenProps> = ({
  gig,
  onBack,
  onOpenChat
}) => {
  const { 
    currentUser, 
    acceptGig, 
    markGigCompleted, 
    confirmGigCompletion, 
    cancelGig,
    submitReport 
  } = useApp();

  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('Inappropriate Task');
  const [reportDesc, setReportDesc] = useState('');
  const [statusFeedback, setStatusFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const catConfig = CATEGORY_ICONS[gig.category] || CATEGORY_ICONS['Other'];
  const IconComponent = (Icons as any)[catConfig.icon] || Icons.Layers;

  const isPoster = currentUser.id === gig.posterId;
  const isHelper = currentUser.id === gig.acceptedBy;
  const isAcceptedOrBeyond = gig.status !== 'OPEN';

  const handleAccept = () => {
    const res = acceptGig(gig.id);
    if (res.success) {
      setStatusFeedback({ type: 'success', msg: res.message });
    } else {
      setStatusFeedback({ type: 'error', msg: res.message });
    }
  };

  const handleMarkCompleted = () => {
    markGigCompleted(gig.id);
    setStatusFeedback({ type: 'success', msg: 'Mission marked as completed! Waiting for poster confirmation.' });
  };

  const handleConfirmCompletionSubmit = () => {
    const res = confirmGigCompletion(gig.id, ratingInput, commentInput);
    if (res.success) {
      setShowConfirmModal(false);
      setStatusFeedback({ type: 'success', msg: `Completion confirmed! Awarded +${res.awardedCredits} Gig Credits to helper!` });
    }
  };

  const handleReportSubmit = () => {
    submitReport(gig.posterId, gig.id, reportReason, reportDesc);
    setShowReportModal(false);
    setStatusFeedback({ type: 'success', msg: 'Safety report submitted to admin moderation.' });
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-[#121826] border border-white/10 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={() => setShowReportModal(true)}
          className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1"
        >
          <Flag className="w-3.5 h-3.5" />
          <span>Report</span>
        </button>
      </div>

      {/* Feedback Toast Banner */}
      {statusFeedback && (
        <div className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
          statusFeedback.type === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-red-500/10 border-red-500/30 text-red-300'
        }`}>
          {statusFeedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusFeedback.msg}</span>
        </div>
      )}

      {/* Main Gig Details Glass Card */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4 relative overflow-hidden">
        {/* Category Badge Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10"
              style={{ backgroundColor: catConfig.bg, color: catConfig.color }}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {gig.category}
            </span>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-heading font-extrabold text-amber-300 text-sm">
              +{gig.creditReward} CREDITS
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-heading font-extrabold text-white text-xl leading-snug">
          {gig.title}
        </h1>

        {/* Full Description */}
        <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-line">
          {gig.description}
        </p>

        {/* Privacy & Location Box */}
        <div className="bg-[#080B12]/80 border border-white/10 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
              Locality
            </span>
            <span className="font-semibold text-slate-200">
              {gig.localityName}, {gig.cityName}
            </span>
          </div>

          {/* Privacy masking check */}
          <div className="text-[11px] flex items-center gap-1.5 pt-1 border-t border-white/5">
            {isAcceptedOrBeyond || isPoster ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Exact Details: {gig.exactAddress || gig.approxAddress}
              </span>
            ) : (
              <span className="text-slate-400 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Exact address unlocked after accepting mission.
              </span>
            )}
          </div>
        </div>

        {/* Meta Info Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center">
          <div className="bg-slate-800/40 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Duration</span>
            <span className="text-xs font-bold text-slate-200">{gig.estimatedDuration}</span>
          </div>

          <div className="bg-slate-800/40 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Urgency</span>
            <span className="text-xs font-bold text-cyan-400">{gig.urgency}</span>
          </div>

          <div className="bg-slate-800/40 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Cash Budget</span>
            <span className="text-xs font-bold text-emerald-400">{gig.budget ? `₹${gig.budget}` : 'None'}</span>
          </div>
        </div>
      </div>

      {/* Poster Profile Section */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={gig.posterAvatar} 
            alt={gig.posterName}
            className="w-11 h-11 rounded-full object-cover border border-[#00E5FF]/40"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-heading font-bold text-slate-100 text-sm">
                {gig.posterName}
              </h3>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded">
                POSTER
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                <Star className="w-3 h-3 fill-amber-400" />
                {gig.posterRating}
              </span>
              <span>·</span>
              <span>{gig.posterGigCount} Gigs Posted</span>
            </div>
          </div>
        </div>

        {/* Message Poster Trigger */}
        <button
          onClick={() => onOpenChat(gig.id)}
          className="p-2.5 bg-slate-800 hover:bg-slate-700 text-[#00E5FF] rounded-xl flex items-center justify-center border border-white/10"
          title="Open Conversation"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>

      {/* Action CTA State Machine Section */}
      <div className="space-y-2 pt-2">
        {gig.status === 'OPEN' && !isPoster && (
          <button
            onClick={handleAccept}
            className="w-full py-4 bg-gradient-to-r from-[#00E5FF] to-[#2563EB] text-slate-950 font-heading font-extrabold rounded-2xl text-base shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 fill-slate-950" />
            <span>ACCEPT THIS MISSION</span>
          </button>
        )}

        {gig.status === 'OPEN' && isPoster && (
          <div className="p-3 bg-slate-800/60 border border-slate-700 text-center rounded-xl text-xs text-slate-400">
            You posted this mission. Waiting for a nearby hero to accept!
          </div>
        )}

        {gig.status === 'ACCEPTED' && isHelper && (
          <div className="space-y-2">
            <button
              onClick={() => onOpenChat(gig.id)}
              className="w-full py-3 bg-[#00E5FF] text-slate-950 font-heading font-bold rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              COORDINATE VIA CHAT
            </button>
            <button
              onClick={handleMarkCompleted}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-heading font-extrabold rounded-xl text-sm flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              MARK AS COMPLETED
            </button>
          </div>
        )}

        {gig.status === 'COMPLETED' && isPoster && (
          <button
            onClick={() => setShowConfirmModal(true)}
            className="w-full py-4 bg-gradient-to-r from-[#00E5FF] via-emerald-400 to-teal-400 text-slate-950 font-heading font-extrabold rounded-2xl text-sm shadow-[0_0_25px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            CONFIRM COMPLETION & AWARD CREDITS
          </button>
        )}

        {gig.status === 'REVIEWED' && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-heading font-bold text-center rounded-2xl flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            MISSION COMPLETE — CREDITS AWARDED!
          </div>
        )}
      </div>

      {/* Confirm Completion Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-sm w-full rounded-3xl p-5 border border-white/10 space-y-4">
            <h3 className="font-heading font-extrabold text-white text-lg text-center">
              Confirm Mission Completion
            </h3>
            <p className="text-xs text-slate-300 text-center">
              Rate your helper's work to release their Gig Credits + bonuses!
            </p>

            {/* Star Rating Input */}
            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingInput(star)}
                  className="p-1 focus:outline-none transition-transform hover:scale-125"
                >
                  <Star className={`w-8 h-8 ${
                    star <= ratingInput 
                      ? 'text-amber-400 fill-amber-400' 
                      : 'text-slate-600'
                  }`} />
                </button>
              ))}
            </div>

            <textarea
              rows={2}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Optional thank you message or review comment..."
              className="w-full bg-[#121826] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
            />

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
              >
                CANCEL
              </button>
              <button
                onClick={handleConfirmCompletionSubmit}
                className="flex-1 py-2.5 bg-[#00E5FF] text-slate-950 font-heading font-extrabold text-xs rounded-xl hover:bg-[#00B0FF]"
              >
                RELEASE CREDITS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Safety Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-sm w-full rounded-3xl p-5 border border-red-500/30 space-y-3">
            <h3 className="font-heading font-bold text-red-400 text-base flex items-center gap-2">
              <Flag className="w-5 h-5" />
              Report Safety / Abuse Issue
            </h3>

            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full bg-[#121826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="Inappropriate Task">Inappropriate Task</option>
              <option value="Prohibited Items or Illegal Request">Prohibited Items or Illegal Request</option>
              <option value="Spam or Fake Gig">Spam or Fake Gig</option>
              <option value="Abusive Language">Abusive Language</option>
              <option value="Unsafe Location">Unsafe Location</option>
            </select>

            <textarea
              rows={3}
              value={reportDesc}
              onChange={(e) => setReportDesc(e.target.value)}
              placeholder="Provide details for admin investigation..."
              className="w-full bg-[#121826] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500"
            />

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
              >
                CANCEL
              </button>
              <button
                onClick={handleReportSubmit}
                className="flex-1 py-2 bg-red-500 text-white text-xs font-bold rounded-xl"
              >
                SUBMIT REPORT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
