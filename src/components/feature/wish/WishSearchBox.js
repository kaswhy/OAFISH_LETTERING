"use client";
import { useState } from "react";
import SearchInput from "@/components/ui/SearchInput";

export default function WishSearchBox({ defaultValue = "", onSearch }) {
  const [term, setTerm] = useState(defaultValue);

  return (
    <SearchInput
      value={term}
      onChange={setTerm}
      onClear={() => setTerm("")}
      onSearch={() => onSearch?.(term.trim())}
      placeholder="닉네임으로 내 새싹을 찾아보세요"
    />
  );
}
