"use client";

import { useMemo } from "react";
import clsx from "clsx";
import styles from "@/styles/ui/SeedCard.module.css";

export default function SeedCard({
  type = "daisy",
  selected = false,
  onClick,
}) {
  const src = useMemo(() => {
    const map = {
      daisy: "/assets/seeds/daisy.svg",
      rose: "/assets/seeds/rose.svg",
      freesia: "/assets/seeds/freesia.svg",
      mugung: "/assets/seeds/mugung.svg",
      susun: "/assets/seeds/susun.svg",
      sunflower: "/assets/seeds/sunflower.svg",
    };
    return map[type] ?? map.daisy;
  }, [type]);

  return (
    <div
      className={clsx(styles.card, selected && styles.selected)}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <img src={src} alt="seed" className={styles.image} />
    </div>
  );
}
