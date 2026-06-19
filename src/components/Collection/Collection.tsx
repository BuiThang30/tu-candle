import Link from "next/link";
import ProductCard from "./ProductCard";
import styles from "./Collection.module.css";
import { Product } from "@/types/product";

interface Props {
  title: string;
  products: Product[];
  showMore?: boolean;
}

export default function Collection({
  title,
  products,
  showMore = false,
}: Props) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>

      {showMore && (
        <Link href="/story" className={styles.moreBtn}>
          MORE
        </Link>
      )}

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
          />
        ))}
      </div>
    </section>
  );
}