"use client";

import Image from "next/image";
import clsx from "clsx";
import styles from "@/styles/feature/wish/WishPager.module.css";

export default function WishPager({ page, totalPages, onPrev, onNext }) {
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  return (
    <div className={styles.container}>
      <button
        type="button"
        aria-label="이전 페이지"
        aria-disabled={isPrevDisabled}
        disabled={isPrevDisabled}
        onClick={onPrev}
        className={clsx(
          styles.button,
          styles.left,
          isPrevDisabled && styles.disabled
        )}
      >
        <Image
          src="/assets/chevron-left/active.svg"
          alt=""
          width={36}
          height={36}
          draggable={false}
          className={clsx(isPrevDisabled && styles.iconDisabled)}
        />
      </button>

      <button
        type="button"
        aria-label="다음 페이지"
        aria-disabled={isNextDisabled}
        disabled={isNextDisabled}
        onClick={onNext}
        className={clsx(
          styles.button,
          styles.right,
          isNextDisabled && styles.disabled
        )}
      >
        <Image
          src="/assets/chevron-right/active.svg"
          alt=""
          width={36}
          height={36}
          draggable={false}
          className={clsx(isNextDisabled && styles.iconDisabled)}
        />
      </button>
    </div>
  );
}
