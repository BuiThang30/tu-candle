"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ShopNow.module.css";
import Navbar from "../Nav/nav";
import type { Product } from "@/data/shopnow";

interface ProductDetailProps {
  product: Product;
}

const SPEC_LABELS: Record<string, string> = {
  thanhPhan: "THÀNH PHẦN",
  kichThuoc: "KÍCH THƯỚC",
  muiHuong: "MÙI HƯƠNG",
  trongLuong: "TRỌNG LƯỢNG",
  quaTrinhChay: "QUÁ TRÌNH CHÁY",
  thoiGianChay: "THỜI GIAN CHÁY",
  mauSac: "MÀU SẮC",
};

export default function ShopNow({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [embedHtml, setEmbedHtml] = useState<string>("");

  const decrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increase = () => setQuantity((prev) => Math.min(999, prev + 1));

  useEffect(() => {
    const loadSpotifyEmbed = async () => {
      try {
        const res = await fetch(
          `https://open.spotify.com/oembed?url=${encodeURIComponent(
            product.spotify.url
          )}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch Spotify embed");
        }

        const data = await res.json();
        setEmbedHtml(data.html ?? "");
      } catch (error) {
        console.error("Spotify embed error:", error);
        setEmbedHtml("");
      }
    };

    loadSpotifyEmbed();
  }, [product.spotify.url]);

  return (
    <>
      <Navbar theme={0} />

      <div className={styles.container}>
        {/* Left: Image */}
        <div className={styles.imageSide}>
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={1100}
            className={styles.productImage}
          />
        </div>

        {/* Right: Info */}
        <div className={styles.infoSide}>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.specs}>
            {(Object.entries(product.specs) as [string, string][]).map(
              ([key, value]) => (
                <p key={key}>
                  <strong>{SPEC_LABELS[key]}</strong> {value}
                </p>
              )
            )}
          </div>

          <h3 className={styles.subtitle}>
            THIẾT KẾ THỦ CÔNG HOÀN TOÀN TẠI VIỆT NAM
          </h3>

          <div className={styles.concept}>
            <h4>CONCEPT</h4>
            <p>{product.concept}</p>
          </div>

          <div className={styles.buyBox}>
            <div className={styles.topRow}>
              <span className={styles.price}>{product.price}</span>

              <div className={styles.quantity}>
                <button
                  type="button"
                  className={styles.quantityBtn}
                  onClick={decrease}
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  className={styles.quantityBtn}
                  onClick={increase}
                >
                  +
                </button>
              </div>
            </div>

            <Link
              href={`/thanh-toan?qty=${quantity}&name=${encodeURIComponent(
                product.checkoutName
              )}&image=${encodeURIComponent(product.image)}`}
              className={styles.checkoutBtn}
            >
              THANH TOÁN
            </Link>
          </div>

          <div className={styles.soundtrackBox}>
            <p className={styles.soundtrackLabel}>SOUNDTRACK</p>

            {embedHtml ? (
              <div
                className={styles.spotifyEmbed}
                dangerouslySetInnerHTML={{ __html: embedHtml }}
              />
            ) : (
              <a
                href={product.spotify.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.spotifyBanner}
              >
                <Image
                  src="/images/spotifi.png"
                  alt="Spotify Playlist"
                  width={792}
                  height={350}
                  className={styles.spotifyBannerImage}
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}