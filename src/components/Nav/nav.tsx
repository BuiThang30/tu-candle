"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

interface NavbarProps {
  theme?: 0 | 1;
}

export default function Navbar({ theme = 0 }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"VN" | "EN">("VN");

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const header = document.querySelector("header");
      if (header && !header.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  const toggleLang = () => {
    setLang((prev) => (prev === "VN" ? "EN" : "VN"));
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.headerWrapper} ${open ? styles.headerWrapperOpen : ""}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <Image
              src={theme === 0 ? "/images/logo-black.png" : "/images/logo-white.png"}
              alt="TU"
              width={103}
              height={103}
              priority
            />
          </Link>

          <div className={styles.buttonsRow}>
            <button
              className={`${styles.menuBtn} ${theme === 0 ? styles.black : styles.white}`}
              onClick={() => setOpen(!open)}
            >
              MENU
            </button>

            <button
              className={`${styles.langBtn} ${theme === 0 ? styles.black : styles.white}`}
              onClick={toggleLang}
            >
              {lang === "VN" ? "VN/EN" : "EN/VN"}
            </button>

            {open && (
              <nav className={`${styles.nav} ${theme === 0 ? styles.navBlack : styles.navWhite}`}>
                <Link href="/#collection" onClick={(e) => {
                  const collection = document.getElementById("collection");
                  if (window.location.pathname === "/" && collection) {
                    e.preventDefault();
                    collection.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                  setOpen(false);
                }}>Bộ sưu tập</Link>
                <Link href="/story" onClick={() => setOpen(false)}>Stories</Link>
                <Link href="/candle-holder" onClick={() => setOpen(false)}>Candle Holder</Link>
                <Link href="/doitra" onClick={() => setOpen(false)}>Chính sách đổi trả</Link>
                <Link href="/contact" onClick={() => setOpen(false)}>Liên hệ</Link>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}