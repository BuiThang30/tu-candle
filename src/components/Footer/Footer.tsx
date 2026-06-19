"use client";

import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="/contact">Liên kết</a>
        <a href="/doitra">Chính sách đổi trả</a>
        <a href="/vechungtoi">Liên hệ</a>
      </div>

      <button
        className={styles.star}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        <Image
          src="/images/star.png"
          alt="Back to top"
          width={104}
          height={104}
        />
      </button>
    </footer>
  );
}