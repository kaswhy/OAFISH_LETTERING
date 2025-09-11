import Image from "next/image";
import { useMemo } from "react";
import clsx from "clsx";
import styles from "@/styles/feature/Plant.module.css";

function breakLabel(text) {
  return text.match(/.{1,5}/g) ?? [];
}

export default function Plant({
  type = "daisy",
  label,
  active = false,
  size,
  onClick,
}) {
  const src = useMemo(() => {
    const map = {
      daisy: "/assets/plants/daisy.svg",
      rose: "/assets/plants/rose.svg",
      freesia: "/assets/plants/freesia.svg",
      mugung: "/assets/plants/mugung.svg",
      susun: "/assets/plants/susun.svg",
      sunflower: "/assets/plants/sunflower.svg",
    };
    return map[type] ?? map.daisy;
  }, [type]);

  return (
    <button
      type="button"
      className={clsx(styles.item, active && styles.active)}
      onClick={onClick}
    >
      <div className={styles.imageWrap}>
        <Image
          src={src}
          alt={type}
          className={styles.image}
          width={93.33}
          height={93.33}
        />
      </div>
      {label && (
        <div className={styles.label}>
          {breakLabel(label).map((chunk, i) => (
            <span key={i}>
              {chunk}
              <br />
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
