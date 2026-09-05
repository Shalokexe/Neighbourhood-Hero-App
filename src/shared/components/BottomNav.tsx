import React from 'react';
import { Home, Map, PlusCircle, MessageSquare, User, Radio, Triangle } from 'lucide-react';
import { soundService } from '../../core/services/soundService';

export type TabType = 'home' | 'map' | 'post' | 'messages' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  unreadMessagesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  unreadMessagesCount
}) => {
  const tabs = [
    { id: 'home', label: 'FNSM OS', icon: Home, psPrompt: 'Ⓛ1' },
    { id: 'map', label: 'RADAR', icon: Map, psPrompt: 'Ⓛ2' },
    { id: 'post', label: 'DISPATCH', icon: PlusCircle, isCenter: true },
    { id: 'messages', label: 'COMMS', icon: MessageSquare, badge: unreadMessagesCount, psPrompt: 'Ⓡ2' },
    { id: 'profile', label: 'HERO', icon: User, psPrompt: 'Ⓡ1' }
  ];

  const handleTabClick = (tabId: TabType) => {
    soundService.playClickSound();
    setActiveTab(tabId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto px-2 pb-2 pt-1 font-fnsm">
      <nav className="fnsm-app-container rounded-2xl px-2 py-1.5 flex items-center justify-around shadow-2xl border border-white/20 relative bg-black/90">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as TabType)}
                className="relative -top-5 flex flex-col items-center justify-center group focus:outline-none"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF2A54] via-[#00E5FF] to-emerald-400 p-0.5 shadow-[0_0_25px_rgba(255,42,84,0.5)] group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center text-white group-hover:bg-slate-900 transition-colors">
                    <PlusCircle className="w-7 h-7 text-[#FF2A54] animate-pulse" />
                  </div>
                </div>
                <span className="text-[9px] font-black text-[#FF2A54] mt-0.5 tracking-wider uppercase">
                  POST DISPATCH
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id as TabType)}
              className={`flex-1 py-1.5 px-2 rounded-xl transition-all relative flex flex-col items-center gap-0.5 ${
                isActive
                  ? 'fnsm-tab-active shadow-[0_0_12px_rgba(255,42,84,0.4)]'
                  : 'fnsm-tab-inactive hover:text-white'
              }`}
            >
              <div className="relative flex items-center gap-1">
                <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110 text-white' : 'text-slate-400'}`} />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-[#FF2A54] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                ) : null}
              </div>

              <span className={`text-[10px] font-black tracking-wider uppercase ${isActive ? 'text-white' : 'text-slate-400'}`}>
                {tab.label}
              </span>

              {/* PS Controller Prompt Indicator */}
              <span className="text-[8px] font-mono text-slate-500 opacity-60">
                {tab.psPrompt}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
