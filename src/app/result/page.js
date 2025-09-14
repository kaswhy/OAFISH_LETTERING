"use client";

import { Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, QueryClientProvider } from "@tanstack/react-query";
import * as htmlToImage from "html-to-image";

import { getWish } from "@/lib/wishes.api";
import { queryClient } from "@/lib/queryClient";

import Button from "@/components/ui/Button";
import WishModalContent from "@/components/ui/modal-contents/WishModalContent";
import styles from "@/styles/feature/wish/ResultPage.module.css";

function Result() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const wishId = searchParams.get("id");
  const modalContentRef = useRef(null);

  const {
    data: wish,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wish", wishId],
    queryFn: () => getWish(wishId),
    enabled: !!wishId,
  });

  const handleSaveImage = async () => {
    const node = modalContentRef.current;
    if (!node) return;

    try {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      } else {
        await new Promise((r) => setTimeout(r, 200));
      }

      node.classList.add(styles.captureFreeze);

      const rect = node.getBoundingClientRect();
      const scale = Math.max(2, Math.min(3, window.devicePixelRatio || 2));

      const dataUrl = await htmlToImage.toPng(node, {
        cacheBust: true,
        backgroundColor: "#F0ECE8",
        pixelRatio: scale,
        canvasWidth: Math.round(rect.width * scale),
        canvasHeight: Math.round(rect.height * scale),
        style: {
          transform: "none",
          transformOrigin: "top left",
          position: "static",
          margin: "0",
          boxShadow: "none",
          letterSpacing: "normal",
          lineHeight: "normal",
        },
      });

      const link = document.createElement("a");
      link.download = "oafish-wish.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("이미지 저장에 실패했습니다.", err);
    } finally {
      node?.classList.remove(styles.captureFreeze);
    }
  };

  if (isLoading)
    return <div className={styles.message}>새싹을 불러오는 중...</div>;
  if (isError || !wish)
    return <div className={styles.message}>새싹을 불러오지 못했습니다.</div>;
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>내 쪽지와 씨앗이 심어졌어요!</h2>
      <div ref={modalContentRef} className={styles.modalDialog}>
        <WishModalContent
          type={wish.data.plantKey}
          text={wish.data.content}
          author={wish.data.nickname}
        />
      </div>

      <div className={styles.buttonGroup}>
        <Button className={styles.save} onClick={handleSaveImage}>이미지로 저장하기</Button>
        <Button state="active" onClick={() => router.push("/")}>
          새싹 보러가기
        </Button>
      </div>
    </div>
  );
}

function ResultPage() {
  return (
    <Suspense fallback={<div className={styles.message}>로딩 중...</div>}>
      <Result />
    </Suspense>
  );
}

export default function ProvidedResultPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ResultPage />
    </QueryClientProvider>
  );
}
