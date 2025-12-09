"use client";

import clsx from "clsx";
import { useId } from "react";
import styles from "@/styles/ui/TextArea.module.css";
import useGraphemeTextControl from "@/hooks/useGraphemeTextControl";

export default function TextArea({
  value,
  onChange,
  placeholder = "이루고 싶은 것을 적어보세요",
  maxLength = 200,
  useGrapheme = false,
  size = "md",
  className,
  id: idProp,
  ...rest
}) {
  const reactId = useId();
  const id = idProp ?? reactId;
  const counterId = `${id}-counter`;

  const {
    text,
    count,
    handleChange,
    isNearLimit,
    isOverLimit,
    nativeMaxLength,
    compositionHandlers,
  } = useGraphemeTextControl({
    value,
    onChange,
    maxLength,
    useGrapheme,
  });

  return (
    <div className={clsx(styles.box, styles[size], className)}>
      <textarea
        id={id}
        className={styles.input}
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        aria-describedby={counterId}
        maxLength={nativeMaxLength}
        {...compositionHandlers}
        {...rest}
      />

      <div
        id={counterId}
        aria-live="polite"
        className={clsx(
          styles.counter,
          isNearLimit && styles.counterWarn,
          isOverLimit && styles.counterOver
        )}
      >
        {count}/{maxLength ?? "∞"}
      </div>
    </div>
  );
}
