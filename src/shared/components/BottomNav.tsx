import React from 'react';
import { Home, Map, PlusCircle, MessageSquare, User } from 'lucide-react';

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
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'map', label: 'MAP', icon: Map },
    { id: 'post', label: 'POST', icon: PlusCircle, isCenter: true },
    { id: 'messages', label: 'CHAT', icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'profile', label: 'MY HERO', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto px-4 pb-3 pt-2">
      <nav className="glass-nav rounded-2xl px-3 py-2 flex items-center justify-around shadow-2xl border border-white/10 relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className="relative -top-5 flex flex-col items-center justify-center group focus:outline-none"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF2A54] via-[#00E5FF] to-[#00E5FF] p-0.5 shadow-[0_0_20px_rgba(0,229,255,0.4)] group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-[#080B12] rounded-[14px] flex items-center justify-center text-white group-hover:bg-[#121826] transition-colors">
                    <PlusCircle className="w-7 h-7 text-[#00E5FF]" />
                  </div>
                </div>
                <span className="text-[10px] font-heading font-extrabold text-[#00E5FF] mt-1 tracking-wider">
                  MISSION
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all relative ${
                isActive ? 'text-[#00E5FF]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#FF2A54] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[10px] font-heading font-bold tracking-wider ${isActive ? 'text-[#00E5FF]' : 'text-slate-400'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
