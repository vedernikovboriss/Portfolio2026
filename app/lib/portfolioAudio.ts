import type { Howl } from "howler";
import { AUDIO_URLS, MEDIA_CDN_ORIGIN } from "@/app/data/externalLinks";

const HOVER_SOUND_VOLUME = 0.25;

function preconnectToAudioCdn() {
  if (document.querySelector("link[data-audio-cdn-preconnect]")) return;

  const preconnect = document.createElement("link");
  preconnect.rel = "preconnect";
  preconnect.href = MEDIA_CDN_ORIGIN;
  preconnect.crossOrigin = "anonymous";
  preconnect.setAttribute("data-audio-cdn-preconnect", "");
  document.head.appendChild(preconnect);

  const dnsPrefetch = document.createElement("link");
  dnsPrefetch.rel = "dns-prefetch";
  dnsPrefetch.href = MEDIA_CDN_ORIGIN;
  dnsPrefetch.setAttribute("data-audio-cdn-preconnect", "");
  document.head.appendChild(dnsPrefetch);
}

async function createHowl(
  src: string,
  options: Omit<import("howler").HowlOptions, "src">,
) {
  preconnectToAudioCdn();
  const { Howl } = await import("howler");
  return new Howl({ ...options, src: [src] });
}

export async function loadPortfolioSound(): Promise<Howl> {
  return createHowl(AUDIO_URLS.ambient, {
    volume: 0,
    loop: true,
  });
}

let hoverSound: Howl | null = null;
let hoverSoundPromise: Promise<Howl> | null = null;

export async function loadHoverSound(): Promise<Howl> {
  if (hoverSound) return hoverSound;

  if (!hoverSoundPromise) {
    hoverSoundPromise = createHowl(AUDIO_URLS.hover, {
      volume: HOVER_SOUND_VOLUME,
      preload: true,
    }).then((sound) => {
      hoverSound = sound;
      return sound;
    });
  }

  return hoverSoundPromise;
}

export async function playHoverSound() {
  const sound = await loadHoverSound();
  sound.volume(HOVER_SOUND_VOLUME);
  if (sound.playing()) sound.stop();
  sound.play();
}

export function unloadHoverSound() {
  hoverSound?.unload();
  hoverSound = null;
  hoverSoundPromise = null;
}
