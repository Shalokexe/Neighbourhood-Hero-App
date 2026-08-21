import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, Gig, RewardItem, CreditTransaction, Redemption, 
  Conversation, Message, SafetyReport, GigCategory, GigUrgency, GigStatus 
} from '../../shared/types/domain';
import { DEMO_USERS, INITIAL_GIGS_SEED, INITIAL_REWARDS_SEED, INITIAL_TRANSACTIONS_SEED } from '../services/mockData';
import { CITIES_SEED, LOCALITIES_SEED } from '../config/citiesData';
import { HERO_THEMES, PROFILE_BANNERS } from '../config/themeConfig';
import { calculateGigCompletionReward, calculateHeroLevel, evaluateNewBadges, createLedgerEntry } from '../services/creditEngine';
import { calculateDistanceKm } from '../services/geoService';
import { soundService } from '../services/soundService';
import confetti from 'canvas-confetti';

interface AppContextType {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  switchUser: (userId: string) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  
  // City & Locality Selection
  selectedCityId: string;
  setSelectedCityId: (cityId: string) => void;
  selectedLocalityId: string;
  setSelectedLocalityId: (localityId: string) => void;
  
  // Gigs State & Actions
  gigs: Gig[];
  filteredGigs: Gig[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedUrgency: string;
  setSelectedUrgency: (u: string) => void;
  radiusKm: number;
  setRadiusKm: (r: number) => void;
  
  postGig: (gigData: Omit<Gig, 'id' | 'posterId' | 'posterName' | 'posterAvatar' | 'posterRating' | 'posterGigCount' | 'status' | 'createdAt'>) => Gig;
  acceptGig: (gigId: string) => { success: boolean; message: string };
  startGig: (gigId: string) => void;
  markGigCompleted: (gigId: string) => void;
  confirmGigCompletion: (gigId: string, rating: number, comment?: string) => { success: boolean; awardedCredits: number };
  cancelGig: (gigId: string) => void;
  
  // Credit Ledger & Progression
  creditTransactions: CreditTransaction[];
  
  // Customization Themes & Banners
  activeThemeId: string;
  activeBannerId: string;
  unlockedThemeIds: string[];
  unlockedBannerIds: string[];
  setUserTheme: (themeId: string) => void;
  setUserBanner: (bannerId: string) => void;
  unlockTheme: (themeId: string) => { success: boolean; message: string };
  unlockBanner: (bannerId: string) => { success: boolean; message: string };
  
  // Rewards & Redemptions
  rewards: RewardItem[];
  redemptions: Redemption[];
  redeemReward: (rewardId: string) => { success: boolean; message: string; code?: string };
  
  // Messaging
  conversations: Conversation[];
  messages: Message[];
  sendMessage: (gigId: string, text: string) => void;
  getConversationForGig: (gigId: string) => Conversation | undefined;
  getMessagesForConversation: (conversationId: string) => Message[];
  
  // Reports & Safety
  reports: SafetyReport[];
  submitReport: (reportedUserId: string | undefined, gigId: string | undefined, reason: string, description: string) => void;
  
  // Admin Operations
  adminToggleBlockUser: (userId: string) => void;
  adminRemoveGig: (gigId: string, reason: string) => void;
  adminAdjustCredits: (userId: string, amount: number, reason: string) => void;
  adminResolveReport: (reportId: string, notes: string) => void;
  
  // Celebrations & Notifications
  celebrationEvent: { title: string; subtitle: string; credits?: number } | null;
  clearCelebration: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<UserProfile[]>(DEMO_USERS);
  const [currentUserId, setCurrentUserId] = useState<string>('user_shalok');
  
  const currentUser = allUsers.find(u => u.id === currentUserId) || allUsers[0];
  
  const [selectedCityId, setSelectedCityId] = useState<string>('city_kharar');
  const [selectedLocalityId, setSelectedLocalityId] = useState<string>('all');
  const [radiusKm, setRadiusKm] = useState<number>(5);
  
  const [gigs, setGigs] = useState<Gig[]>(INITIAL_GIGS_SEED);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('All');
  
  const [creditTransactions, setCreditTransactions] = useState<CreditTransaction[]>(INITIAL_TRANSACTIONS_SEED);
  const [rewards, setRewards] = useState<RewardItem[]>(INITIAL_REWARDS_SEED);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reports, setReports] = useState<SafetyReport[]>([]);
  
