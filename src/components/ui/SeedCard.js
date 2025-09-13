"use client";

import Image from "next/image";
import clsx from "clsx";
import styles from "@/styles/ui/SeedCard.module.css";

const SRC_MAP = {
  daisy: "/assets/seeds/daisy.png",
  rose: "/assets/seeds/rose.png",
  freesia: "/assets/seeds/freesia.png",
  mugung: "/assets/seeds/mugung.png",
  susun: "/assets/seeds/susun.png",
  sunflower: "/assets/seeds/sunflower.png",
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
      <Image
        src={src}
        alt={`${chosen} seed`}
        className={styles.image}
        width={98}
        height={110}
      ></Image>
    </button>
  );
}
