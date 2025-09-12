"use client";

import clsx from "clsx";
import styles from "@/styles/ui/Modal.module.css";

export default function Modal({ open, onClose, children, className }) {
  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={clsx(styles.dialog, className)}
      >
        <button className={styles.close} onClick={onClose} aria-label="닫기">
          <img src="/assets/ic_close.svg" alt="닫기" />
        </button>
        {children}
      </div>
    </div>
  );
}
