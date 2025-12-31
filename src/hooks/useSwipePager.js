import { useSwipeable } from "react-swipeable";
import { useCallback } from "react";

export default function useSwipePager({
  page,
  totalPages,
  setPage,
  setIsSwiping,
}) {
  const next = useCallback(() => {
    setPage((p) => Math.min(totalPages, p + 1));
  }, [setPage, totalPages]);

  const prev = useCallback(() => {
    setPage((p) => Math.max(1, p - 1));
  }, [setPage]);

  return useSwipeable({
    onSwipeStart: () => setIsSwiping(true),
    onSwipeEnd: () => setIsSwiping(false),

    onSwipedLeft: next,
    onSwipedRight: prev,

    delta: 40,
    trackMouse: true,
  });
}
