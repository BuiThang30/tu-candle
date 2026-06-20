"use client";

import styles from "./page.module.css";
import Collection from "@/components/Collection/Collection";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import Navbar from "../components/Nav/nav";
import { useState, useEffect, useRef } from "react";

import { newestCollection } from "@/data/products";

type WindowWithYT = Window & {
  YT?: unknown;
  onYouTubeIframeAPIReady?: () => void;
};

export default function Home() {
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerReadyRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const win = window as WindowWithYT;

    const onYouTubeReady = () => {
      playerReadyRef.current = true;
    };

    if (!win.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
      win.onYouTubeIframeAPIReady = onYouTubeReady;
    } else {
      playerReadyRef.current = true;
    }
  }, []);

  const postCommand = (func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*"
    );
  };

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      postCommand(next ? "mute" : "unMute");
      return next;
    });
  };

  const src =
    "https://www.youtube.com/embed/n5EPIfOnMSM?autoplay=1&loop=1&playlist=n5EPIfOnMSM&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&playsinline=1&mute=1&enablejsapi=1";

  return (
    <>
      <Navbar theme={1} />

      <div id="hero" className={styles.hero}>
        <div className={styles.content}>
          <iframe
            ref={iframeRef}
            className={styles.heroVideo}
            src={src}
            title="Hero Video"
            allow="autoplay"
            frameBorder="0"
          />

          <div className={styles.videoBlocker}></div>

          <Link href="/story" className={styles.storyBtn}>
            View story
          </Link>

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

      <div id="collection">
        <Collection
          title="Bộ sưu tập mới nhất"
          products={newestCollection}
          showMore
        />
      </div>

      <Footer />
    </>
  );
}