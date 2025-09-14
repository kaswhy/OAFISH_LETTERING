"use client";

import { useEffect, useState, useRef } from "react";
import SearchInput from "@/components/ui/SearchInput";

export default function WishSearchBox({
  defaultValue = "",
  onSearch,
  debounceMs = 300,
}) {
  const [term, setTerm] = useState(defaultValue);
  const lastSentRef = useRef(defaultValue.trim());

  useEffect(() => {
    const t = setTimeout(() => {
      const v = term.trim();
      if (v !== lastSentRef.current) {
        onSearch?.(v, false);
        lastSentRef.current = v;
      }
    }, debounceMs);
    return () => clearTimeout(t);
  }, [term, debounceMs, onSearch]);

  const submit = (value = term) => {
    const v = String(value ?? "").trim();
    onSearch?.(v, true);
    lastSentRef.current = v;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <SearchInput
      value={term}
      onChange={setTerm}
      onClear={() => {
        setTerm("");
        submit("");
      }}
      onSearch={() => submit()}
      onKeyDown={handleKeyDown}
      placeholder="닉네임으로 내 새싹을 찾아보세요"
    />
  );
}
