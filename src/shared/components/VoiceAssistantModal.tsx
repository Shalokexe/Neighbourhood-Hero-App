import React, { useState, useEffect } from 'react';
import { voiceAssistant, ParsedVoiceMission } from '../../core/services/voiceAssistant';
import { Mic, MicOff, Volume2, X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceMissionParsed?: (mission: ParsedVoiceMission) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onVoiceMissionParsed
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('en-IN');
  const [parsedResult, setParsedResult] = useState<ParsedVoiceMission | null>(null);
  const [statusMsg, setStatusMsg] = useState('Tap microphone to speak your mission or ask for help');

  useEffect(() => {
    if (isOpen) {
      voiceAssistant.speak(
        'Neighborhood Hero Voice Assistant active. Speak your task or tap the microphone to dictate a mission.',
        language
      );
    } else {
      voiceAssistant.stopListening();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleListening = () => {
    if (isListening) {
      voiceAssistant.stopListening();
      setIsListening(false);
      setStatusMsg('Tap microphone to start speaking');
    } else {
      setTranscript('');
      setParsedResult(null);
      setIsListening(true);
      setStatusMsg('Listening... Speak clearly into your microphone.');

      voiceAssistant.startListening(
        (text, isFinal) => {
          setTranscript(text);
          if (isFinal) {
            setIsListening(false);
            const parsed = voiceAssistant.parseVoiceInput(text);
            setParsedResult(parsed);
            setStatusMsg('Voice mission parsed successfully!');
            voiceAssistant.speak(`Got it! Created mission: ${parsed.title} under ${parsed.category}.`, language);
          }
        },
        (err) => {
          setIsListening(false);
          setStatusMsg(`Voice error: ${err}. Please try again.`);
        },
        language
      );
    }
  };

  const handleApplyVoiceMission = () => {
    if (parsedResult && onVoiceMissionParsed) {
      onVoiceMissionParsed(parsedResult);
      onClose();
    }
  };

  const handleSpeakHelpGuide = () => {
    voiceAssistant.speak(
      'Neighborhood Hero helps you post micro tasks, assist nearby neighbors in Kharar, Mohali, Chandigarh, and Panchkula, earn Gig Credits, level up your hero rank, and redeem café vouchers!',
      language
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card max-w-sm w-full rounded-3xl p-5 border border-white/20 shadow-2xl space-y-4 relative overflow-hidden bg-black text-white">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00E5FF] to-[#2563EB] p-0.5 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-white text-sm">
                AI VOICE ASSISTANT
              </h3>
              <p className="text-[10px] text-slate-400">
                Uber / Rapido Style Voice Input
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-white/10">
          {[
            { id: 'en-IN', label: 'English' },
            { id: 'hi-IN', label: 'हिन्दी (Hindi)' },
            { id: 'pa-IN', label: 'ਪੰਜਾਬੀ (Punjabi)' }
          ].map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                language === lang.id
                  ? 'bg-white text-black font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Dynamic Waveform Visualizer & Microphone Center Trigger */}
        <div className="py-6 text-center flex flex-col items-center justify-center space-y-3">
          <button
            onClick={handleToggleListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 relative ${
              isListening
                ? 'bg-[#FF2A54] shadow-[0_0_40px_rgba(255,42,84,0.6)] animate-pulse scale-110'
                : 'bg-white text-black hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
            }`}
          >
            {isListening ? (
              <Mic className="w-8 h-8 text-white animate-bounce" />
            ) : (
              <Mic className="w-8 h-8 text-black" />
            )}

            {/* Ripple Wave Rings if Listening */}
            {isListening && (
              <span className="absolute inset-0 rounded-full border-2 border-[#FF2A54] animate-ping opacity-75" />
            )}
          </button>

          <p className="text-xs font-semibold text-slate-300 max-w-xs">
            {statusMsg}
          </p>

          {/* Live Speech Transcript */}
          {transcript && (
            <div className="p-3 bg-slate-900 rounded-xl border border-white/10 text-xs text-slate-200 italic max-w-xs text-center">
              "{transcript}"
            </div>
          )}
        </div>

        {/* Parsed Mission Result Preview */}
        {parsedResult && (
          <div className="glass-card p-3 rounded-2xl border border-[#00E5FF]/40 space-y-2 bg-[#00E5FF]/5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-bold text-[#00E5FF] uppercase">
                {parsedResult.category}
              </span>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
                +{parsedResult.creditReward} CREDITS
              </span>
            </div>

            <h4 className="font-heading font-bold text-white text-xs">
              {parsedResult.title}
            </h4>

            {onVoiceMissionParsed && (
              <button
                onClick={handleApplyVoiceMission}
                className="w-full py-2 bg-white text-black font-heading font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-200 transition-colors"
              >
                <span>AUTO-FILL MISSION FORM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Voice Help Audio Guide Button */}
        <button
          onClick={handleSpeakHelpGuide}
          className="w-full py-2.5 bg-slate-900 border border-white/10 hover:border-white/30 text-slate-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-2"
        >
          <Volume2 className="w-4 h-4 text-[#00E5FF]" />
          <span>LISTEN TO VOICE APP GUIDE</span>
        </button>
      </div>
    </div>
  );
};
