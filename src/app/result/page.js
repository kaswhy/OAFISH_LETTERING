"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";

import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import styles from "@/styles/feature/wish/ResultPage.module.css";

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
  if (document?.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch (_) {}
  }
}

async function preloadResources(root) {
  const urls = new Set();

  root.querySelectorAll("img").forEach((img) => {
    const u = img.getAttribute("src") || img.currentSrc;
    if (u && !u.startsWith("_next/image")) urls.add(u);
  });

  root.querySelectorAll("*").forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage;
    if (!bg || bg === "none") return;
    const matches = [...bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)];
    matches.forEach(([, u]) => urls.add(u));
  });

  await Promise.all(
    [...urls].map(
      (u) =>
        new Promise((res) => {
          const img = new window.Image();
          img.onload = () => img.decode().then(res).catch(res);
          img.onerror = res;
          img.src = u;
        })
    )
  );
}

function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner} />
      <p>배경화면 불러오는 중...</p>
    </div>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const plantKey = searchParams.get("plantKey");

  const captureRef = useRef(null);
  const containerRef = useRef(null);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [text, setText] = useState("");

  if (!plantKey) return <div>잘못된 접근입니다.</div>;

  useEffect(() => {
    const prepare = async () => {
      await ensureFontsLoaded();
      if (containerRef.current) {
        await preloadResources(containerRef.current);
      }
      setIsPageLoading(false);
    };
    prepare();
  }, []);

  const handleSaveImage = async () => {
    if (!captureRef.current || isCapturing) return;

    setIsCapturing(true);
    await ensureFontsLoaded();

    const node = captureRef.current;

    const isIOS =
      /iP(ad|hone|od)/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    const scale = isIOS ? 2 : 3;

    try {
      const canvas = await html2canvas(node, {
        backgroundColor: null,
        scale,
        useCORS: true,
        width: node.offsetWidth,
        height: node.offsetHeight,
        onclone: (clonedDoc) => {
          if (!text) return;

          const clonedContainer = clonedDoc.querySelector(
            "[data-capture-target]"
          );
          if (!clonedContainer) return;

          const div = clonedDoc.createElement("div");
          div.innerText = text;

          Object.assign(div.style, {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#333",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "140%",
            fontFamily:
              '"Yoon-Childfundkorea-DaeHan", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
          });

          clonedContainer.appendChild(div);
        },
      });

      const link = document.createElement("a");
      link.download = "oafish-wish.png";
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (e) {
      alert("이미지 저장에 실패했습니다.");
      console.error(e);
    } finally {
      setIsCapturing(false);
    }
  };

  const src = SRC_MAP[plantKey];
  const alt = NAME_MAP[plantKey];

  return (
    <>
      {isPageLoading && <LoadingSpinner />}

      <div
        className={styles.container}
        ref={containerRef}
        style={{ visibility: isPageLoading ? "hidden" : "visible" }}
      >
        <div ref={captureRef} data-capture-target="true">
          <img
            src={src}
            alt={alt}
            width={257}
            height={457}
            draggable={false}
            className={styles.backgroundImage}
          />
        </div>

        <div className={styles.inputGroup}>
          <InputText
            placeholder="넣고 싶은 문구를 작성하세요 (20자 이내)"
            value={text}
            onChange={(value) => setText(value.slice(0, 20))}
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button
            className={styles.save}
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
    <Suspense fallback={<LoadingSpinner />}>
      <ResultContent />
    </Suspense>
  );
}
