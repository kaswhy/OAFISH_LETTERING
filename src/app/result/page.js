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

  const rAF = () => new Promise((r) => requestAnimationFrame(r));

  const handleSaveImage = async () => {
    const node = modalContentRef.current;
    if (!node) return;
    try {
      if (document.fonts?.ready) await document.fonts.ready;
      await preloadResources(node);

      node.style.setProperty("--cap-scale", "1.4");
      node.classList.add(styles.captureHiRes);

      await rAF();
      await rAF();

      const isIOS =
        /iP(ad|hone|od)/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      const candidates = isIOS ? [2, 1.75] : [2.5, 2];
      let dataUrl;
      for (const pr of candidates) {
        try {
          dataUrl = await htmlToImage.toPng(node, {
            cacheBust: true,
            backgroundColor: "#F0ECE8",
            pixelRatio: pr,
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
          break;
        } catch {}
      }
      if (!dataUrl) throw new Error("capture failed");

      const a = document.createElement("a");
      a.download = "oafish-wish.png";
      a.href = dataUrl;
      a.click();
    } catch (e) {
      console.error("이미지 저장 실패:", e);
    } finally {
      node.classList.remove(styles.captureHiRes);
      node.style.removeProperty("--cap-scale");
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
