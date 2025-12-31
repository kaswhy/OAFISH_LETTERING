"use client";

import Image from "next/image";
import clsx from "clsx";
import styles from "@/styles/ui/SeedCard.module.css";

const SEEDS = {
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
  size = "md", // md | lg (확장성 고려)
  className,
  onClick,
  ...rest
}) {
  const src = SEEDS[type] ?? SEEDS.daisy;
  const isClickable = typeof onClick === "function";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isClickable}
      aria-pressed={isClickable ? selected : undefined}
      className={clsx(
        styles.card,
        styles[size],
        selected && styles.selected,
        !isClickable && styles.disabled,
        className
      )}
      {...rest}
    >
      <Image
        src={src}
        alt=""
        width={98}
        height={110}
        className={styles.image}
        draggable={false}
      />
    </button>
  );
}
