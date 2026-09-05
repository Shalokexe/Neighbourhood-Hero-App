import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { CITIES_SEED, LOCALITIES_SEED } from '../../core/config/citiesData';
import { CATEGORY_ICONS } from '../../core/config/levelConfig';
import { GigCategory, GigUrgency } from '../../shared/types/domain';
import { VoiceAssistantModal } from '../../shared/components/VoiceAssistantModal';
import { ParsedVoiceMission } from '../../core/services/voiceAssistant';
import { PlusCircle, Zap, ShieldCheck, AlertTriangle, Mic, Radio, Hexagon } from 'lucide-react';

interface PostGigScreenProps {
  onSuccess: () => void;
}

export const PostGigScreen: React.FC<PostGigScreenProps> = ({ onSuccess }) => {
  const { currentUser, selectedCityId, postGig } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<GigCategory>('Groceries');
  const [cityId, setCityId] = useState(selectedCityId);
  
  const cityLocalities = LOCALITIES_SEED.filter(l => l.cityId === cityId);
  const [localityId, setLocalityId] = useState(cityLocalities[0]?.id || 'loc_kh_sec125');

  const [creditReward, setCreditReward] = useState(25);
  const [budget, setBudget] = useState<number | undefined>(150);
  const [urgency, setUrgency] = useState<GigUrgency>('TODAY');
  const [estimatedDuration, setEstimatedDuration] = useState('~30 min');
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleApplyVoiceMission = (parsed: ParsedVoiceMission) => {
    setTitle(parsed.title);
    setDescription(parsed.description);
    setCategory(parsed.category as GigCategory);
    setCreditReward(parsed.creditReward);
    setUrgency(parsed.urgency);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a clear mission title.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please provide a short description.');
      return;
    }

    const selectedCityObj = CITIES_SEED.find(c => c.id === cityId) || CITIES_SEED[0];
    const selectedLocObj = LOCALITIES_SEED.find(l => l.id === localityId) || LOCALITIES_SEED[0];

    postGig({
      title: title.trim(),
      description: description.trim(),
      category,
      cityId: selectedCityObj.id,
      cityName: selectedCityObj.name,
      localityId: selectedLocObj.id,
      localityName: selectedLocObj.name,
      approxAddress: `Near ${selectedLocObj.name}, ${selectedCityObj.name}`,
      exactAddress: `${selectedLocObj.name}, ${selectedCityObj.name}`,
      latitude: selectedLocObj.centerLatitude,
      longitude: selectedLocObj.centerLongitude,
      budget: budget ? Number(budget) : undefined,
      creditReward,
      urgency,
      estimatedDuration
    });

    onSuccess();
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4 font-fnsm text-slate-100">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#05070D] border border-cyan-400/50 p-0.5 flex items-center justify-center shadow-[0_0_12px_rgba(0,229,255,0.3)]">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h1 className="font-orbitron font-extrabold text-white text-base tracking-wider uppercase flex items-center gap-1.5">
              CITIZEN DISPATCH COMMS
            </h1>
            <p className="text-[10px] text-cyan-400 font-bold tracking-widest font-orbitron">
              BROADCAST NEW NEIGHBORHOOD ACTIVITY
            </p>
          </div>
        </div>

        {/* AI Voice Input Trigger Button */}
        <button
          type="button"
          onClick={() => setShowVoiceModal(true)}
          className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-orbitron font-black rounded-xl text-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,229,255,0.4)] hover:scale-105 transition-transform"
        >
          <Mic className="w-3.5 h-3.5 fill-slate-950" />
          <span>🎙️ DICTATE</span>
        </button>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/40 text-red-300 px-3 py-2 rounded-xl text-xs flex items-center gap-2 font-orbitron">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="fnsm-app-container rounded-2xl p-4 border border-cyan-500/30 space-y-4">
        {/* Category Picker */}
        <div>
          <label className="block text-xs font-orbitron font-extrabold text-cyan-300 mb-2 uppercase tracking-wider">
            ACTIVITY CATEGORY
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(CATEGORY_ICONS).slice(0, 9).map((catName) => {
              const isSelected = category === catName;
              return (
                <button
                  type="button"
                  key={catName}
                  onClick={() => setCategory(catName as GigCategory)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-orbitron font-bold transition-all uppercase ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                      : 'bg-[#05070D]/80 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                  }`}
                >
                  {catName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-orbitron font-extrabold text-cyan-300 mb-1 uppercase tracking-wider">
            DISPATCH TITLE
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Help needed carrying grocery supplies to floor 3..."
            className="w-full bg-[#05070D] border border-cyan-500/30 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-fnsm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-orbitron font-extrabold text-cyan-300 mb-1 uppercase tracking-wider">
            MISSION DETAILS & BRIEFING
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Specify meeting location, entry codes, or special instructions..."
            className="w-full bg-[#05070D] border border-cyan-500/30 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-fnsm"
          />
        </div>

        {/* Location Selection */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-orbitron font-extrabold text-cyan-300 mb-1 uppercase tracking-wider">
              TARGET CITY
            </label>
            <select
              value={cityId}
              onChange={(e) => {
                setCityId(e.target.value);
                const firstLoc = LOCALITIES_SEED.find(l => l.cityId === e.target.value);
                if (firstLoc) setLocalityId(firstLoc.id);
              }}
              className="w-full bg-[#05070D] border border-cyan-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-orbitron font-bold"
            >
              {CITIES_SEED.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-orbitron font-extrabold text-cyan-300 mb-1 uppercase tracking-wider">
              LOCALITY RADAR
            </label>
            <select
              value={localityId}
              onChange={(e) => setLocalityId(e.target.value)}
              className="w-full bg-[#05070D] border border-cyan-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-orbitron font-bold"
            >
              {cityLocalities.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Reward & Budget */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-orbitron font-extrabold text-amber-300 mb-1 flex items-center gap-1 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ⬡ CREDITS BOUNTY
            </label>
            <select
              value={creditReward}
              onChange={(e) => setCreditReward(Number(e.target.value))}
              className="w-full bg-[#05070D] border border-amber-500/40 rounded-xl px-3 py-2 text-xs text-amber-300 font-orbitron font-bold focus:outline-none focus:border-amber-400"
            >
              <option value={10}>10 Credits (Tiny Task ~15m)</option>
              <option value={25}>25 Credits (Small Task ~30m)</option>
              <option value={35}>35 Credits (Medium Task ~45m)</option>
              <option value={50}>50 Credits (Large Task ~1hr+)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-orbitron font-extrabold text-emerald-300 mb-1 uppercase tracking-wider">
              CASH OFFER (₹ OPTIONAL)
            </label>
            <input
              type="number"
              value={budget || ''}
              onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="e.g. 150"
              className="w-full bg-[#05070D] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-emerald-400 font-orbitron font-bold placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        {/* Urgency & Duration */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-orbitron font-extrabold text-cyan-300 mb-1 uppercase tracking-wider">
              PRIORITY LEVEL
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as GigUrgency)}
              className="w-full bg-[#05070D] border border-cyan-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-orbitron font-bold"
            >
              <option value="FLEXIBLE">Flexible</option>
              <option value="TODAY">Today</option>
              <option value="SOON">Soon</option>
              <option value="URGENT">Urgent (+5 Bonus)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-orbitron font-extrabold text-cyan-300 mb-1 uppercase tracking-wider">
              ESTIMATED TIME
            </label>
            <input
              type="text"
              value={estimatedDuration}
              onChange={(e) => setEstimatedDuration(e.target.value)}
              placeholder="~30 min"
              className="w-full bg-[#05070D] border border-cyan-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-orbitron font-bold"
            />
          </div>
        </div>

        {/* Safety Note */}
        <div className="bg-[#05070D]/80 border border-cyan-500/20 p-3 rounded-xl flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-400 leading-normal font-fnsm">
            Encrypted connection active. Exact GPS details are strictly disclosed to approved Spidey helpers only.
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-black rounded-xl text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all hover:scale-[1.01]"
        >
          BROADCAST DISPATCH TO HERO NETWORK →
        </button>
      </form>

      {/* AI Voice Assistant Modal for Dictating Tasks */}
      <VoiceAssistantModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        onVoiceMissionParsed={handleApplyVoiceMission}
      />
    </div>
  );
};

