"use client";

import type { Howl } from "howler";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  loadHoverSound,
  loadPortfolioSound,
  playHoverSound,
  unloadHoverSound,
} from "@/app/lib/portfolioAudio";

type SoundContextValue = {
  isPlaying: boolean;
  toggleSound: () => Promise<void>;
};

const SoundContext = createContext<SoundContextValue | null>(null);

const HOVER_SOUND_COOLDOWN_MS = 80;

export function SoundProvider({ children }: { children: ReactNode }) {
  const ambientRef = useRef<Howl | null>(null);
  const ambientPromiseRef = useRef<Promise<Howl> | null>(null);
  const lastHoverPlayRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const getAmbientSound = useCallback(async () => {
    if (ambientRef.current) return ambientRef.current;

    if (!ambientPromiseRef.current) {
      ambientPromiseRef.current = loadPortfolioSound().then((sound) => {
        ambientRef.current = sound;
        return sound;
      });
    }

    return ambientPromiseRef.current;
  }, []);

  const playHover = useCallback(async () => {
    if (!isPlaying) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const now = Date.now();
    if (now - lastHoverPlayRef.current < HOVER_SOUND_COOLDOWN_MS) return;
    lastHoverPlayRef.current = now;

    await playHoverSound();
  }, [isPlaying]);

  const toggleSound = useCallback(async () => {
    if (isPlaying) {
      const sound = ambientRef.current;
      if (!sound) return;

      sound.fade(sound.volume(), 0, 200);
      setTimeout(() => {
        sound.pause();
        setIsPlaying(false);
      }, 200);
      return;
    }

    const sound = await getAmbientSound();
    void loadHoverSound();
    sound.play();
    sound.fade(0, 0.8, 1000);
    setIsPlaying(true);
  }, [getAmbientSound, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const onMouseOver = (event: MouseEvent) => {
      const el = (event.target as Element).closest("a, button");
      if (!el || el.hasAttribute("data-no-hover-sound")) return;

      const from = event.relatedTarget as Node | null;
      if (from && el.contains(from)) return;

      void playHover();
    };

    document.addEventListener("mouseover", onMouseOver);
    return () => document.removeEventListener("mouseover", onMouseOver);
  }, [isPlaying, playHover]);

  useEffect(() => {
    return () => {
      ambientRef.current?.unload();
      ambientRef.current = null;
      ambientPromiseRef.current = null;
      unloadHoverSound();
    };
  }, []);

  return (
    <SoundContext.Provider value={{ isPlaying, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return context;
}
