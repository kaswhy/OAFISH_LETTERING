"use client";

import Image from "next/image";
import { Suspense, useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import { getWish } from "@/lib/wishes.api";
import { queryClient } from "@/lib/queryClient";

import Button from "@/components/ui/Button";
import styles from "@/styles/feature/wish/ResultPage.module.css";
import InputText from "@/components/ui/InputText";

const rAF = () => new Promise((r) => requestAnimationFrame(r));

const SRC_MAP = {
  daisy: "/assets/background/daisy.png",
  rose: "/assets/background/rose.png",
  freesia: "/assets/background/freesia.png",
  mugung: "/assets/background/mugung.png",
  susun: "/assets/background/susun.png",
  sunflower: "/assets/background/sunflower.png",
};

const NAME_MAP = {
  daisy: "데이지",
  rose: "장미",
  freesia: "프리지아",
  mugung: "무궁화",
  susun: "수선화",
  sunflower: "해바라기",
};

async function ensureFontsLoaded() {
  try {
    if (document.fonts?.ready) await document.fonts.ready;
    const fontFaces = Array.from(document.fonts);
    await Promise.all(
      fontFaces.map(async (font) => {
        if (font.status !== "loaded") {
          try {
            await font.load();
          } catch (e) {}
        }
      })
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    await rAF();
    await rAF();
  } catch (error) {}
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
          const im = new window.Image();
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
      <p>배경화면 불러오는 중...</p>
    </div>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const wishId = searchParams.get("id");

  const captureRef = useRef(null);
  const containerRef = useRef(null);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [text, setText] = useState("");

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
    if (isQueryLoading || isError || !wish) return;
    const preparePage = async () => {
      await rAF();
      const node = containerRef.current;
      if (node) {
        try {
          await ensureFontsLoaded();
          await preloadResources(node);
          await new Promise((resolve) => setTimeout(resolve, 300));
          setIsPageLoading(false);
        } catch (e) {
          setTimeout(() => setIsPageLoading(false), 1000);
        }
      }
    };
    preparePage();
  }, [wish, isQueryLoading, isError]);

  const handleSaveImage = async () => {
    const node = captureRef.current;
    if (!node || isCapturing) return;

    setIsCapturing(true);
    try {
      await ensureFontsLoaded();
      node.style.transform = "scale(1)";

      await rAF();
      await rAF();

      const isIOS =
        /iP(ad|hone|od)/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      const scale = isIOS ? 2 : 3;

      const canvas = await html2canvas(node, {
        backgroundColor: null,
        scale: scale,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: node.offsetWidth,
        height: node.offsetHeight,

        onclone: (clonedDoc) => {
          clonedDoc.querySelectorAll("*").forEach((el) => {
            if (el.style) el.style.fontFamily = getComputedStyle(el).fontFamily;
          });

          if (text) {
            const clonedContainer = clonedDoc.querySelector(
              "[data-capture-target]"
            );

            if (clonedContainer) {
              const textDiv = clonedDoc.createElement("div");
              textDiv.innerText = text;

              Object.assign(textDiv.style, {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",

                color: "#333",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "20px",
                lineHeight: "140%",

                fontFamily:
                  '"Yoon-Childfundkorea-DaeHan", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
              });

              clonedContainer.appendChild(textDiv);
            }
          }
        },
        removeContainer: true,
      });

      const dataUrl = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = "oafish-wish.png";
      link.href = dataUrl;
      link.click();

      node.style.transform = "";
    } catch (error) {
      console.error("Capture failed:", error);
      alert("이미지 저장에 실패했습니다.");
    } finally {
      setIsCapturing(false);
    }
  };

  if (isQueryLoading) return <LoadingSpinner />;
  if (isError || !wish)
    return (
      <div className={styles.message}>배경화면을 불러오지 못했습니다.</div>
    );

  if (!wish?.data.plantKey) return <LoadingSpinner />;

  const flowerKey = wish.data.plantKey;
  const src = SRC_MAP[flowerKey];
  const alt = NAME_MAP[flowerKey];

  return (
    <>
      {isPageLoading && <LoadingSpinner />}

      <div
        className={styles.container}
        ref={containerRef}
        style={{ visibility: isPageLoading ? "hidden" : "visible" }}
      >
        <div ref={captureRef} data-capture-target="true">
          <Image
            src={src}
            alt={alt}
            width={257}
            height={457}
            draggable={false}
            priority={true}
            unoptimized={true}
            className={styles.backgroundImage}
          />
        </div>

        <div className={styles.inputGroup}>
          <InputText
            type="text"
            placeholder="넣고 싶은 문구를 작성하세요 (20자 이내)"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 20))}
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button
            style={{ backgroundColor: "var(--color-point1)", color: "var(--color-white)" }}
            onClick={handleSaveImage}
            disabled={isCapturing}
          >
            {isCapturing ? "다운 중..." : "다운받기"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default function ResultPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingSpinner />}>
        <ResultContent />
      </Suspense>
    </QueryClientProvider>
  );
}
