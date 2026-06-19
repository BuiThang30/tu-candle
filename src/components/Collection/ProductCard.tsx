import Image from "next/image";
import Link from "next/link";
import styles from "./Collection.module.css";

interface Props {
  name: string;
  price: number;
  image: string;
  href: string;
}

export default function ProductCard({
  name,
  price,
  image,
  href,
}: Props) {
  return (
    <Link href={href} className={styles.card}>
      <Image
        src={image}
        alt={name}
        width={500}
        height={700}
        className={styles.image}
      />

      <h3>{name}</h3>

      <p>
        {price.toLocaleString("vi-VN")}vnd
      </p>
    </Link>
  );
}