"use client";

import Image from "next/image";
import clsx from "clsx";
import styles from "@/styles/ui/Plant.module.css";

const SRC_MAP = {
  daisy: "/assets/plants/daisy.png",
  rose: "/assets/plants/rose.png",
  freesia: "/assets/plants/freesia.png",
  mugung: "/assets/plants/mugung.png",
  susun: "/assets/plants/susun.png",
  sunflower: "/assets/plants/sunflower.png",
};

const NAME_MAP = {
  daisy: "데이지",
  rose: "장미",
  freesia: "프리지아",
  mugung: "무궁화",
  susun: "수선화",
  sunflower: "해바라기",
};

function breakLabelGrapheme(text, size = 5) {
  const s = text ?? "";
  if (!s) return [];
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    const arr = Array.from(seg.segment(s), (x) => x.segment);
    const chunks = [];
    for (let i = 0; i < arr.length; i += size)
      chunks.push(arr.slice(i, i + size).join(""));
    return chunks;
  }
  return s.match(/.{1,5}/g) ?? [s];
}

export default function Plant({
  type = "daisy",
  label = "",
  active = false,
  className,
  onClick,
  ...rest
}) {
  const chosen = Object.prototype.hasOwnProperty.call(SRC_MAP, type)
    ? type
    : "daisy";
  const src = SRC_MAP[chosen];
  const alt = "";
  const chunks = label ? breakLabelGrapheme(label, 5) : [];

  return (
    <button
      type="button"
      className={clsx(styles.item, active && styles.active, className)}
      data-active={active ? "" : undefined}
      aria-pressed={active}
      aria-label={label || NAME_MAP[chosen]}
      title={label || NAME_MAP[chosen]}
      onClick={onClick}
      {...rest}
    >
      <div className={styles.imageWrap}>
        <Image
          src={src}
          alt={alt}
          className={styles.image}
          width={94}
          height={94}
          draggable={false}
          priority={false}
        />
      </div>

      {label && (
        <div className={styles.label} aria-hidden="true">
          {chunks.map((chunk, i) => (
            <span key={i}>
              {chunk}
              {i < chunks.length - 1 && <br />}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
