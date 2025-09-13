import clsx from "clsx";
import styles from "@/styles/ui/InputText.module.css";

const DEFAULT_ALLOW_ONE = /[A-Za-z0-9\uAC00-\uD7A3\u3131-\u318E]/u;

export default function InputText({
  value,
  onChange,
  placeholder,
  allowedPattern = DEFAULT_ALLOW_ONE,
  ...rest
}) {
  const hasValue = (value ?? "").length > 0;

  function handleBeforeInput(e) {
    if (e.isComposing || e.inputType?.startsWith("insertComposition")) return;
    const data = e.data;
    if (data == null) return;
    for (const ch of Array.from(data)) {
      if (!allowedPattern.test(ch)) {
        e.preventDefault();
        return;
      }
    }
  }

  function handleKeyDown(e) {
    if (e.isComposing) return;
    if (e.key && e.key.length === 1 && !allowedPattern.test(e.key)) {
      e.preventDefault();
    }
  }

  function handlePaste(e) {
    const text = e.clipboardData?.getData("text") ?? "";
    const filtered = Array.from(text)
      .filter((ch) => allowedPattern.test(ch))
      .join("");
    if (filtered.length !== text.length) {
      e.preventDefault();
      const input = e.currentTarget;
      const start = input.selectionStart ?? (value ?? "").length;
      const end = input.selectionEnd ?? start;
      const next =
        (value ?? "").slice(0, start) + filtered + (value ?? "").slice(end);
      onChange?.(next);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={clsx(styles.box, hasValue && styles.filled)}>
        <input
          className={styles.input}
          value={value}
          onChange={onChange}
          onBeforeInput={handleBeforeInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder}
          {...rest}
        />
      </div>
    </div>
  );
}
