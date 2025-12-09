"use client";

import { useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import styles from "@/styles/ui/Modal.module.css";

export default function Modal({
  open,
  onClose,
  children,
  className,
  hideCloseButton = false,
  closeOnBackdrop = true,
  closeOnEsc = true,
  size = "md", // sm | md | lg
}) {
  // ESC 키로 닫기
  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={clsx(styles.dialog, styles[size], className)}
      >
        {!hideCloseButton && (
          <button className={styles.close} onClick={onClose} aria-label="닫기">
            <Image
              src="/assets/ic_close.svg"
              alt="닫기"
              width={24}
              height={24}
            />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
