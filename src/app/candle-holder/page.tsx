"use client";

import Navbar from "../../components/Nav/nav";
import styles from "./candleholder.module.css";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Navbar theme={0} />
      <div className={styles.main}>
        <div className={styles.container}>
          <Image
            src="/images/emoji.png"
            alt="emoji"
            width={528}
            height={528}
            className={styles.emoji}
          />
          <p className={styles.heading}>Hãy đón chờ thiết kế từ Tụ Candle!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}