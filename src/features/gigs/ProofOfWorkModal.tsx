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
      <div className="glass-card max-w-sm w-full rounded-3xl p-5 border border-white/20 shadow-2xl space-y-4 relative overflow-hidden bg-black text-white">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00E5FF] to-emerald-400 p-0.5 flex items-center justify-center">
              <Camera className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-white text-sm">
                PROOF OF WORK PHOTO
              </h3>
              <p className="text-[10px] text-slate-400">
                Attach photo evidence to claim your credits
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Image Preview */}
        <div className="w-full h-44 rounded-2xl overflow-hidden relative border border-white/20 group">
          <img src={selectedPhoto} alt="Proof preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-bold text-white flex items-center gap-1 bg-black/70 px-3 py-1.5 rounded-xl border border-white/20">
              <UploadCloud className="w-4 h-4 text-[#00E5FF]" /> Change Photo
            </span>
          </div>
        </div>

        {/* Sample Proof Presets Selector */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
            Select Photo Evidence / Camera Photo:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SAMPLE_PROOF_PHOTOS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedPhoto(item.url)}
                className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                  selectedPhoto === item.url
                    ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-white font-bold'
                    : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                <span className="text-[10px] truncate">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Completion Note */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
            Completion Note (Optional):
          </label>
          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-[#00E5FF] to-emerald-400 text-slate-950 font-heading font-extrabold text-xs rounded-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>VERIFY PROOF & SUBMIT MISSION</span>
        </button>
      </div>
    </div>
  );
};
