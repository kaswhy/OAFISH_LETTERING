"use client";

import clsx from "clsx";
import Image from "next/image";
import styles from "@/styles/ui/modal-contents/WishModalContent.module.css";

const PLANTS = {
  daisy: { src: "/assets/grown/daisy.png", name: "데이지" },
  rose: { src: "/assets/grown/rose.png", name: "장미" },
  freesia: { src: "/assets/grown/freesia.png", name: "프리지아" },
  mugung: { src: "/assets/grown/mugung.png", name: "무궁화" },
  susun: { src: "/assets/grown/susun.png", name: "수선화" },
  sunflower: { src: "/assets/grown/sunflower.png", name: "해바라기" },
};

function normalize(text = "") {
  return text.replace(/\r\n/g, "\n");
}

export default function WishModalContent({
  type = "daisy",
  text = "",
  author = "",
  bodyHeight = 200, // 기본 본문 높이 (스크롤 영역)
  className,
}) {
  const plant = PLANTS[type] ?? PLANTS.daisy;
  const normalized = normalize(text);

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.header}>
        <Image
          src={plant.src}
          alt={plant.name}
          width={105}
          height={105}
          priority
        />
      </div>

      <div className={styles.body} style={{ maxHeight: bodyHeight }}>
        <div className={styles.text}>{normalized}</div>
      </div>

      <div className={styles.footer}>
        <div className={styles.author}>{author}</div>
      </div>
    </div>
  );
}
