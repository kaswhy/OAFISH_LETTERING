"use client";

import Link from "next/link";
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
  const chunks = label ? breakLabelGrapheme(label, 5) : [];

  return (
    <Link
      href={`/wishes/${rest.id}`}
      className={clsx(styles.item, className)}
      {...rest}
    >
      <div className={styles.imageWrap}>
        <Image
          src={src}
          alt={label}
          className={styles.image}
          width={94}
          height={94}
          draggable={false}
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
    </Link>
  );
}
