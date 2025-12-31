"use client";

import clsx from "clsx";
import styles from "@/styles/ui/SearchInput.module.css";
import IconButton from "./IconButton";

export default function SearchInput({
  value,
  onChange,
  onClear,
  onSearch,
  placeholder = "닉네임으로 내 새싹을 찾아보세요",
  className,
  onKeyDown,
  size = "md",
}) {
  const handleKeyDown = (e) => {
    onKeyDown?.(e);
    if (e.key === "Enter") onSearch?.();
  };

  return (
    <div className={clsx(styles.container, styles[size], className)}>
      <IconButton
        src="/assets/ic_search.svg"
        ariaLabel="검색"
        onClick={onSearch}
        className={clsx(styles.iconBtn, styles.leftIcon)}
        size={20}
      />

      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />

      {value && (
        <IconButton
          src="/assets/ic_close.svg"
          ariaLabel="지우기"
          onClick={onClear}
          className={styles.iconBtn}
          size={18}
        />
      )}
    </div>
  );
}
