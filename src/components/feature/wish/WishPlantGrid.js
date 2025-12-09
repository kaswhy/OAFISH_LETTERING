"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { listWishes } from "@/lib/wishes.api";
import Plant from "@/components/ui/Plant";
import styles from "@/styles/feature/wish/WishPlantGrid.module.css";

export default function WishPlantGrid({ page, nickname, onMeta }) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishes", { page, size: 9, nickname }],
    queryFn: () => listWishes({ page, size: 9, nickname }),
    keepPreviousData: true,
    staleTime: 5000,
  });

  const { items, totalPages } = useMemo(() => {
    const items = data?.items ?? [];
    const size = data?.size ?? 9;
    const total = data?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / size));
    return { items, totalPages };
  }, [data]);

  useEffect(() => {
    onMeta?.({ totalPages });
  }, [totalPages, onMeta]);

  const Message = ({ children }) => (
    <div className={styles.message}>{children}</div>
  );

  if (isLoading) return <Message>불러오는 중…</Message>;
  if (isError) return <Message>문제가 발생했어요.</Message>;
  if (items.length === 0) return <Message>앗! 새싹이 없어요.</Message>;

  return (
    <div className={styles.grid}>
      {items.map((w) => (
        <Plant
          key={w.id}
          type={w.plantKey}
          label={w.nickname}
          id={w.id}
          onClick={() => router.push(`/wishes/${w.id}`)}
        />
      ))}
    </div>
  );
}
