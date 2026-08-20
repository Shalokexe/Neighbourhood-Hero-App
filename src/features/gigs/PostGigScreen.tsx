import React, { useState } from 'react';
import { useApp } from '../../core/context/AppContext';
import { CITIES_SEED, LOCALITIES_SEED } from '../../core/config/citiesData';
import { CATEGORY_ICONS } from '../../core/config/levelConfig';
import { GigCategory, GigUrgency } from '../../shared/types/domain';
import { PlusCircle, Zap, ShieldCheck, AlertTriangle } from 'lucide-react';

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
  
  const [errorMsg, setErrorMsg] = useState('');

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
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF2A54] to-[#00E5FF] p-0.5 flex items-center justify-center">
          <PlusCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-heading font-extrabold text-white text-xl">
            POST A MISSION
          </h1>
          <p className="text-xs text-slate-400">
            Micro-tasks usually take 30–45 seconds to post.
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-3 py-2 rounded-xl text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Picker */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Mission Category
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(CATEGORY_ICONS).slice(0, 9).map((catName) => {
              const isSelected = category === catName;
              return (
                <button
                  type="button"
                  key={catName}
                  onClick={() => setCategory(catName as GigCategory)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#00E5FF] font-bold shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                      : 'bg-[#121826] border-white/10 text-slate-300 hover:border-slate-600'
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
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Mission Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Need help carrying groceries upstairs"
            className="w-full bg-[#121826] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Mission Details & Instructions
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what needs to be done, meeting spot, or specific requirements..."
            className="w-full bg-[#121826] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>

        {/* Location Selection */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              City
            </label>
            <select
              value={cityId}
              onChange={(e) => {
                setCityId(e.target.value);
                const firstLoc = LOCALITIES_SEED.find(l => l.cityId === e.target.value);
                if (firstLoc) setLocalityId(firstLoc.id);
              }}
              className="w-full bg-[#121826] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
            >
              {CITIES_SEED.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Locality
            </label>
            <select
              value={localityId}
              onChange={(e) => setLocalityId(e.target.value)}
              className="w-full bg-[#121826] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
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
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Gig Credits Reward
            </label>
            <select
              value={creditReward}
              onChange={(e) => setCreditReward(Number(e.target.value))}
              className="w-full bg-[#121826] border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-400"
            >
              <option value={10}>10 Credits (Tiny Task ~15m)</option>
              <option value={25}>25 Credits (Small Task ~30m)</option>
              <option value={35}>35 Credits (Medium Task ~45m)</option>
              <option value={50}>50 Credits (Large Task ~1hr+)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Cash Budget (Optional ₹)
            </label>
            <input
              type="number"
              value={budget || ''}
              onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="e.g. 150"
              className="w-full bg-[#121826] border border-white/10 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
        </div>

        {/* Urgency & Duration */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Urgency
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as GigUrgency)}
              className="w-full bg-[#121826] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
            >
              <option value="FLEXIBLE">Flexible</option>
              <option value="TODAY">Today</option>
              <option value="SOON">Soon</option>
              <option value="URGENT">Urgent (+5 Bonus)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Estimated Duration
            </label>
            <input
              type="text"
              value={estimatedDuration}
              onChange={(e) => setEstimatedDuration(e.target.value)}
              placeholder="~30 min"
              className="w-full bg-[#121826] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
        </div>

        {/* Safety Note */}
        <div className="bg-[#121826]/60 border border-white/5 p-3 rounded-xl flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-400 leading-normal">
            Keep tasks legal, respectful, and safe. Exact location details are shared only with your accepted helper.
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-[#FF2A54] to-[#00E5FF] text-slate-950 font-heading font-extrabold rounded-xl text-sm shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-[1.01] transition-transform"
        >
          PUBLISH MISSION NOW →
        </button>
      </form>
    </div>
  );
};
