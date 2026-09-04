import React, { useState } from 'react';
import { AppProvider, useApp } from './core/context/AppContext';
import { HeaderNav } from './shared/components/HeaderNav';
import { BottomNav, TabType } from './shared/components/BottomNav';
import { HomeScreen } from './features/home/HomeScreen';
import { MapScreen } from './features/map/MapScreen';
import { PostGigScreen } from './features/gigs/PostGigScreen';
import { GigDetailScreen } from './features/gigs/GigDetailScreen';
import { ChatScreen } from './features/chat/ChatScreen';
import { ProfileScreen } from './features/profile/ProfileScreen';
import { RewardsScreen } from './features/rewards/RewardsScreen';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { NotificationCenter } from './features/notifications/NotificationCenter';
import { LeaderboardScreen } from './features/leaderboard/LeaderboardScreen';
import { ImpactDashboard } from './features/impact/ImpactDashboard';
import { CustomCursor } from './shared/components/CustomCursor';
import { DynamicHeroBg } from './shared/components/DynamicHeroBg';
import { Gig } from './shared/types/domain';
import { Sparkles, Trophy, X } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { conversations, celebrationEvent, clearCelebration } = useApp();

  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [activeChatGigId, setActiveChatGigId] = useState<string | undefined>(undefined);
  const [viewOverlay, setViewOverlay] = useState<'rewards' | 'admin' | 'chat' | 'notifications' | 'leaderboard' | 'impact' | null>(null);

  const unreadCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const handleSelectGig = (gig: Gig) => {
    setSelectedGig(gig);
  };

  const handleOpenChat = (gigId: string) => {
    setActiveChatGigId(gigId);
    setViewOverlay('chat');
  };

  return (
    <div className="min-h-screen bg-[#080B12] hero-grid-bg text-slate-100 relative selection:bg-[#00E5FF] selection:text-slate-950">
      {/* Custom Cross-Platform Hover Cursor */}
      <CustomCursor />

      {/* Dynamic Animated Cyber Network Canvas Background */}
      <DynamicHeroBg />

      {/* Top Header Navigation */}
      <HeaderNav 
        onOpenRewards={() => setViewOverlay('rewards')}
        onOpenAdmin={() => setViewOverlay('admin')}
        onOpenNotifications={() => setViewOverlay('notifications')}
        onOpenLeaderboard={() => setViewOverlay('leaderboard')}
        onOpenImpact={() => setViewOverlay('impact')}
      />

      {/* Main View Router */}
      <main className="pt-20">
        {viewOverlay === 'rewards' ? (
          <RewardsScreen onBack={() => setViewOverlay(null)} />
        ) : viewOverlay === 'admin' ? (
          <AdminDashboard onBack={() => setViewOverlay(null)} />
        ) : viewOverlay === 'notifications' ? (
          <NotificationCenter onBack={() => setViewOverlay(null)} />
        ) : viewOverlay === 'leaderboard' ? (
          <LeaderboardScreen onBack={() => setViewOverlay(null)} />
        ) : viewOverlay === 'impact' ? (
          <ImpactDashboard onBack={() => setViewOverlay(null)} />
        ) : viewOverlay === 'chat' ? (
          <ChatScreen 
            gigId={activeChatGigId} 
            onBack={() => setViewOverlay(null)} 
          />
        ) : selectedGig ? (
          <GigDetailScreen
            gig={selectedGig}
            onBack={() => setSelectedGig(null)}
            onOpenChat={handleOpenChat}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeScreen
                onSelectGig={handleSelectGig}
                onNavigateToPost={() => setActiveTab('post')}
                onOpenRewards={() => setViewOverlay('rewards')}
                onOpenMap={() => setActiveTab('map')}
              />
            )}
            {activeTab === 'map' && (
              <MapScreen onSelectGig={handleSelectGig} />
            )}
            {activeTab === 'post' && (
              <PostGigScreen onSuccess={() => setActiveTab('home')} />
            )}
            {activeTab === 'messages' && (
              <ChatScreen 
                gigId={activeChatGigId} 
                onBack={() => setActiveTab('home')} 
              />
            )}
            {activeTab === 'profile' && (
              <ProfileScreen />
            )}
          </>
        )}
      </main>

      {/* Celebratory Mission Complete Modal */}
      {celebrationEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-sm w-full rounded-3xl p-6 border border-[#00E5FF]/50 text-center space-y-4 shadow-[0_0_50px_rgba(0,229,255,0.4)] animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-[#00E5FF] p-0.5 mx-auto flex items-center justify-center shadow-lg shadow-amber-400/20">
              <div className="w-full h-full bg-[#080B12] rounded-[22px] flex items-center justify-center text-amber-400">
                <Trophy className="w-8 h-8 fill-amber-400" />
              </div>
            </div>

            <div>
              <h3 className="font-heading font-black text-2xl text-white tracking-wide">
                {celebrationEvent.title}
              </h3>
              <p className="text-sm font-semibold text-[#00E5FF] mt-1">
                {celebrationEvent.subtitle}
              </p>
            </div>

            <button
              onClick={clearCelebration}
              className="w-full py-3 bg-[#00E5FF] text-slate-950 font-heading font-extrabold text-sm rounded-xl hover:bg-[#00B0FF] shadow-[0_0_15px_rgba(0,229,255,0.4)]"
            >
              CONTINUE HERO JOURNEY →
            </button>
          </div>
        </div>
      )}

      {/* Bottom 5-Tab Navigation Bar */}
      {!selectedGig && !viewOverlay && (
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unreadMessagesCount={unreadCount}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
};

export default App;
