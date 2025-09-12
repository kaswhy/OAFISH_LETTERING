"use client";

import clsx from "clsx";
import styles from "@/styles/ui/SeedCard.module.css";

const SRC_MAP = {
  daisy: "/assets/seeds/daisy.svg",
  rose: "/assets/seeds/rose.svg",
  freesia: "/assets/seeds/freesia.svg",
  mugung: "/assets/seeds/mugung.svg",
  susun: "/assets/seeds/susun.svg",
  sunflower: "/assets/seeds/sunflower.svg",
};

export default function SeedCard({
  type = "daisy",
  selected = false,
  className,
  onClick,
  ...rest
}) {
  const chosen = Object.prototype.hasOwnProperty.call(SRC_MAP, type)
    ? type
    : "daisy";
  const src = SRC_MAP[chosen];

  return (
    <button
      type="button"
      className={clsx(styles.card, selected && styles.selected, className)}
      data-selected={selected ? "" : undefined}
      aria-pressed={onClick ? selected : undefined}
      onClick={onClick}
      disabled={!onClick}
      {...rest}
    >
      <img src={src} alt={`${chosen} seed`} className={styles.image} />
    </button>
  );
}
