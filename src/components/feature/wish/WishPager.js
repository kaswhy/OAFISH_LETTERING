"use client";

import Image from "next/image";
import clsx from "clsx";
import styles from "@/styles/feature/wish/WishPager.module.css";

export default function WishPager({ page, totalPages, onPrev, onNext }) {
  const leftDisabled = page <= 1;
  const rightDisabled = page >= totalPages;

  return (
    <div className={styles.pagerLayer}>
      <button
        aria-label="이전"
        onClick={onPrev}
        disabled={leftDisabled}
        className={clsx(
          styles.pagerButton,
          styles.left,
          leftDisabled && styles.disabled
        )}
      >
        <Image
          src={
            leftDisabled
              ? "/assets/chevron-left/inactive.svg"
              : "/assets/chevron-left/active.svg"
          }
          alt="이전"
          width={36}
          height={36}
          draggable={false}
        />
      </button>

      <button
        aria-label="다음"
        onClick={onNext}
        disabled={rightDisabled}
        className={clsx(
          styles.pagerButton,
          styles.right,
          rightDisabled && styles.disabled
        )}
      >
        <Image
          src={
            rightDisabled
              ? "/assets/chevron-right/inactive.svg"
              : "/assets/chevron-right/active.svg"
          }
          alt="다음"
          width={36}
          height={36}
          draggable={false}
        />
      </button>
    </div>
  );
}
