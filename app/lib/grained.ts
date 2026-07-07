/*! Grained.js - adapted for module use
 * Author: Sarath Saleem - https://github.com/sarathsaleem/grained
 * MIT license: http://opensource.org/licenses/MIT
 */

export type GrainedOptions = {
  animate?: boolean;
  patternWidth?: number;
  patternHeight?: number;
  grainOpacity?: number;
  grainDensity?: number;
  grainWidth?: number;
  grainHeight?: number;
  grainChaos?: number;
  grainSpeed?: number;
};

const DEFAULT_OPTIONS: Required<GrainedOptions> = {
  animate: true,
  patternWidth: 100,
  patternHeight: 100,
  grainOpacity: 0.1,
  grainDensity: 1,
  grainWidth: 1,
  grainHeight: 1,
  grainChaos: 0.5,
  grainSpeed: 20,
};

const PREFIXES = ["", "-moz-", "-o-", "-webkit-", "-ms-"];
const GRAIN_CLASS = "grained-noise";

function generateNoise(options: Required<GrainedOptions>) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  canvas.width = options.patternWidth;
  canvas.height = options.patternHeight;

  for (let w = 0; w < options.patternWidth; w += options.grainDensity) {
    for (let h = 0; h < options.patternHeight; h += options.grainDensity) {
      const rgb = (Math.random() * 256) | 0;
      ctx.fillStyle = `rgba(${rgb}, ${rgb}, ${rgb}, ${options.grainOpacity})`;
      ctx.fillRect(w, h, options.grainWidth, options.grainHeight);
    }
  }

  return canvas.toDataURL("image/png");
}

function ensureKeyframes() {
  if (document.getElementById("grained-animation")) return;

  const keyFrames = [
    "0%:-10%,10%",
    "10%:-25%,0%",
    "20%:-30%,10%",
    "30%:-30%,30%",
    "40%::-20%,20%",
    "50%:-15%,10%",
    "60%:-20%,20%",
    "70%:-5%,20%",
    "80%:-25%,5%",
    "90%:-30%,25%",
    "100%:-10%,10%",
  ];

  let animation = "";

  for (const prefix of PREFIXES) {
    animation += `@${prefix}keyframes grained{`;
    for (const frame of keyFrames) {
      const [step, translate] = frame.split(":");
      animation += `${step}{${prefix}transform:translate(${translate});}`;
    }
    animation += "}";
  }

  const style = document.createElement("style");
  style.id = "grained-animation";
  style.textContent = animation;
  document.head.appendChild(style);
}

export function grained(element: HTMLElement, options: GrainedOptions = {}) {
  const settings = { ...DEFAULT_OPTIONS, ...options };

  element.querySelector(`.${GRAIN_CLASS}`)?.remove();

  if (getComputedStyle(element).position === "static") {
    element.style.position = "relative";
  }
  element.style.overflow = "hidden";

  ensureKeyframes();

  const noise = generateNoise(settings);
  const grainEl = document.createElement("div");
  grainEl.className = GRAIN_CLASS;
  grainEl.setAttribute("aria-hidden", "true");

  grainEl.style.backgroundImage = `url(${noise})`;
  grainEl.style.position = "absolute";
  grainEl.style.pointerEvents = "none";
  grainEl.style.height = "300%";
  grainEl.style.width = "300%";
  grainEl.style.left = "-100%";
  grainEl.style.top = "-100%";
  grainEl.style.zIndex = "1";
  grainEl.style.mixBlendMode = "overlay";

  if (settings.animate) {
    grainEl.style.animationName = "grained";
    grainEl.style.animationIterationCount = "infinite";
    grainEl.style.animationDuration = `${settings.grainChaos}s`;
    grainEl.style.animationTimingFunction = `steps(${settings.grainSpeed}, end)`;
  }

  element.prepend(grainEl);
}

export function removeGrained(element: HTMLElement) {
  element.querySelector(`.${GRAIN_CLASS}`)?.remove();
  element.style.position = "";
  element.style.overflow = "";
}
