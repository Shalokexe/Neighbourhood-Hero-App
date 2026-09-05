import React, { useState } from 'react';
import { Camera, CheckCircle2, ShieldCheck, X, UploadCloud, Image as ImageIcon } from 'lucide-react';

interface ProofOfWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitProof: (photoUrl: string, note: string) => void;
}

const SAMPLE_PROOF_PHOTOS = [
  { id: 'p1', title: 'Package Handed Over', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80' },
  { id: 'p2', title: 'Desk Assembly Done', url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80' },
  { id: 'p3', title: 'Plants Watered', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80' },
  { id: 'p4', title: 'Groceries Delivered', url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80' }
];

export const ProofOfWorkModal: React.FC<ProofOfWorkModalProps> = ({
  isOpen,
  onClose,
  onSubmitProof
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState(SAMPLE_PROOF_PHOTOS[0].url);
  const [note, setNote] = useState('Task completed successfully! Verified by helper.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitProof(selectedPhoto, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="fnsm-app-container max-w-sm w-full rounded-2xl p-5 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,229,255,0.2)] space-y-4 relative overflow-hidden text-white font-fnsm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#05070D] border border-cyan-400 p-0.5 flex items-center justify-center shadow-[0_0_12px_rgba(0,229,255,0.3)]">
              <Camera className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-orbitron font-extrabold text-white text-sm tracking-wider uppercase">
                PROOF OF WORK DOSSIER
              </h3>
              <p className="text-[10px] text-cyan-400 font-orbitron font-bold tracking-wider">
                ATTACH PHOTO EVIDENCE TO CLAIM ⬡ REWARDS
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Image Preview */}
        <div className="w-full h-44 rounded-xl overflow-hidden relative border border-cyan-500/30 group">
          <img src={selectedPhoto} alt="Proof preview" className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-[#05070D]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-orbitron font-bold text-white flex items-center gap-1 bg-[#05070D]/90 px-3 py-1.5 rounded-xl border border-cyan-500/40 shadow-lg uppercase">
              <UploadCloud className="w-4 h-4 text-cyan-400" /> CHANGE PHOTO
            </span>
          </div>
        </div>

        {/* Sample Proof Presets Selector */}
        <div>
          <label className="block text-[11px] font-orbitron font-extrabold text-cyan-300 mb-1.5 uppercase tracking-wider">
            SELECT PHOTO EVIDENCE / CAMERA CAPTURE:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SAMPLE_PROOF_PHOTOS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedPhoto(item.url)}
                className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all font-orbitron ${
                  selectedPhoto === item.url
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                    : 'border-slate-700 bg-[#05070D]/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-[10px] truncate uppercase">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Completion Note */}
        <div>
          <label className="block text-[11px] font-orbitron font-extrabold text-cyan-300 mb-1 uppercase tracking-wider">
            COMPLETION BRIEFING (OPTIONAL):
          </label>
          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-[#05070D] border border-cyan-500/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-fnsm"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-black text-xs rounded-xl uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-[1.01]"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>VERIFY EVIDENCE & COMPLETE MISSION →</span>
        </button>
      </div>
    </div>
  );
};

