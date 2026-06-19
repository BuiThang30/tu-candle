"use client";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div id="hero" className={styles.hero}>
      <div className={styles.content}>
        <iframe
          className={styles.heroVideo}
          src="https://www.youtube.com/embed/6uVJqD2hSGQ?autoplay=1&mute=1&loop=1&playlist=6uVJqD2hSGQ&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3"
          title="Hero Video"
          allow="autoplay"
          frameBorder="0"
        />

        <div className={styles.videoBlocker}></div>
      </div>
    </div>
  );
}