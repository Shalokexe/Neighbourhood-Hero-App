export interface HeroTheme {
  id: string;
  name: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  bgGradient: string;
  cardGlow: string;
  creditCost?: number;
  requiredLevel?: number;
  isDefault?: boolean;
}

export interface ProfileBanner {
  id: string;
  name: string;
  description: string;
  bgStyle: string;
  creditCost?: number;
  requiredLevel?: number;
  isDefault?: boolean;
}

export const HERO_THEMES: HeroTheme[] = [
  {
    id: 'theme_costar_monochrome',
    name: 'Co-Star Stark Monochrome',
    tagline: 'Minimalist editorial stark dark aesthetic with high-contrast typography.',
    primaryColor: '#FFFFFF',
    accentColor: '#A1A1AA',
    bgGradient: 'linear-gradient(135deg, #18181B 0%, #000000 100%)',
    cardGlow: '0 0 20px rgba(255, 255, 255, 0.15)',
    isDefault: true
  },
  {
    id: 'theme_urban_cyan',
    name: 'Urban Hero (Cyan)',
    tagline: 'Classic neighborhood electric cyan theme.',
    primaryColor: '#00E5FF',
    accentColor: '#2563EB',
    bgGradient: 'linear-gradient(135deg, #00E5FF 0%, #2563EB 100%)',
    cardGlow: '0 0 20px rgba(0, 229, 255, 0.35)'
  },
  {
    id: 'theme_crimson',
    name: 'Crimson Guardian (Red)',
    tagline: 'High-energy hero red accent for bold task runners.',
    primaryColor: '#FF2A54',
    accentColor: '#E60039',
    bgGradient: 'linear-gradient(135deg, #FF2A54 0%, #990022 100%)',
    cardGlow: '0 0 20px rgba(255, 42, 84, 0.35)',
    creditCost: 300,
    requiredLevel: 3
  },
  {
    id: 'theme_solar',
    name: 'Solar Champion (Gold)',
    tagline: 'Prestigious golden theme earned by top helpers.',
    primaryColor: '#FFC72C',
    accentColor: '#F59E0B',
    bgGradient: 'linear-gradient(135deg, #FFC72C 0%, #D97706 100%)',
    cardGlow: '0 0 20px rgba(255, 199, 44, 0.35)',
    creditCost: 800,
    requiredLevel: 5
  },
  {
    id: 'theme_violet',
    name: 'Cyber Legend (Purple)',
    tagline: 'Futuristic neon violet aesthetic for community stars.',
    primaryColor: '#A855F7',
    accentColor: '#7E22CE',
    bgGradient: 'linear-gradient(135deg, #A855F7 0%, #6B21A8 100%)',
    cardGlow: '0 0 20px rgba(168, 85, 247, 0.35)',
    creditCost: 1200,
    requiredLevel: 6
  },
  {
    id: 'theme_emerald',
    name: 'Eco Guardian (Green)',
    tagline: 'Vibrant emerald green for eco & tutoring heroes.',
    primaryColor: '#10B981',
    accentColor: '#059669',
    bgGradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    cardGlow: '0 0 20px rgba(16, 185, 129, 0.35)',
    creditCost: 500,
    requiredLevel: 4
  }
];

export const PROFILE_BANNERS: ProfileBanner[] = [
  {
    id: 'banner_costar',
    name: 'Co-Star Celestial Grid',
    description: 'Stark monochrome celestial alignment grid.',
    bgStyle: 'bg-black border-b border-white/20',
    isDefault: true
  },
  {
    id: 'banner_grid',
    name: 'Neighborhood Grid',
    description: 'Classic connected neighborhood nodes pattern.',
    bgStyle: 'bg-gradient-to-r from-[#121826] via-[#162035] to-[#121826]'
  },
  {
    id: 'banner_circuit',
    name: 'Cyber Circuit Pulse',
    description: 'Animated electric cyan circuitry banner.',
    bgStyle: 'bg-gradient-to-r from-[#00E5FF]/20 via-[#121826] to-[#2563EB]/20 border-b border-[#00E5FF]/40',
    creditCost: 400
  },
  {
    id: 'banner_solar',
    name: 'Solar Golden Crest',
    description: 'Shimmering gold gradient for area champions.',
    bgStyle: 'bg-gradient-to-r from-amber-500/30 via-yellow-500/10 to-[#121826] border-b border-amber-500/40',
    creditCost: 750,
    requiredLevel: 5
  },
  {
    id: 'banner_flame',
    name: 'Flame Hero Streak',
    description: 'Fiery red-orange accent banner celebrating mission streaks.',
    bgStyle: 'bg-gradient-to-r from-[#FF2A54]/30 via-orange-500/10 to-[#121826] border-b border-[#FF2A54]/40',
    creditCost: 500,
    requiredLevel: 4
  }
];
