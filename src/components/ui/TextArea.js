"use client";
import clsx from "clsx";
import { useId, useState } from "react";
import styles from "@/styles/ui/TextArea.module.css";
import {
  countGraphemesHuman,
  sliceGraphemesHuman,
} from "@/utils/graphemeHuman";

export default function TextArea({
  value,
  onChange,
  placeholder = "이루고 싶은 것을 적어보세요",
  maxLength = 200,
  useGrapheme = false,
  className,
  id: idProp,
  ...rest
}) {
  const reactId = useId();
  const id = idProp ?? reactId;
  const counterId = `${id}-counter`;

  const text = value ?? "";
  const count = useGrapheme ? countGraphemesHuman(text) : text.length;

  const nearLimit = maxLength != null && count >= maxLength - 10;
  const over = maxLength != null && count > maxLength;

  const [isComposing, setIsComposing] = useState(false);

  function handleChange(e) {
    const v = e.target.value ?? "";
    if (useGrapheme && maxLength != null) {
      const next = isComposing ? v : sliceGraphemesHuman(v, maxLength);
      onChange?.(next);
    } else {
      onChange?.(v);
    }
  }

  const nativeMaxLength = useGrapheme ? undefined : maxLength;

  return (
    <div className={clsx(styles.box, className)}>
      <textarea
        id={id}
        className={styles.input}
        value={text}
        onChange={handleChange}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={(e) => {
          setIsComposing(false);
          if (useGrapheme && maxLength != null) {
            const fixed = sliceGraphemesHuman(
              e.currentTarget.value ?? "",
              maxLength
            );
            if (fixed !== e.currentTarget.value) onChange?.(fixed);
          }
        }}
        placeholder={placeholder}
        aria-describedby={counterId}
        readOnly={onChange == null}
        {...rest}
        maxLength={nativeMaxLength}
      />

      <div
        id={counterId}
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
