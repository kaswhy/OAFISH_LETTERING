import { useState, useCallback } from "react";

export default function useWishPage() {
  const [nickname, setNickname] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const resetPage = useCallback(() => setPage(1), []);
  const updateTotal = useCallback((v) => setTotalPages(v), []);

  return {
    nickname,
    page,
    totalPages,

    setNickname,
    setPage,
    setTotalPages: updateTotal,

    resetPage,
  };
}
