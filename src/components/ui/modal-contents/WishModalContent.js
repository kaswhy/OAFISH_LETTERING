"use client";

import Image from "next/image";
import styles from "@/styles/ui/modal-contents/WishModalContent.module.css";

const SRC_MAP = {
  daisy: "/assets/grown/daisy.png",
  rose: "/assets/grown/rose.png",
  freesia: "/assets/grown/freesia.png",
  mugung: "/assets/grown/mugung.png",
  susun: "/assets/grown/susun.png",
  sunflower: "/assets/grown/sunflower.png",
};

const NAME_MAP = {
  daisy: "데이지",
  rose: "장미",
  freesia: "프리지아",
  mugung: "무궁화",
  susun: "수선화",
  sunflower: "해바라기",
};

function normalizeText(t) {
  const s = t ?? "";
  return s.replace(/\r\n/g, "\n").replace(/\\r\\n|\\n/g, "\n");
}

export default function WishModalContent({
  type = "daisy",
  text = "",
  author = "",
}) {
  const chosen = Object.prototype.hasOwnProperty.call(SRC_MAP, type)
    ? type
    : "daisy";
  const src = SRC_MAP[chosen];
  const alt = `${NAME_MAP[chosen]} 아이콘`;
  const normalized = normalizeText(text);

  return (
    <div className={styles.wrap} data-type={chosen}>
      <div className={styles.header}>
        <Image
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={105}
          height={105}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.text}>{normalized}</div>
      </div>
      <div className={styles.footer}>
        <div className={styles.author}>{author}</div>
      </div>
    </div>
  );
}
