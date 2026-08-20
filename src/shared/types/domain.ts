export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImageUrl: string;
  cityId: string;
  cityName: string;
  localityId: string;
  localityName: string;
  bio?: string;
  rating: number;
  ratingCount: number;
  totalCredits: number;
  lifetimeCredits: number;
  level: number;
  badges: BadgeUnlock[];
  interests: string[];
  activeTheme?: string;
  activeBanner?: string;
  unlockedThemes?: string[];
  unlockedBanners?: string[];
  role: UserRole;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: string;
  lastActiveAt: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
  isActive: boolean;
}

export interface Locality {
  id: string;
  cityId: string;
  name: string;
  centerLatitude: number;
  centerLongitude: number;
  isActive: boolean;
}

export type GigCategory = 
  | 'Errands'
  | 'Groceries'
  | 'Pets'
  | 'Tutoring'
  | 'Tech Help'
  | 'Repairs'
  | 'Moving/Carrying'
  | 'Delivery/Pickup'
  | 'Household'
  | 'Student Help'
  | 'Local Business'
  | 'Events'
  | 'Other';

export type GigUrgency = 'FLEXIBLE' | 'TODAY' | 'SOON' | 'URGENT';

export type GigStatus = 
  | 'OPEN'
  | 'ACCEPTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'REVIEWED'
  | 'CANCELLED'
  | 'DISPUTED';

export interface Gig {
  id: string;
  posterId: string;
  posterName: string;
  posterAvatar: string;
  posterRating: number;
  posterGigCount: number;
  title: string;
  description: string;
  category: GigCategory;
  subcategory?: string;
  cityId: string;
  cityName: string;
  localityId: string;
  localityName: string;
  approxAddress: string;
  exactAddress?: string; // Privacy masked until accepted
  latitude: number;
  longitude: number;
  budget?: number; // Optional monetary amount (INR)
  creditReward: number;
  urgency: GigUrgency;
  estimatedDuration: string;
  preferredCompletionTime?: string;
  status: GigStatus;
  acceptedBy?: string;
  helperName?: string;
  helperAvatar?: string;
  helperRating?: number;
  createdAt: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  distanceKm?: number;
}

export type CreditTxType = 
  | 'EARN'
  | 'BONUS'
  | 'REDEMPTION'
  | 'ADMIN_ADJUSTMENT'
  | 'REFUND'
  | 'REVERSAL';

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number; // positive for earn/bonus, negative for redemption
  type: CreditTxType;
  reason: string;
  gigId?: string;
  redemptionId?: string;
  createdAt: string;
}

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  creditCost: number;
  stock: number;
  cityIds: string[];
  partnerName: string;
  redemptionInstructions: string;
  expiryDate?: string;
  isActive: boolean;
}

export interface Redemption {
  id: string;
  userId: string;
  rewardId: string;
  rewardName: string;
  rewardImage: string;
  partnerName: string;
  creditsSpent: number;
  redemptionCode: string;
  status: 'ACTIVE' | 'USED' | 'EXPIRED';
  createdAt: string;
  fulfilledAt?: string;
}

export interface Conversation {
  id: string;
  gigId: string;
  gigTitle: string;
  posterId: string;
  helperId: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  isRead: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  gigId: string;
  fromUserId: string;
  toUserId: string;
  rating: number; // 1 to 5
  comment?: string;
  createdAt: string;
}

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: string;
  requiredGigs?: number;
  requiredCredits?: number;
}

export interface BadgeUnlock {
  badgeId: string;
  unlockedAt: string;
}

export interface SafetyReport {
  id: string;
  reporterId: string;
  reportedUserId?: string;
  gigId?: string;
  reason: string;
  description: string;
  status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
  adminNotes?: string;
  createdAt: string;
}

export interface HeroLevelConfig {
  level: number;
  name: string;
  minCredits: number;
  badgeReward?: string;
}
