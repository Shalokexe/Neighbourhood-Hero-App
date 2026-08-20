import { HeroLevelConfig, BadgeDefinition } from '../../shared/types/domain';

export const HERO_LEVELS: HeroLevelConfig[] = [
  { level: 1, name: 'New Hero', minCredits: 0 },
  { level: 2, name: 'Local Helper', minCredits: 100, badgeReward: 'Helping Hand' },
  { level: 3, name: 'Neighborhood Hero', minCredits: 250 },
  { level: 4, name: 'Active Hero', minCredits: 500 },
  { level: 5, name: 'Super Helper', minCredits: 1000, badgeReward: 'Super Helper' },
  { level: 6, name: 'Community Star', minCredits: 2000 },
  { level: 7, name: 'Area Champion', minCredits: 3500 },
  { level: 8, name: 'City Hero', minCredits: 5000 },
  { level: 9, name: 'Community Legend', minCredits: 7500 },
  { level: 10, name: 'Neighborhood Guardian', minCredits: 10000, badgeReward: 'Local Legend' }
];

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'badge_first_gig',
    name: 'First Mission',
    description: 'Complete your very first task in the neighborhood.',
    iconName: 'Zap',
    category: 'Milestone',
    requiredGigs: 1
  },
  {
    id: 'badge_helping_hand',
    name: 'Helping Hand',
    description: 'Successfully complete 5 neighborhood missions.',
    iconName: 'HeartHandshake',
    category: 'Milestone',
    requiredGigs: 5
  },
  {
    id: 'badge_10_gigs',
    name: '10 Missions Completed',
    description: 'Complete 10 tasks for your neighbors.',
    iconName: 'ShieldCheck',
    category: 'Milestone',
    requiredGigs: 10
  },
  {
    id: 'badge_super_helper',
    name: 'Super Helper',
    description: 'Complete 25 missions & earn over 1,000 credits.',
    iconName: 'Award',
    category: 'Milestone',
    requiredGigs: 25,
    requiredCredits: 1000
  },
  {
    id: 'badge_errand_runner',
    name: 'Errand Runner',
    description: 'Complete 10 errand or grocery tasks.',
    iconName: 'ShoppingBag',
    category: 'Category'
  },
  {
    id: 'badge_tech_fixer',
    name: 'Tech Fixer',
    description: 'Help neighbors set up software or troubleshoot devices.',
    iconName: 'Cpu',
    category: 'Category'
  },
  {
    id: 'badge_tutor',
    name: 'Neighborhood Tutor',
    description: 'Help students with studies, languages or exam prep.',
    iconName: 'BookOpen',
    category: 'Category'
  },
  {
    id: 'badge_pet_hero',
    name: 'Pet Guardian',
    description: 'Assist with pet walking, feeding, or pet care.',
    iconName: 'Dog',
    category: 'Category'
  },
  {
    id: 'badge_night_helper',
    name: 'Night Watcher',
    description: 'Complete an urgent mission during evening hours.',
    iconName: 'Moon',
    category: 'Special'
  },
  {
    id: 'badge_5_star',
    name: 'Five-Star Hero',
    description: 'Maintain a perfect 5.0 rating across at least 5 missions.',
    iconName: 'Star',
    category: 'Quality'
  },
  {
    id: 'badge_local_legend',
    name: 'Local Legend',
    description: 'Reach Level 10 and accumulate 10,000 lifetime credits.',
    iconName: 'Crown',
    category: 'Mastery',
    requiredCredits: 10000
  }
];

export const CATEGORY_ICONS: Record<string, { icon: string; color: string; bg: string }> = {
  'Errands': { icon: 'ShoppingBag', color: '#00E5FF', bg: 'rgba(0, 229, 255, 0.12)' },
  'Groceries': { icon: 'ShoppingCart', color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)' },
  'Pets': { icon: 'Dog', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' },
  'Tutoring': { icon: 'BookOpen', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.12)' },
  'Tech Help': { icon: 'Cpu', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.12)' },
  'Repairs': { icon: 'Wrench', color: '#EC4899', bg: 'rgba(236, 72, 153, 0.12)' },
  'Moving/Carrying': { icon: 'Package', color: '#6366F1', bg: 'rgba(99, 102, 241, 0.12)' },
  'Delivery/Pickup': { icon: 'Truck', color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.12)' },
  'Household': { icon: 'Home', color: '#14B8A6', bg: 'rgba(20, 184, 166, 0.12)' },
  'Student Help': { icon: 'GraduationCap', color: '#A855F7', bg: 'rgba(168, 85, 247, 0.12)' },
  'Local Business': { icon: 'Store', color: '#F97316', bg: 'rgba(249, 115, 22, 0.12)' },
  'Events': { icon: 'Calendar', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)' },
  'Other': { icon: 'Layers', color: '#94A3B8', bg: 'rgba(148, 163, 184, 0.12)' }
};
