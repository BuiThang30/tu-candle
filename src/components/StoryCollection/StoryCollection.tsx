import styles from "./StoryCollection.module.css";
import StorySlide from "./StorySlide";
import { Story } from "@/types/story";

interface Props {
  items: Story[];
}

export default function StoryCollection({ items }: Props) {
  const positions = ["right", "left", "center"] as const;

  return (
    <section className={styles.wrapper}>
      {items.map((item, index) => (
        <StorySlide
          key={item.id}
          item={item}
          dark={index === 1}
          position={positions[index] ?? "center"}
        />
      ))}
    </section>
  );
}