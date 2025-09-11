"use client";
import clsx from "clsx";
import { useId } from "react";
import styles from "@/styles/ui/TextArea.module.css";
import { countGraphemesHuman, sliceGraphemesHuman } from "@/utils/graphemeHuman";

export default function TextArea({
  value,
  onChange,
  placeholder = "이루고 싶은 것을 적어보세요",
  maxLength = 200,
  useGrapheme = false,
  className,
  ...rest
}) {
  const id = useId();

  const text = value ?? "";
  const count = useGrapheme ? countGraphemesHuman(text) : text.length;

  const nearLimit = !!maxLength && count >= maxLength - 10;
  const over = !!maxLength && count > maxLength; 

  function handleChange(e) {
    const v = e.target.value ?? "";
    if (useGrapheme && maxLength != null) {
      onChange(sliceGraphemesHuman(v, maxLength));
    } else {
      onChange(v);
    }
  }

  return (
    <div className={clsx(styles.box, className)}>
      <textarea
        id={id}
        className={styles.input}
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        {...rest}
      />

      <div
        className={clsx(
          styles.counter,
          nearLimit && styles.counterWarn,
          over && styles.counterOver
        )}
        aria-live="polite"
      >
        {count}/{maxLength ?? "∞"}
      </div>
    </div>
  );
}
