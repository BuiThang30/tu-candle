"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {
    });
  }, []);

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      return next;
    });
  };

  return (
    <div id="hero" className={styles.hero}>
      <div className={styles.content}>
        <video
          ref={videoRef}
          className={styles.heroVideo}
          src="/images/background-1.mp4"
          autoPlay
          loop
          playsInline
        />

        <div className={styles.videoBlocker}></div>

        <button
          className={styles.muteBtn}
          onClick={toggleMute}
          aria-label={muted ? "Bật tiếng" : "Tắt tiếng"}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}