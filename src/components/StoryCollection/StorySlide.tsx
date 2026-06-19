"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./StoryCollection.module.css";
import { Story } from "@/types/story";

interface YTPlayer {
  seekTo: (seconds: number) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getPlayerState: () => number;
}

interface YTEvent {
  data: number;
  target: YTPlayer;
}

interface YTPlayerOptions {
  width?: string;
  height?: string;
  videoId: string;
  playerVars: {
    autoplay?: number;
    controls?: number;
    rel?: number;
    modestbranding?: number;
    mute?: number;
  };
  events: {
    onStateChange: (e: YTEvent) => void;
    onReady: (e: YTEvent) => void;
  };
}

declare global {
  interface Window {
    YT: {
      Player: new (el: HTMLElement, opts: YTPlayerOptions) => YTPlayer;
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Props {
  item: Story;
  dark?: boolean;
  position?: "left" | "right" | "center";
}

function loadYTApi(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT?.Player) return resolve();
    const existing = document.getElementById("yt-api-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "yt-api-script";
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
    window.onYouTubeIframeAPIReady = () => resolve();
  });
}

export default function StorySlide({ item, dark, position = "center" }: Props) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const total = item.slides.length;
  const pauseRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ytPlayersRef = useRef<Record<number, YTPlayer>>({});
  const iframeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const currentSlide = item.slides[current];
  const isCurrentVideo = currentSlide.type === "youtube";

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = useCallback(() => {
    stopTimer();
    const slide = item.slides[current];
    if (slide.type === "image") {
      timerRef.current = setInterval(() => {
        if (!pauseRef.current) {
          setCurrent((prev) => (prev + 1) % total);
        }
      }, 3000);
    }
  }, [current, item.slides, total]);

  useEffect(() => {
    if (currentSlide.type !== "youtube") return;

    const idx = current;
    const videoId = currentSlide.videoId;
    const container = iframeRefs.current[idx];
    if (!container) return;

    loadYTApi().then(() => {
      if (ytPlayersRef.current[idx]) {
        ytPlayersRef.current[idx].seekTo(0);
        ytPlayersRef.current[idx].playVideo();
        return;
      }
      ytPlayersRef.current[idx] = new window.YT.Player(container, {
        width: "1600",
        height: "900",
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          mute: 1,
        },
        events: {
          onReady: (e) => {
            console.log("container =", container);
            console.log("html =", container.innerHTML);

            e.target.mute();
          },
          onStateChange: (e: YTEvent) => {
            if (e.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            if (e.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
            if (e.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
              setCurrent((prev) => (prev + 1) % total);
            }
          },
        },
      });
    });
  }, [current, currentSlide, total]);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer]);

  const goTo = (index: number) => {
    const player = ytPlayersRef.current[current];
    if (player?.pauseVideo) {
      player.pauseVideo();
    }
    setCurrent(index);
  };

  const pauseTemporarily = () => {
    pauseRef.current = true;
    setTimeout(() => { pauseRef.current = false; }, 10000);
  };

  const handlePrev = () => { pauseTemporarily(); goTo((current - 1 + total) % total); };
  const handleNext = () => { pauseTemporarily(); goTo((current + 1) % total); };
  const handleDot  = (i: number) => { pauseTemporarily(); goTo(i); };

  const togglePlay = () => {
    const player = ytPlayersRef.current[current];
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const toggleMute = () => {
    const player = ytPlayersRef.current[current];
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  return (
    <div className={`${styles.card} ${styles[position]} ${dark ? styles.dark : ""}`}>
      <div className={styles.slideWrapper}>
        {item.slides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === current ? styles.active : ""}`}
          >
            {slide.type === "image" ? (
              <Image
                src={slide.src}
                alt={`${item.title} ${index + 1}`}
                fill
                className={styles.image}
                priority={index === 0}
              />
            ) : (
              // ← Thêm ytWrapper + ytBlocker để block hover vào YouTube
              <div className={styles.ytWrapper}>
                <div
                  ref={(el) => { iframeRefs.current[index] = el; }}
                  className={styles.ytContainer}
                />
                <div className={styles.ytBlocker} />
              </div>
            )}
          </div>
        ))}

        {!isCurrentVideo && (
          <div className={styles.overlay}>
            <h3>{item.title}</h3>
            <Link href={item.href} className={styles.button}>Shop Now</Link>
          </div>
        )}

        {isCurrentVideo && (
          <div className={styles.videoControls}>
            <button
              className={styles.videoBtn}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7L8 5z"/>
                </svg>
              )}
            </button>

            <button
              className={styles.videoBtn}
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97V10.18l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18L19 19.27 20.27 18 5.27 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>
          </div>
        )}
      </div>

      <div className={styles.nav}>
        <button className={styles.navArrow} onClick={handlePrev} aria-label="Previous">
          <svg width="16" height="24" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className={styles.navNumbers}>
          {item.slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.navNumber} ${index === current ? styles.navNumberActive : ""}`}
              onClick={() => handleDot(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button className={styles.navArrow} onClick={handleNext} aria-label="Next">
          <svg width="16" height="24" viewBox="0 0 8 14" fill="none">
            <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}