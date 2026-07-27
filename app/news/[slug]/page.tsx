import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsPost, newsPosts } from "../../../lib/posts";
import NewsDetailClient from "./news-detail-client";

export const dynamicParams = false;

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);

  if (!post) {
    return { title: "Post not found — HOLLOWYARD" };
  }

  return {
    title: `${post.title.en} — HOLLOWYARD`,
    description: `${post.summary.ko} ${post.summary.en}`,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getNewsPost(slug);

  if (!post) {
    notFound();
  }

  return <NewsDetailClient post={post} />;
}
