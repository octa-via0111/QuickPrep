import { useState, useEffect, useRef, useCallback } from 'react';
import { getStoredProfile } from '../utils/storage.js';

export const useSpeech = () => {
  const profile = getStoredProfile();
  const [speed, setSpeed] = useState(profile.voiceSpeed || 1.0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(false);
  
  const currentUtteranceRef = useRef(null);
  const currentTextRef = useRef('');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
    }
  }, []);

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback((text) => {
    if (!supported || !text) return;

    // Cancel any active speech
    window.speechSynthesis.cancel();
    setIsPaused(false);
    currentTextRef.current = text;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = speed;
    utterance.pitch = 1.0;

    // Try finding an Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find(v => v.lang.startsWith('id') || v.lang.includes('ID'));
    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsSpeaking(false);
      setIsPaused(false);
    };

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [supported, speed]);

  const pause = useCallback(() => {
    if (!supported) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [supported]);

  const resume = useCallback(() => {
    if (!supported) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
    } else if (currentTextRef.current && !isSpeaking) {
      speak(currentTextRef.current);
    }
  }, [supported, isSpeaking, speak]);

  const replay = useCallback(() => {
    if (currentTextRef.current) {
      speak(currentTextRef.current);
    }
  }, [speak]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, [supported]);

  const changeSpeed = useCallback((newSpeed) => {
    setSpeed(newSpeed);
    // If currently speaking, restart current text with new speed
    if (isSpeaking && currentTextRef.current) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentTextRef.current);
      utterance.lang = 'id-ID';
      utterance.rate = newSpeed;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [isSpeaking]);

  return {
    supported,
    isSpeaking,
    isPaused,
    speed,
    changeSpeed,
    speak,
    pause,
    resume,
    replay,
    stop
  };
};

export default useSpeech;
