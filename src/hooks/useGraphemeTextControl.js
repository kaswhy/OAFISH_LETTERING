import { useState } from "react";
import {
  countGraphemesHuman,
  sliceGraphemesHuman,
} from "@/utils/graphemeHuman";

export default function useGraphemeTextControl({
  value,
  onChange,
  maxLength,
  useGrapheme,
}) {
  const text = value ?? "";
  const [isComposing, setIsComposing] = useState(false);

  const count = useGrapheme ? countGraphemesHuman(text) : text.length;

  const isNearLimit = maxLength != null && count >= maxLength - 10;
  const isOverLimit = maxLength != null && count > maxLength;

  const handleChange = (e) => {
    const v = e.target.value ?? "";

    if (!useGrapheme || maxLength == null) {
      onChange?.(v);
      return;
    }

    if (isComposing) {
      onChange?.(v);
      return;
    }

    const next = sliceGraphemesHuman(v, maxLength);
    onChange?.(next);
  };

  const nativeMaxLength = useGrapheme ? undefined : maxLength;

  return {
    text,
    count,
    handleChange,
    nativeMaxLength,
    isNearLimit,
    isOverLimit,
    compositionHandlers: {
      onCompositionStart: () => setIsComposing(true),
      onCompositionEnd: (e) => {
        setIsComposing(false);
        if (useGrapheme && maxLength != null) {
          const fixed = sliceGraphemesHuman(
            e.currentTarget.value ?? "",
            maxLength
          );
          if (fixed !== e.currentTarget.value) onChange?.(fixed);
        }
      },
    },
  };
}
