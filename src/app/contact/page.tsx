"use client";

import Navbar from "../../components/Nav/nav";
import styles from "./contactus.module.css";
import Footer from "@/components/Footer/Footer";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Navbar theme={0} />

      <div className={styles.main}>
        <div className={styles.container}>
          <p className={styles.heading}>
            {
              "Đừng ngần ngại liên hệ\nnếu bạn có bất kỳ câu hỏi nào hoặc ngỏ lời hợp tác.\nChúng tôi sẽ cố gắng hết sức để giúp đỡ."
            }
          </p>

          <div className={styles.links}>
            <a
              className={styles.link}
              href="mailto:tu.candle.vn@gmail.com"
            >
              tu.candle.vn@gmail.com
            </a>

            <a
              className={styles.link}
              href="https://www.instagram.com/tu.candle_/ "
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}