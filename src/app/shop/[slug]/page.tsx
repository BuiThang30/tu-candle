import ShopNow from "@/components/ShopNow/ShopNow";
import Navbar from "../../../components/Nav/nav";
import Footer from "@/components/Footer/Footer";

import { getProductBySlug } from "@/data/shopnow";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar theme={0} />

      <ShopNow product={product} />

      <Footer />
    </>
  );
}