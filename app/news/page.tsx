import type { Metadata } from "next";
import NewsClient from "./news-client";

export const metadata: Metadata = {
  title: "News & Events — HOLLOWYARD",
  description:
    "할로우야드의 공지, 업데이트와 이벤트 소식을 확인하세요. Read Hollowyard announcements, updates, and events.",
};

export default function NewsPage() {
  return <NewsClient />;
}
