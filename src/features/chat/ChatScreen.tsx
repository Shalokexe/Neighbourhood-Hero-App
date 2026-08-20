import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { Send, MessageSquare, ArrowLeft, ShieldCheck, User } from 'lucide-react';

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
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-[#121826] border border-white/10 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <h1 className="font-heading font-extrabold text-white text-base">
          MISSION COORDINATION CHAT
        </h1>
      </div>

      {/* Conversations Selector Bar if multiple exist */}
      {conversations.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {conversations.map((c) => {
            const isSelected = c.gigId === activeGigId;
            return (
              <button
                key={c.id}
                onClick={() => setActiveGigId(c.gigId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-[#00E5FF] text-slate-950 font-bold border-[#00E5FF]'
                    : 'bg-[#121826] text-slate-400 border-white/10 hover:border-slate-600'
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
        <div className="glass-card rounded-2xl p-3 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-wider">
              {activeGig.category}
            </span>
            <h3 className="font-heading font-bold text-white text-xs line-clamp-1">
              {activeGig.title}
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            +{activeGig.creditReward} CREDITS
          </span>
        </div>
      )}

      {/* Messages Window Container */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 h-[380px] flex flex-col justify-between overflow-hidden">
        {activeMessages.length === 0 ? (
          <div className="my-auto text-center space-y-2">
            <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">
              No messages yet in this mission thread.
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
                  <span className="text-[10px] text-slate-500 px-1 mb-0.5">
                    {msg.senderName}
                  </span>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                      isMine
                        ? 'bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-800/80 text-slate-100 border border-white/10 rounded-tl-none'
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
        <div className="pt-2 border-t border-white/5 space-y-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              "I'm on my way! 🚀",
              "Arrived at the location 📍",
              "Thank you so much! ⭐"
            ].map((quick) => (
              <button
                key={quick}
                onClick={() => sendQuickReply(quick)}
                className="text-[10px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg whitespace-nowrap border border-white/5"
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
              placeholder="Type message to coordinate..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
            />
            <button
              type="submit"
              className="p-2 bg-[#00E5FF] text-slate-950 rounded-xl hover:bg-[#00B0FF] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
