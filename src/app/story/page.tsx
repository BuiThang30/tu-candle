import Image from "next/image";
import styles from "./story.module.css";
import Hero from "@/components/Hero/Hero";
import StoryCollection from "@/components/StoryCollection/StoryCollection";
import { stories } from "@/data/stories";
import Navbar from "../../components/Nav/nav"



export default function Story() {
  return (
    <>
      <Navbar theme={1} />
      <Hero/>

      <div className={styles.collectionSection}>
        <h2 className={styles.title}>
          BỘ SƯU TẬP NẾN TỤ HỌP
        </h2>

        <p className={styles.description}>
          GIỮA KHOẢNH KHẮC GIAO THOA CỦA ÁNH SÁNG CHẠNG<br />
          VÀ BÓNG TỐI, MỘT KHÔNG GIAN DỊU ÊM ĐƯỢC<br />
          THẮP LÊN, MANG THEO LỜI HẠN ĐẦY TỈ MỈ. BÊN CẠNH<br />
          NHỮNG CÂY NẾN CÓ HƯƠNG THƠM TỰ NHIÊN, NẾN TỤ HỌP<br />
          THỔI THÊM MỘT KHÔNG GIAN THỂ HIỆN CỦA<br />
          SỰ TỎA CẢM, ÁNH SÁNG DỊU ÊM VÀ SỰ GẮN KẾT.<br />
        </p>

        <div className={styles.imageGrid}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/story-1.jpg"
              alt="Story"
              fill
              className={styles.storyImage}
            />
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="/images/story-4.jpg"
              alt="Story"
              fill
              className={styles.storyImage}
            />
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="/images/story-3.jpg"
              alt="Story"
              fill
              className={styles.storyImage}
            />
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="/images/story-2.jpg"
              alt="Story"
              fill
              className={styles.storyImage}
            />
          </div>
        </div>
      </div>

      <div className={styles.collectionImage}>
        <Image
          src="/images/story-5.jpg"
          alt=""
          width={1440}
          height={1080}
          className={styles.mainImage}
        />
      </div>

      <StoryCollection items={stories} />
    </>
  );
}