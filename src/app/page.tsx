import styles from "./page.module.css";
import Collection from "@/components/Collection/Collection";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import Navbar from "../components/Nav/nav";

import {
  newestCollection,
} from "@/data/products";

export default function Home() {
  return (
    <>
      <Navbar theme={1} />

      <div id="hero" className={styles.hero}>
        <div className={styles.content}>
          <iframe
            className={styles.heroVideo}
            src="https://www.youtube.com/embed/6uVJqD2hSGQ?autoplay=1&mute=1&loop=1&playlist=6uVJqD2hSGQ&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&playsinline=1"
            title="Hero Video"
            allow="autoplay"
            frameBorder="0"
          />

          <div className={styles.videoBlocker}></div>

          <Link href="/story" className={styles.storyBtn}>
            View story
          </Link>
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