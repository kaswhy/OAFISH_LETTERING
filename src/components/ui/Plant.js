"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import styles from "@/styles/ui/Plant.module.css";
import { breakLabelGrapheme } from "../../utils/breakLabelGrapheme.js";

const PLANTS = {
  daisy: { src: "/assets/plants/daisy.png", name: "데이지" },
  rose: { src: "/assets/plants/rose.png", name: "장미" },
  freesia: { src: "/assets/plants/freesia.png", name: "프리지아" },
  mugung: { src: "/assets/plants/mugung.png", name: "무궁화" },
  susun: { src: "/assets/plants/susun.png", name: "수선화" },
  sunflower: { src: "/assets/plants/sunflower.png", name: "해바라기" },
};

export default function Plant({
  type = "daisy",
  label = "",
  active = false,
  href,
  onClick,
  className,
  ...rest
}) {
  const plant = PLANTS[type] ?? PLANTS.daisy;
  const chunks = breakLabelGrapheme(label, 5);

  const Component = href ? Link : "button";

  return (
    <Component
      href={href}
      onClick={onClick}
      className={clsx(styles.item, active && styles.active, className)}
      {...rest}
    >
      <div className={styles.imageWrap}>
        <Image
          src={plant.src}
          alt={label || plant.name}
          width={94}
          height={94}
          draggable={false}
          className={styles.image}
        />
      </div>

      {label && (
        <div className={styles.label}>
          {chunks.map((chunk, i) => (
            <span key={i}>
              {chunk}
              {i < chunks.length - 1 && <br />}
            </span>
          ))}
        </div>
      )}
    </Component>
  );
}
