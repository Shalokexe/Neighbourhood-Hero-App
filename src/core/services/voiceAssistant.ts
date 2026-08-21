/**
 * Multilingual Voice Assistant Service (Uber / Rapido style)
 * Supports Speech-to-Text (en-IN, hi-IN, pa-IN) and Text-to-Speech Voice Guidance
 */

export interface ParsedVoiceMission {
  title: string;
  description: string;
  category: string;
  creditReward: number;
  urgency: 'FLEXIBLE' | 'TODAY' | 'SOON' | 'URGENT';
}

class VoiceAssistantService {
  private recognition: any = null;
  private isListening: boolean = false;
  private synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-IN'; // Supports en-IN, hi-IN, pa-IN
      }
    }
  }

  public isSupported(): boolean {
    return !!this.recognition;
  }

  // Start Voice Listening (Speech to Text)
  public startListening(
    onResult: (text: string, isFinal: boolean) => void,
    onError?: (err: any) => void,
    language: string = 'en-IN'
  ) {
    if (!this.recognition) {
      if (onError) onError('Speech recognition is not supported in this browser.');
      return;
    }

    this.recognition.lang = language;
    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      let transcript = '';
      let isFinal = false;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          isFinal = true;
        }
      }

      onResult(transcript, isFinal);
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (e) {
      // Handle already started recognition
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // Text to Speech Voice Feedback (Uber/Rapido Voice Guide)
  public speak(text: string, language: string = 'en-IN') {
    if (!this.synth) return;

    this.synth.cancel(); // Stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    this.synth.speak(utterance);
  }

  // Parse spoken voice input into structured mission fields (Uber/Rapido AI style)
  public parseVoiceInput(text: string): ParsedVoiceMission {
    const lower = text.toLowerCase();

    let category = 'Other';
    let urgency: 'FLEXIBLE' | 'TODAY' | 'SOON' | 'URGENT' = 'TODAY';
    let creditReward = 25;

    if (lower.includes('grocery') || lower.includes('sabzi') || lower.includes('market') || lower.includes('store')) {
      category = 'Groceries';
      creditReward = 25;
    } else if (lower.includes('tutor') || lower.includes('study') || lower.includes('math') || lower.includes('book') || lower.includes('python')) {
      category = 'Tutoring';
      creditReward = 35;
    } else if (lower.includes('dog') || lower.includes('cat') || lower.includes('pet') || lower.includes('walk')) {
      category = 'Pets';
      creditReward = 25;
    } else if (lower.includes('wifi') || lower.includes('laptop') || lower.includes('software') || lower.includes('phone') || lower.includes('tech')) {
      category = 'Tech Help';
      creditReward = 30;
    } else if (lower.includes('heavy') || lower.includes('carry') || lower.includes('move') || lower.includes('luggage') || lower.includes('box')) {
      category = 'Moving/Carrying';
      creditReward = 30;
    } else if (lower.includes('pick') || lower.includes('deliver') || lower.includes('parcel') || lower.includes('document')) {
      category = 'Delivery/Pickup';
      creditReward = 20;
    }

    if (lower.includes('urgent') || lower.includes('fast') || lower.includes('immediately') || lower.includes('jaldi')) {
      urgency = 'URGENT';
      creditReward += 5;
    }

    // Capitalize first letter for title
    const title = text.charAt(0).toUpperCase() + text.slice(1);

    return {
      title: title.length > 50 ? title.substring(0, 50) + '...' : title,
      description: `Spoken Mission: "${text}". Voice recorded via Neighborhood Hero AI Voice Assistant.`,
      category,
      creditReward,
      urgency
    };
  }
}

export const voiceAssistant = new VoiceAssistantService();
