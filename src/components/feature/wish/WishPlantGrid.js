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
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.size)) : 1;

  useEffect(() => {
    onMeta?.({ totalPages });
  }, [totalPages, onMeta]);

  return (
    <div>
      {isLoading && <div style={{ textAlign: "center" }}>불러오는 중…</div>}
      {isError && <div style={{ textAlign: "center" }}>문제가 발생했어요.</div>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 36,
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
    </div>
  );
}
