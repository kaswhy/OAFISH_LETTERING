import clsx from "clsx";
import styles from "@/styles/ui/InputText.module.css";
import useInputFilter from "@/hooks/useInputFilter";

const DEFAULT_ALLOW_ONE = /[A-Za-z0-9\uAC00-\uD7A3\u3131-\u318E]/u;

export default function InputText({
  value,
  onChange,
  placeholder,
  variant = "default",
  size = "md",
  allowedPattern = DEFAULT_ALLOW_ONE,
  className,
  ...rest
}) {
  const hasValue = Boolean(value && value.length > 0);

  const { handleBeforeInput, handleKeyDown, handlePaste } = useInputFilter(
    value ?? "",
    onChange,
    allowedPattern
  );

  return (
    <div
      className={clsx(
        styles.box,
        styles[variant],
        styles[size],
        hasValue && styles.filled,
        className
      )}
    >
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBeforeInput={handleBeforeInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={placeholder}
        disabled={variant === "disabled"}
        {...rest}
      />
    </div>
  );
}
