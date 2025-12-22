import { useState, useEffect, useCallback, useRef } from 'react';

interface UseWorkshopNarrationProps {
  text: string;
  onComplete?: () => void;
  onSentenceChange?: (index: number) => void;
}

export const useWorkshopNarration = ({
  text,
  onComplete,
  onSentenceChange,
}: UseWorkshopNarrationProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [rate, setRate] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const sentencesRef = useRef<string[]>([]);

  // Split text into sentences
  useEffect(() => {
    const sentences = text
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    sentencesRef.current = sentences;
  }, [text]);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // Select default voice (prefer female English voices)
      const defaultVoice = voices.find(v => 
        v.lang.startsWith('en') && v.name.includes('Female')
      ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
      
      setSelectedVoice(defaultVoice);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speakSentence = useCallback((index: number) => {
    if (index >= sentencesRef.current.length) {
      setIsPlaying(false);
      setCurrentSentenceIndex(0);
      onComplete?.();
      return;
    }

    const sentence = sentencesRef.current[index];
    const utterance = new SpeechSynthesisUtterance(sentence);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      if (!isPaused) {
        const nextIndex = index + 1;
        setCurrentSentenceIndex(nextIndex);
        onSentenceChange?.(nextIndex);
        speakSentence(nextIndex);
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [selectedVoice, rate, isPaused, onComplete, onSentenceChange]);

  const play = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      setIsPlaying(true);
      speakSentence(currentSentenceIndex);
    }
  }, [isPaused, currentSentenceIndex, speakSentence]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentSentenceIndex(0);
  }, []);

  const setPlaybackRate = useCallback((newRate: number) => {
    setRate(newRate);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      speakSentence(currentSentenceIndex);
    }
  }, [isPlaying, currentSentenceIndex, speakSentence]);

  const changeVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setSelectedVoice(voice);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      speakSentence(currentSentenceIndex);
    }
  }, [isPlaying, currentSentenceIndex, speakSentence]);

  const seekToSentence = useCallback((index: number) => {
    window.speechSynthesis.cancel();
    setCurrentSentenceIndex(index);
    if (isPlaying) {
      speakSentence(index);
    }
  }, [isPlaying, speakSentence]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return {
    isPlaying,
    isPaused,
    currentSentenceIndex,
    sentences: sentencesRef.current,
    rate,
    availableVoices,
    selectedVoice,
    play,
    pause,
    stop,
    setPlaybackRate,
    changeVoice,
    seekToSentence,
  };
};
