import type { Metadata } from "next";
import StoreClient from "./store-client";

export const metadata: Metadata = {
  title: "Store — HOLLOWYARD",
  description:
    "할로우야드의 게임 에셋을 검색하고 카테고리별로 비교한 뒤 원하는 외부 스토어에서 구매하세요.",
};

export default function StorePage() {
  return <StoreClient />;
}

