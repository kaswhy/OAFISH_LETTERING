"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getWish } from "@/lib/wishes.api";
import { use } from "react";
import Button from "@/components/ui/Button";
import styles from "@/styles/feature/wish/WishPage.module.css";

const SRC_MAP = {
  daisy: "/assets/flower/daisy.png",
  rose: "/assets/flower/rose.png",
  freesia: "/assets/flower/freesia.png",
  mugung: "/assets/flower/mugung.png",
  susun: "/assets/flower/susun.png",
  sunflower: "/assets/flower/sunflower.png",
};

const NAME_MAP = {
  daisy: "데이지",
  rose: "장미",
  freesia: "프리지아",
  mugung: "무궁화",
  susun: "수선화",
  sunflower: "해바라기",
};

function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>활짝 핀 꽃 불러오는 중...</p>
    </div>
  );
}

function WishDetailContent({ id }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["wish-detail", id],
    queryFn: () => getWish(id),
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <div className={styles.loadingContainer}>문제가 발생했어요</div>;

  const { plantKey, nickname, reply, content } = data.data;

  const src = SRC_MAP[plantKey];
  const alt = NAME_MAP[plantKey];

  return (
    <div className={styles.container}>
      <Image
        src={src}
        alt={alt}
        width={180}
        height={180}
        draggable={false}
        priority={true}
        unoptimized={true}
      />

      <div className={styles.receiver}>
        <div>{nickname}</div>
        <div>님께</div>
      </div>

      <div className={styles.reply}>{reply}</div>

      <div className={styles.dottedLine}></div>

      <div className={styles.sender}>
        <div>{nickname}</div>
        <div>님이 남겼던 쪽지</div>
      </div>

      <div className={styles.reply}>{content}</div>

      <div className={styles.downloadButton}>
        <Link
          href={`/result?plantKey=${plantKey}`}
          className={styles.downloadLink}
        >
          <Button
            style={{
              backgroundColor: "var(--color-point1)",
              color: "var(--color-white)",
            }}
          >
            배경화면 다운받기
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function WishDetailPage({ params }) {
  const resolved = use(params);
  const { id } = resolved;

  return <WishDetailContent id={id} />;
}
