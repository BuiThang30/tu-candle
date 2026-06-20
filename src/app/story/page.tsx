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
          Giữa khoảnh khắc giao thoa của ánh sáng chạng vạng và bóng tối, một quầng sáng dịu êm được thắp lên, mang theo lực hấp dẫn vô hình, bẻ cong khoảng cách và kéo các bản thể tụ lại bên nhau. NẾN TỤ HỌP tái lập trật tự không gian: Thế giới của sự tối giản, ánh sáng dịu êm và sự gắn kết.
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