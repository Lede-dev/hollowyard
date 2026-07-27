import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "../../../lib/products";
import ProductDetailClient from "./product-detail-client";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return { title: "Product not found — HOLLOWYARD" };
  }

  return {
    title: `${product.title.en} — HOLLOWYARD`,
    description: `${product.summary.ko} ${product.summary.en}`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

