"use client";

import { useQuery } from "@tanstack/react-query";
import { getWish } from "@/lib/wishes.api";
import Modal from "@/components/ui/Modal";
import WishModalContent from "@/components/ui/modal-contents/WishModalContent";

export default function WishDetailModal({ id, onClose }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["wish", id],
    queryFn: () => getWish(id),
    enabled: !!id,
  });

  return (
    <Modal open={!!id} onClose={onClose}>
      {isLoading && <div>불러오는 중…</div>}
      {isError && <div>불러오지 못했어요.</div>}
      {data && (
        <WishModalContent
          type={data.data.plantKey}
          text={data.data.content}
          author={data.data.nickname}
        />
      )}
    </Modal>
  );
}
