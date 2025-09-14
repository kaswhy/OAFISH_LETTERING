"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import { getWish } from "@/lib/wishes.api";
import { queryClient } from "@/lib/queryClient";

import Button from "@/components/ui/Button";
import WishModalContent from "@/components/ui/modal-contents/WishModalContent";
import styles from "@/styles/feature/wish/ResultPage.module.css";

const rAF = () => new Promise((r) => requestAnimationFrame(r));

async function ensureFontsLoaded() {
  console.log("Checking font loading status...");

  try {
    if (document.fonts?.ready) {
      await document.fonts.ready;
      console.log("document.fonts.ready completed");
    }

    const fontFaces = Array.from(document.fonts);
    const loadPromises = fontFaces.map(async (font) => {
      if (font.status !== "loaded") {
        try {
          await font.load();
          console.log(`Font loaded: ${font.family}`);
        } catch (e) {
          console.warn(`Failed to load font: ${font.family}`, e);
        }
      }
    });
    await Promise.all(loadPromises);

    await new Promise((resolve) => setTimeout(resolve, 500));
    await rAF();
    await rAF();

    console.log("Font loading check completed");
  } catch (error) {
    console.warn("Font loading check failed:", error);
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
}

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

function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>새싹을 심는 중...</p>
    </div>
  );
}

function Result() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const wishId = searchParams.get("id");
  const modalContentRef = useRef(null);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);

  const {
    data: wish,
    isLoading: isQueryLoading,
    isError,
  } = useQuery({
    queryKey: ["wish", wishId],
    queryFn: () => getWish(wishId),
    enabled: !!wishId,
  });

  useEffect(() => {
    if (isQueryLoading || isError || !wish) {
      return;
    }

    const preparePage = async () => {
      await rAF();

      const node = modalContentRef.current;
      if (node) {
        try {
          console.log("Starting page preparation...");

          await ensureFontsLoaded();
          await preloadResources(node);
          await new Promise((resolve) => setTimeout(resolve, 300));

          console.log("Page preparation completed");
          setIsPageLoading(false);
        } catch (e) {
          console.error("Page preparation failed:", e);
          setTimeout(() => setIsPageLoading(false), 1000);
        }
      }
    };

    preparePage();
  }, [wish, isQueryLoading, isError]);

  const handleSaveImage = async () => {
    const node = modalContentRef.current;
    if (!node || isCapturing) return;

    setIsCapturing(true);
    try {
      console.log("Starting image capture...");

      await ensureFontsLoaded();

      node.style.transform = "translateZ(0)";
      node.offsetHeight;
      await rAF();
      await rAF();

      const isIOS =
        /iP(ad|hone|od)/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      const scale = isIOS ? 2 : 2.5;

      console.log(`Capturing with scale: ${scale}`);

      const canvas = await html2canvas(node, {
        backgroundColor: "#F0ECE8",
        scale: scale,
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: false,
        logging: false,
        letterRendering: true,
        onclone: (clonedDoc) => {
          const clonedElements = clonedDoc.querySelectorAll("*");
          clonedElements.forEach((el) => {
            const computedStyle = getComputedStyle(el);
            if (computedStyle.fontFamily) {
              el.style.fontFamily = computedStyle.fontFamily;
              el.style.webkitFontSmoothing = "antialiased";
              el.style.mozOsxFontSmoothing = "grayscale";
              el.style.textRendering = "optimizeLegibility";
            }
          });
          return clonedDoc;
        },

        imageTimeout: 10000,
        removeContainer: true,
        width: node.scrollWidth,
        height: node.scrollHeight,

        x: 0,
        y: 0,
      });

      console.log(`Canvas created: ${canvas.width}x${canvas.height}`);

      const dataUrl = canvas.toDataURL("image/png", 1.0);

      const link = document.createElement("a");
      link.download = "oafish-wish.png";
      link.href = dataUrl;
      link.click();

      node.style.transform = "";

      console.log("Image capture completed successfully");
    } catch (error) {
      console.error("Image capture failed:", error);

      let errorMessage = "이미지 저장에 실패했습니다.";
      if (error.name === "SecurityError") {
        errorMessage += " (보안 정책으로 인한 제한)";
      } else if (error.message?.includes("canvas")) {
        errorMessage += " (캔버스 생성 실패)";
      }

      alert(`${errorMessage}\n잠시 후 다시 시도해주세요.`);
    } finally {
      setIsCapturing(false);
    }
  };

  if (isQueryLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !wish) {
    return <div className={styles.message}>새싹을 불러오지 못했습니다.</div>;
  }

  return (
    <>
      {isPageLoading && <LoadingSpinner />}

      <div
        className={styles.container}
        style={{ visibility: isPageLoading ? "hidden" : "visible" }}
      >
        <h2 className={styles.heading}>내 쪽지와 씨앗이 심어졌어요!</h2>

        <div ref={modalContentRef} className={styles.modalDialog}>
          <WishModalContent
            type={wish.data.plantKey}
            text={wish.data.content}
            author={wish.data.nickname}
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button
            style={{ backgroundColor: "#D2EDF3", color: "var(--color-point1)" }}
            onClick={handleSaveImage}
            disabled={isCapturing}
          >
            {isCapturing ? "저장 중..." : "이미지로 저장하기"}
          </Button>
          <Button state="active" onClick={() => router.push("/")}>
            새싹 보러가기
          </Button>
        </div>
      </div>
    </>
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
