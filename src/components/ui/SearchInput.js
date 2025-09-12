import { useState } from "react";
import clsx from "clsx";
import styles from "@/styles/ui/SearchInput.module.css";
import IconButton from "./IconButton";

export default function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = "닉네임으로 내 새싹을 찾아보세요",
  className,
  onSearch,
}) {
  const [focus, setFocus] = useState(false);

  return (
    <div className={clsx(styles.box, focus && styles.focus, className)}>
      <IconButton
        src="/assets/ic_search.svg"
        ariaLabel="검색"
        onClick={onSearch}
        className={clsx(styles.iconBtn, styles.leftIcon)}
        width={12}
        height={14}
      />

      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />

      {value && (
        <IconButton
          src="/assets/ic_close.svg"
          ariaLabel="지우기"
          onClick={onClear}
          className={styles.iconBtn}
          width={11}
          height={11}
        />
      )}
    </div>
  );
}
