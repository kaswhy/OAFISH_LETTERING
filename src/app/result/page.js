"use client";

import { Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import * as htmlToImage from "html-to-image";

import { getWish } from "@/lib/wishes.api";
import { queryClient } from "@/lib/queryClient";

import Button from "@/components/ui/Button";
import WishModalContent from "@/components/ui/modal-contents/WishModalContent";
import styles from "@/styles/feature/wish/ResultPage.module.css";
const rAF = () => new Promise((r) => requestAnimationFrame(r));

async function preloadResources(root) {
  const urls = new Set();
  root.querySelectorAll("img").forEach((img) => {
    const u = img.currentSrc || img.src;
    if (u) urls.add(u);
  });
  root.querySelectorAll("*").forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage;
    if (!bg || bg === "none") return;
    const m = [...bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)];
    m.forEach(([, u]) => urls.add(u));
  });
  await Promise.all(
    [...urls].map(
      (u) =>
        new Promise((res) => {
          const im = new Image();
          im.onload = () => im.decode().then(res).catch(res);
          im.onerror = res;
          im.src = u;
        })
    )
  );
}

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
      // 1) 폰트 + 이미지/배경 선로딩
      if (document.fonts?.ready) await document.fonts.ready;
      await preloadResources(node);

      // 2) 렌더 안정화(애니/트랜스폼 끄기) + 두 프레임 대기
      node.classList.add(styles.captureFreeze);
      await rAF();
      await rAF();

      // 3) DPR 제한 (iOS <= 2)
      const isIOS =
        /iP(ad|hone|od)/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, isIOS ? 2 : 3);

      // 4) 캡처: pixelRatio만 지정 (canvasWidth/Height 제거)
      const dataUrl = await htmlToImage.toPng(node, {
        cacheBust: true,
        backgroundColor: "#F0ECE8",
        pixelRatio,
        style: {
          transform: "none",
          transformOrigin: "top left",
          position: "static",
          margin: "0",
          boxShadow: "none",
          letterSpacing: "normal",
          lineHeight: "normal",
          filter: "none",
        },
      });

      const link = document.createElement("a");
      link.download = "oafish-wish.png";
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("이미지 저장 실패:", e);
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
        <Button className={styles.save} onClick={handleSaveImage}>
          이미지로 저장하기
        </Button>
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
