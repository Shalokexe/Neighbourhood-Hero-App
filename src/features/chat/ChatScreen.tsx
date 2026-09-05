import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { Send, MessageSquare, ArrowLeft, ShieldCheck, Radio, Zap } from 'lucide-react';

interface ChatScreenProps {
  gigId?: string;
  onBack: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ gigId, onBack }) => {
  const { 
    currentUser, 
    gigs, 
    conversations, 
    sendMessage, 
    getMessagesForConversation 
  } = useApp();

  const [activeGigId, setActiveGigId] = useState<string | undefined>(
    gigId || (conversations[0]?.gigId) || (gigs[0]?.id)
  );

  const [inputMsg, setInputMsg] = useState('');

  const activeGig = gigs.find(g => g.id === activeGigId);
  const activeConv = conversations.find(c => c.gigId === activeGigId);
  const activeMessages = activeConv ? getMessagesForConversation(activeConv.id) : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !activeGigId) return;
    sendMessage(activeGigId, inputMsg.trim());
    setInputMsg('');
  };

  const sendQuickReply = (text: string) => {
    if (!activeGigId) return;
    sendMessage(activeGigId, text);
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4 font-fnsm text-slate-100">
      {/* Top Header Bar */}
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
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            HERO ENCRYPTED COMMS
          </h1>
          <p className="text-[10px] text-cyan-400 font-bold tracking-wider font-orbitron">
            SECURE SPIDEY FEED CHANNEL
          </p>
        </div>
      </div>

      {/* Conversations Selector Bar if multiple exist */}
      {conversations.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {conversations.map((c) => {
            const isSelected = c.gigId === activeGigId;
            return (
              <button
                key={c.id}
                onClick={() => setActiveGigId(c.gigId)}
                className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-extrabold whitespace-nowrap transition-all border uppercase ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                    : 'bg-[#05070D]/90 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-200'
                }`}
              >
                {c.gigTitle}
              </button>
            );
          })}
        </div>
      )}

      {/* Active Conversation Details Banner */}
      {activeGig && (
        <div className="fnsm-app-container rounded-xl p-3 border border-cyan-500/30 flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] font-orbitron font-black text-cyan-400 uppercase tracking-widest">
              {activeGig.category}
            </span>
            <h3 className="font-orbitron font-bold text-white text-xs line-clamp-1">
              {activeGig.title}
            </h3>
          </div>
          <span className="text-xs font-orbitron font-extrabold text-amber-300 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/30 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
            +{activeGig.creditReward} ⬡
          </span>
        </div>
      )}

      {/* Messages Window Container */}
      <div className="fnsm-app-container rounded-2xl p-4 border border-cyan-500/30 h-[380px] flex flex-col justify-between overflow-hidden shadow-[0_0_20px_rgba(0,229,255,0.1)]">
        {activeMessages.length === 0 ? (
          <div className="my-auto text-center space-y-2">
            <MessageSquare className="w-8 h-8 text-cyan-400/40 mx-auto" />
            <p className="text-xs text-slate-400 font-orbitron">
              NO TRANSMISSIONS YET IN THIS HERO FREQUENCY.
            </p>
          </div>
        ) : (
          <div className="overflow-y-auto space-y-3 pr-1 scrollbar-thin">
            {activeMessages.map((msg) => {
              const isMine = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] font-orbitron font-bold text-cyan-400/80 px-1 mb-0.5 uppercase tracking-wider">
                    {msg.senderName}
                  </span>
                  <div
                    className={`max-w-[80%] rounded-xl px-3.5 py-2 text-xs leading-relaxed font-fnsm ${
                      isMine
                        ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                        : 'bg-[#05070D] text-slate-100 border border-slate-700 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="pt-2.5 border-t border-cyan-500/20 space-y-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              "En route to objective! 🕸️",
              "Arrived at signal location 📍",
              "Mission accomplished! ⚡"
            ].map((quick) => (
              <button
                key={quick}
                onClick={() => sendQuickReply(quick)}
                className="text-[10px] font-orbitron font-bold bg-[#05070D] hover:bg-cyan-500/20 text-cyan-300 px-2.5 py-1 rounded-lg whitespace-nowrap border border-cyan-500/30 transition-colors"
              >
                {quick}
              </button>
            ))}
          </div>

          {/* Send Input Bar */}
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Transmit encrypted message..."
              className="flex-1 bg-[#05070D] border border-cyan-500/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-fnsm"
            />
            <button
              type="submit"
              className="p-2 bg-cyan-500 text-slate-950 rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_10px_rgba(0,229,255,0.4)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

