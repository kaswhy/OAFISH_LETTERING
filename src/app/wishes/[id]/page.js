"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWish } from "@/lib/wishes.api";

function WishDetailContent({ id }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["wish-detail", id],
    queryFn: () => getWish(id),
  });

  if (isLoading) return <div>불러오는 중…</div>;
  if (isError || !data) return <div>문제가 발생했어요.</div>;

  const detail = data.data;

  return (
    <div style={{ padding: 20 }}>
      <h1>소원 상세</h1>
      <p>ID: {detail.id}</p>
      <p>닉네임: {detail.nickname}</p>
      <p>내용: {detail.content}</p>
      <p>꽃 종류: {detail.plantKey}</p>
    </div>
  );
}

export default function WishDetailPage({ params }) {
  const { id } = use(params);

  return <WishDetailContent id={id} />;
}
