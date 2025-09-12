"use client";

import { useMemo } from "react";
import styles from "@/styles/ui/modal-contents/WishModalContent.module.css";

export default function WishModalContent({ type, text, author }) {
  const src = useMemo(() => {
    const map = {
      daisy: "/assets/grown/daisy.svg",
      rose: "/assets/grown/rose.svg",
      freesia: "/assets/grown/freesia.svg",
      mugung: "/assets/grown/mugung.svg",
      susun: "/assets/grown/susun.svg",
      sunflower: "/assets/grown/sunflower.svg",
    };
    return map[type] ?? map.daisy;
  }, [type]);

  const normalized = text.replace(/\\n/g, "\n");

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <img src={src} alt="식물" className={styles.image} />
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
