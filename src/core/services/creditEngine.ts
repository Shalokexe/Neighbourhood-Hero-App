import { HERO_LEVELS, BADGE_DEFINITIONS } from '../config/levelConfig';
import { UserProfile, CreditTransaction, CreditTxType, BadgeUnlock } from '../../shared/types/domain';

export interface CreditCalculationResult {
  baseCredits: number;
  bonusCredits: number;
  totalAwarded: number;
  bonusBreakdown: { reason: string; amount: number }[];
}

/**
 * Deterministic Server-Side Credit Engine
 */
export function calculateGigCompletionReward(options: {
  baseReward: number;
  urgency: string;
  rating?: number;
  isFirstGig?: boolean;
  streakCount?: number;
}): CreditCalculationResult {
  const baseCredits = Math.max(options.baseReward || 20, 10);
  let bonusCredits = 0;
  const bonusBreakdown: { reason: string; amount: number }[] = [];

  // Urgency Bonus
  if (options.urgency === 'URGENT') {
    bonusCredits += 5;
    bonusBreakdown.push({ reason: 'Urgent Mission Bonus', amount: 5 });
  }

  // 5-Star Review Bonus
  if (options.rating && options.rating >= 5) {
    bonusCredits += 5;
    bonusBreakdown.push({ reason: '5-Star Review Bonus', amount: 5 });
  }

  // First Mission Bonus
  if (options.isFirstGig) {
    bonusCredits += 10;
    bonusBreakdown.push({ reason: 'First Mission Completion Bonus', amount: 10 });
  }

  // Streak Bonus (every 3 streak count)
  if (options.streakCount && options.streakCount > 0 && options.streakCount % 3 === 0) {
    bonusCredits += 5;
    bonusBreakdown.push({ reason: '3-Mission Streak Bonus 🔥', amount: 5 });
  }

  return {
    baseCredits,
    bonusCredits,
    totalAwarded: baseCredits + bonusCredits,
    bonusBreakdown
  };
}

/**
 * Calculates current level from total lifetime credits
 */
export function calculateHeroLevel(lifetimeCredits: number): {
  level: number;
  levelName: string;
  currentXp: number;
  nextLevelXp: number;
  progressPercent: number;
} {
  let currentLevelObj = HERO_LEVELS[0];
  let nextLevelObj = HERO_LEVELS[1] || HERO_LEVELS[HERO_LEVELS.length - 1];

  for (let i = HERO_LEVELS.length - 1; i >= 0; i--) {
    if (lifetimeCredits >= HERO_LEVELS[i].minCredits) {
      currentLevelObj = HERO_LEVELS[i];
      nextLevelObj = HERO_LEVELS[i + 1] || HERO_LEVELS[i];
      break;
    }
  }

  const isMax = currentLevelObj.level === HERO_LEVELS[HERO_LEVELS.length - 1].level;
  const currentLevelMin = currentLevelObj.minCredits;
  const nextLevelMin = nextLevelObj.minCredits;

  const currentXp = lifetimeCredits;
  const nextLevelXp = nextLevelMin;

  const range = nextLevelMin - currentLevelMin;
  const progress = range > 0 ? ((lifetimeCredits - currentLevelMin) / range) * 100 : 100;
  const progressPercent = Math.min(Math.max(Math.round(progress), 0), 100);

  return {
    level: currentLevelObj.level,
    levelName: currentLevelObj.name,
    currentXp,
    nextLevelXp: isMax ? lifetimeCredits : nextLevelXp,
    progressPercent: isMax ? 100 : progressPercent
  };
}

/**
 * Evaluates unlocked badges for a user after a completed gig
 */
export function evaluateNewBadges(
  user: UserProfile,
  totalGigsCompleted: number
): BadgeUnlock[] {
  const existingBadgeIds = new Set(user.badges.map(b => b.badgeId));
  const newUnlocks: BadgeUnlock[] = [];
  const now = new Date().toISOString();

  BADGE_DEFINITIONS.forEach(badge => {
    if (!existingBadgeIds.has(badge.id)) {
      let isUnlocked = false;

      if (badge.requiredGigs && totalGigsCompleted >= badge.requiredGigs) {
        isUnlocked = true;
      }
      if (badge.requiredCredits && user.lifetimeCredits >= badge.requiredCredits) {
        isUnlocked = true;
      }

      if (isUnlocked) {
        newUnlocks.push({ badgeId: badge.id, unlockedAt: now });
      }
    }
  });

  return newUnlocks;
}

/**
 * Helper to record auditable ledger transaction
 */
export function createLedgerEntry(
  userId: string,
  amount: number,
  type: CreditTxType,
  reason: string,
  gigId?: string,
  redemptionId?: string
): CreditTransaction {
  return {
    id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    userId,
    amount,
    type,
    reason,
    gigId,
    redemptionId,
    createdAt: new Date().toISOString()
  };
}
