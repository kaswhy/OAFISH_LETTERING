"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { listWishes } from "@/lib/wishes.api";
import Plant from "@/components/ui/Plant";

export default function WishPlantGrid({ page, nickname, onCardClick, onMeta }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishes", { page, size: 9, nickname }],
    queryFn: () => listWishes({ page, size: 9, nickname }),
  });

  const items = data?.items ?? [];
  const perPage = Number.isFinite(data?.size) ? data.size : 9;
  const total = Number.isFinite(data?.total) ? data.total : 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  useEffect(() => {
    onMeta?.({ totalPages });
  }, [totalPages, onMeta]);

  const messageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "200px",
    font: "var(--font-main1)",
    color: "var(--color-white)",
  };

  if (isLoading) {
    return <div style={messageStyle}>불러오는 중…</div>;
  }

  if (isError) {
    return <div style={messageStyle}>문제가 발생했어요.</div>;
  }

  if (items.length === 0) {
    return <div style={messageStyle}>앗! 새싹이 없어요.</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      {items.map((w) => (
        <Plant
          key={w.id}
          type={w.plantKey}
          label={w.nickname}
          onClick={() => onCardClick?.(w.id)}
        />
      ))}
    </div>
  );
}
