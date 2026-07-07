"use client";

import React from "react";
import styles from "./SoundButton.module.css";

type SoundButtonProps = {
  isPlaying: boolean;
  toggleSound: () => void;
};

const barAnimationClasses = [
  styles.animateSoundBar1,
  styles.animateSoundBar2,
  styles.animateSoundBar3,
  styles.animateSoundBar4,
];

const SoundButton = ({ isPlaying, toggleSound }: SoundButtonProps) => {
  return (
    <button
      type="button"
      onClick={toggleSound}
      data-no-hover-sound
      aria-label={isPlaying ? "Mute sound" : "Play sound"}
      aria-pressed={isPlaying}
      className={styles.button}
    >
      {barAnimationClasses.map((animationClass, i) => (
        <div
          key={i}
          className={`${styles.bar} ${
            isPlaying
              ? `${styles.barPlaying} ${animationClass}`
              : styles.barIdle
          }`}
        />
      ))}
    </button>
  );
};

export default SoundButton;
