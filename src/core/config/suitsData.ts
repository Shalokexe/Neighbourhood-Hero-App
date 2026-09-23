export interface HeroSuit {
  id: string;
  name: string;
  character: string;
  description: string;
  creditCost: number;
  perkName: string;
  perkBonus: string;
  previewImage: string;
  themeColor: string;
  accentColor: string;
  soundType: 'web' | 'venom' | 'gwen' | 'shield' | 'hulk' | 'claw';
}

export const HERO_SUITS_ROSTER: HeroSuit[] = [
  {
    id: 'suit_classic',
    name: 'Classic Red & Blue Suit',
    character: 'Peter Parker • Spider-Man',
    description: 'The iconic unmasked neighborhood suit. Balanced for all daily civic tasks and errands.',
    creditCost: 0, // Default Unlocked
    perkName: '⚡ Base Civic Boost',
    perkBonus: '+10% Base XP & Credits on All Missions',
    previewImage: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=600&q=80',
    themeColor: '#FF2A54',
    accentColor: '#00E5FF',
    soundType: 'web'
  },
  {
    id: 'suit_miles_tech',
    name: 'Miles Morales Tech Track',
    character: 'Miles Morales • Spider-Man',
    description: 'Sleek dark tech suit equipped with bio-electric energy sensors for environmental cleanups.',
    creditCost: 120,
    perkName: '⚡ Bio-Electric Bio-Cleaner',
    perkBonus: '+20% Extra XP on Lake Cleanups & Drives',
    previewImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80',
    themeColor: '#FF2A54',
    accentColor: '#E11D48',
    soundType: 'venom'
  },
  {
    id: 'suit_gwen_ghost',
    name: 'Ghost-Spider Web-Slinger',
    character: 'Gwen Stacy • Ghost-Spider',
    description: 'High-contrast cyan & magenta hooded suit built for squad coordination and speed.',
    creditCost: 180,
    perkName: '🌸 Squad Synergy Boost',
    perkBonus: '+25% Volunteer Squad RSVP Multiplier',
    previewImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    themeColor: '#00E5FF',
    accentColor: '#EC4899',
    soundType: 'gwen'
  },
  {
    id: 'suit_iron_spider',
    name: 'Iron Spider Nano-Armor',
    character: 'Tony Stark Tech',
    description: 'Gold-accented nanotechnology armor equipped with instant emergency SOS sensors.',
    creditCost: 350,
    perkName: '🦾 Nano-SOS Defense',
    perkBonus: 'Priority Signal Dispatch on Emergency SOS',
    previewImage: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=600&q=80',
    themeColor: '#F59E0B',
    accentColor: '#EF4444',
    soundType: 'shield'
  },
  {
    id: 'suit_symbiote',
    name: 'Bully Maguire Black Suit',
    character: 'Symbiote Enhanced',
    description: '"I\'m gonna put some dirt in your eye..." Ultra high-contrast black suit for maximum clout.',
    creditCost: 500,
    perkName: '🖤 Bully Multiplier',
    perkBonus: '2.0x Double Credit Rewards on Sunday Drives',
    previewImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    themeColor: '#A855F7',
    accentColor: '#111827',
    soundType: 'hulk'
  },
  {
    id: 'suit_wolverine_x',
    name: 'Wolverine Adamantium Armor',
    character: 'Logan • X-Men',
    description: 'Yellow & blue tactical suit with adamantium claw verification for rapid task completion.',
    creditCost: 300,
    perkName: '🐺 Adamantium Rush',
    perkBonus: 'Instant Auto-Verification on Completed Proofs',
    previewImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    themeColor: '#FACC15',
    accentColor: '#1E3A8A',
    soundType: 'claw'
  }
];