  const [celebrationEvent, setCelebrationEvent] = useState<{ title: string; subtitle: string; credits?: number } | null>(null);

  // User Profile Switcher
  const switchUser = (userId: string) => {
    const target = allUsers.find(u => u.id === userId);
    if (target) {
      setCurrentUserId(target.id);
      setSelectedCityId(target.cityId);
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...updates } : u));
  };

  // Filter Gigs according to City, Locality, Radius, Category, Urgency, Search Query
  const filteredGigs = gigs.filter(gig => {
    // City Filter
    if (selectedCityId !== 'all' && gig.cityId !== selectedCityId) {
      return false;
    }
    // Locality Filter
    if (selectedLocalityId !== 'all' && gig.localityId !== selectedLocalityId) {
      return false;
    }
    // Category Filter
    if (selectedCategory !== 'All' && gig.category !== selectedCategory) {
      return false;
    }
    // Urgency Filter
    if (selectedUrgency !== 'All' && gig.urgency !== selectedUrgency) {
      return false;
    }
    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = gig.title.toLowerCase().includes(q);
      const matchDesc = gig.description.toLowerCase().includes(q);
      const matchLoc = gig.localityName.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchLoc) {
        return false;
      }
    }
    return true;
  });

  // Create a new Gig / Mission
  const postGig = (gigData: Omit<Gig, 'id' | 'posterId' | 'posterName' | 'posterAvatar' | 'posterRating' | 'posterGigCount' | 'status' | 'createdAt'>): Gig => {
    const newGig: Gig = {
      ...gigData,
      id: `gig_${Date.now()}`,
      posterId: currentUser.id,
      posterName: currentUser.name,
      posterAvatar: currentUser.profileImageUrl,
      posterRating: currentUser.rating,
      posterGigCount: currentUser.ratingCount,
      status: 'OPEN',
      createdAt: new Date().toISOString()
    };

    setGigs(prev => [newGig, ...prev]);
    return newGig;
  };

  // Accept a Gig
  const acceptGig = (gigId: string): { success: boolean; message: string } => {
    const targetGig = gigs.find(g => g.id === gigId);
    if (!targetGig) return { success: false, message: 'Mission not found.' };

    // Anti-Abuse Rule 1: Self-Gig Prevention
    if (targetGig.posterId === currentUser.id) {
      return { success: false, message: 'You cannot accept your own posted mission!' };
    }

    // Anti-Abuse Rule 2: Single Active Helper
    if (targetGig.status !== 'OPEN') {
      return { success: false, message: 'This mission has already been accepted or closed by another hero.' };
    }

    // State Machine Transition: OPEN -> ACCEPTED
    const updatedGig: Gig = {
      ...targetGig,
      status: 'ACCEPTED',
      acceptedBy: currentUser.id,
      helperName: currentUser.name,
      helperAvatar: currentUser.profileImageUrl,
      helperRating: currentUser.rating,
      acceptedAt: new Date().toISOString()
    };

    setGigs(prev => prev.map(g => g.id === gigId ? updatedGig : g));
    soundService.playAcceptSound();

    // Initialize or find Conversation
    let conv = conversations.find(c => c.gigId === gigId);
    if (!conv) {
      conv = {
        id: `conv_${Date.now()}`,
        gigId,
        gigTitle: targetGig.title,
        posterId: targetGig.posterId,
        helperId: currentUser.id,
        lastMessage: 'Mission Accepted! Let us coordinate meeting details.',
        lastMessageAt: new Date().toISOString(),
        unreadCount: 0
      };
      setConversations(prev => [conv!, ...prev]);

      const systemMsg: Message = {
        id: `msg_${Date.now()}`,
        conversationId: conv.id,
        senderId: currentUser.id,
        senderName: currentUser.name,
        text: `Hero ${currentUser.name} has accepted the mission! Exact pickup/meeting details are now unlocked.`,
        isRead: false,
        createdAt: new Date().toISOString()
      };
      setMessages(prev => [...prev, systemMsg]);
    }

    return { success: true, message: 'Mission accepted! Check messages to coordinate with poster.' };
  };

  const startGig = (gigId: string) => {
    setGigs(prev => prev.map(g => g.id === gigId ? { ...g, status: 'IN_PROGRESS', startedAt: new Date().toISOString() } : g));
  };

  const markGigCompleted = (gigId: string) => {
    setGigs(prev => prev.map(g => g.id === gigId ? { ...g, status: 'COMPLETED', completedAt: new Date().toISOString() } : g));
  };

  // Confirm Completion & Credit engine distribution
  const confirmGigCompletion = (gigId: string, rating: number, comment?: string): { success: boolean; awardedCredits: number } => {
    const targetGig = gigs.find(g => g.id === gigId);
    if (!targetGig) return { success: false, awardedCredits: 0 };

    const helperId = targetGig.acceptedBy;
    if (!helperId) return { success: false, awardedCredits: 0 };

    // Calculate Credits server-side
    const rewardCalculation = calculateGigCompletionReward({
      baseReward: targetGig.creditReward,
      urgency: targetGig.urgency,
      rating,
      isFirstGig: false,
      streakCount: 3
    });

    const totalAwarded = rewardCalculation.totalAwarded;

    // Update Gig status to REVIEWED
    setGigs(prev => prev.map(g => g.id === gigId ? { ...g, status: 'REVIEWED' } : g));

    // Update Helper's profile: Total Credits, Lifetime Credits, Level, Rating
    setAllUsers(prevUsers => prevUsers.map(user => {
      if (user.id === helperId) {
        const newLifetime = user.lifetimeCredits + totalAwarded;
        const newTotal = user.totalCredits + totalAwarded;
        const newRatingCount = user.ratingCount + 1;
        const newRating = Math.round(((user.rating * user.ratingCount + rating) / newRatingCount) * 10) / 10;
        const levelInfo = calculateHeroLevel(newLifetime);

        const newBadges = evaluateNewBadges({ ...user, lifetimeCredits: newLifetime }, user.ratingCount + 1);
        const updatedBadges = [...user.badges, ...newBadges];

        return {
          ...user,
          totalCredits: newTotal,
          lifetimeCredits: newLifetime,
          level: levelInfo.level,
          rating: newRating,
          ratingCount: newRatingCount,
          badges: updatedBadges
        };
      }
      return user;
    }));

    // Record Ledger Entry
    const tx = createLedgerEntry(
      helperId,
      totalAwarded,
      'EARN',
      `Completed Mission: "${targetGig.title}"`,
      gigId
    );
    setCreditTransactions(prev => [tx, ...prev]);

    // Trigger Celebrations & Confetti
    soundService.playCompleteSound();
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Graceful fallback if DOM confetti not available
    }

    setCelebrationEvent({
      title: 'MISSION ACCOMPLISHED!',
      subtitle: `Hero earned +${totalAwarded} Gig Credits! ⭐`,
      credits: totalAwarded
    });

    return { success: true, awardedCredits: totalAwarded };
  };

  const cancelGig = (gigId: string) => {
    setGigs(prev => prev.map(g => g.id === gigId ? { ...g, status: 'CANCELLED', cancelledAt: new Date().toISOString() } : g));
  };

  // Theme & Banner Customizations
  const activeThemeId = currentUser.activeTheme || 'theme_costar_monochrome';
  const activeBannerId = currentUser.activeBanner || 'banner_costar';
  const unlockedThemeIds = currentUser.unlockedThemes || ['theme_costar_monochrome', 'theme_urban_cyan'];
  const unlockedBannerIds = currentUser.unlockedBanners || ['banner_costar', 'banner_grid'];

  const setUserTheme = (themeId: string) => {
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, activeTheme: themeId } : u));
  };

  const setUserBanner = (bannerId: string) => {
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, activeBanner: bannerId } : u));
  };

  const unlockTheme = (themeId: string): { success: boolean; message: string } => {
    const themeObj = HERO_THEMES.find(t => t.id === themeId);
    if (!themeObj) return { success: false, message: 'Theme not found.' };

    const cost = themeObj.creditCost || 0;
    if (currentUser.totalCredits < cost) {
      return { success: false, message: `Need ${cost} Gig Credits to unlock ${themeObj.name}.` };
    }

    setAllUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const currentUnlocked = u.unlockedThemes || ['theme_urban_cyan'];
        return {
          ...u,
          totalCredits: u.totalCredits - cost,
          activeTheme: themeId,
          unlockedThemes: Array.from(new Set([...currentUnlocked, themeId]))
        };
      }
      return u;
    }));

    if (cost > 0) {
      const tx = createLedgerEntry(currentUser.id, -cost, 'REDEMPTION', `Unlocked Hero Theme: ${themeObj.name}`);
      setCreditTransactions(prev => [tx, ...prev]);
    }

    return { success: true, message: `Successfully unlocked ${themeObj.name}!` };
  };

  const unlockBanner = (bannerId: string): { success: boolean; message: string } => {
    const bannerObj = PROFILE_BANNERS.find(b => b.id === bannerId);
    if (!bannerObj) return { success: false, message: 'Banner not found.' };

    const cost = bannerObj.creditCost || 0;
    if (currentUser.totalCredits < cost) {
      return { success: false, message: `Need ${cost} Gig Credits to unlock ${bannerObj.name}.` };
    }

    setAllUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const currentUnlocked = u.unlockedBanners || ['banner_grid'];
        return {
          ...u,
          totalCredits: u.totalCredits - cost,
          activeBanner: bannerId,
          unlockedBanners: Array.from(new Set([...currentUnlocked, bannerId]))
        };
      }
      return u;
    }));

    if (cost > 0) {
      const tx = createLedgerEntry(currentUser.id, -cost, 'REDEMPTION', `Unlocked Profile Banner: ${bannerObj.name}`);
      setCreditTransactions(prev => [tx, ...prev]);
    }

    return { success: true, message: `Successfully unlocked ${bannerObj.name} banner!` };
  };

  // Redeem Reward
  const redeemReward = (rewardId: string): { success: boolean; message: string; code?: string } => {
    const item = rewards.find(r => r.id === rewardId);
    if (!item) return { success: false, message: 'Reward item not found.' };

    if (item.stock <= 0) return { success: false, message: 'Reward is currently out of stock.' };

    if (currentUser.totalCredits < item.creditCost) {
      return { 
        success: false, 
        message: `Insufficient Gig Credits! You need ${item.creditCost} credits, but currently have ${currentUser.totalCredits}.` 
      };
    }

    const code = `HERO-${item.partnerName.substring(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Atomic deduction
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, totalCredits: u.totalCredits - item.creditCost } : u));
    setRewards(prev => prev.map(r => r.id === rewardId ? { ...r, stock: r.stock - 1 } : r));

    const newRedemption: Redemption = {
      id: `red_${Date.now()}`,
      userId: currentUser.id,
      rewardId: item.id,
      rewardName: item.name,
      rewardImage: item.imageUrl,
      partnerName: item.partnerName,
      creditsSpent: item.creditCost,
      redemptionCode: code,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };
    setRedemptions(prev => [newRedemption, ...prev]);

    const tx = createLedgerEntry(
      currentUser.id,
      -item.creditCost,
      'REDEMPTION',
      `Redeemed: ${item.name}`,
      undefined,
      newRedemption.id
    );
    setCreditTransactions(prev => [tx, ...prev]);
    soundService.playCreditSound();

    return { 
      success: true, 
      message: `Redemption successful! Your code is ${code}`, 
      code 
    };
  };

  // Messaging Functions
  const sendMessage = (gigId: string, text: string) => {
    let conv = conversations.find(c => c.gigId === gigId);
    const targetGig = gigs.find(g => g.id === gigId);
    if (!targetGig) return;

    if (!conv) {
      conv = {
        id: `conv_${Date.now()}`,
        gigId,
        gigTitle: targetGig.title,
        posterId: targetGig.posterId,
        helperId: currentUser.id,
        lastMessage: text,
        lastMessageAt: new Date().toISOString(),
        unreadCount: 0
      };
      setConversations(prev => [conv!, ...prev]);
    } else {
      setConversations(prev => prev.map(c => c.id === conv!.id ? {
        ...c,
        lastMessage: text,
        lastMessageAt: new Date().toISOString()
      } : c));
    }

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      conversationId: conv.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text,
      isRead: true,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMsg]);
  };

  const getConversationForGig = (gigId: string) => {
    return conversations.find(c => c.gigId === gigId);
  };

  const getMessagesForConversation = (conversationId: string) => {
    return messages.filter(m => m.conversationId === conversationId);
  };

  // Submit Safety Report
  const submitReport = (reportedUserId: string | undefined, gigId: string | undefined, reason: string, description: string) => {
    const report: SafetyReport = {
      id: `report_${Date.now()}`,
      reporterId: currentUser.id,
      reportedUserId,
      gigId,
      reason,
      description,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    setReports(prev => [report, ...prev]);
  };

  // Admin Actions
  const adminToggleBlockUser = (userId: string) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u));
  };

  const adminRemoveGig = (gigId: string, reason: string) => {
    setGigs(prev => prev.map(g => g.id === gigId ? { ...g, status: 'CANCELLED' } : g));
  };

  const adminAdjustCredits = (userId: string, amount: number, reason: string) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? {
      ...u,
      totalCredits: u.totalCredits + amount,
      lifetimeCredits: amount > 0 ? u.lifetimeCredits + amount : u.lifetimeCredits
    } : u));

    const tx = createLedgerEntry(userId, amount, 'ADMIN_ADJUSTMENT', `Admin adjustment: ${reason}`);
    setCreditTransactions(prev => [tx, ...prev]);
  };

  const adminResolveReport = (reportId: string, notes: string) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'RESOLVED', adminNotes: notes } : r));
  };

  const clearCelebration = () => setCelebrationEvent(null);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        switchUser,
        updateUserProfile,
        selectedCityId,
        setSelectedCityId,
        selectedLocalityId,
        setSelectedLocalityId,
        gigs,
        filteredGigs,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedUrgency,
        setSelectedUrgency,
        radiusKm,
        setRadiusKm,
        postGig,
        acceptGig,
        startGig,
        markGigCompleted,
        confirmGigCompletion,
        cancelGig,
        creditTransactions,
        activeThemeId,
        activeBannerId,
        unlockedThemeIds,
        unlockedBannerIds,
        setUserTheme,
        setUserBanner,
        unlockTheme,
        unlockBanner,
        rewards,
        redemptions,
        redeemReward,
        conversations,
        messages,
        sendMessage,
        getConversationForGig,
        getMessagesForConversation,
        reports,
        submitReport,
        adminToggleBlockUser,
        adminRemoveGig,
        adminAdjustCredits,
        adminResolveReport,
        celebrationEvent,
        clearCelebration
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
