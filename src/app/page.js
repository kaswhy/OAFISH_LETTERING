"use client";

import Link from "next/link";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

import WishSearchBox from "@/components/feature/wish/WishSearchBox";
import WishPlantGrid from "@/components/feature/wish/WishPlantGrid";
import WishDetailModal from "@/components/feature/wish/WishDetailModal";
import WishPager from "@/components/feature/wish/WishPager";
import Button from "@/components/ui/Button";

import styles from "@/styles/feature/wish/MainPage.module.css";

export default function MainPage() {
  const [nickname, setNickname] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => setPage((p) => Math.min(totalPages, p + 1)),
    onSwipedRight: () => setPage((p) => Math.max(1, p - 1)),
    onSwiping: ({ deltaX, deltaY }) => {
      if (Math.abs(deltaX) > Math.abs(deltaY)) setIsSwiping(true);
    },
    onSwiped: () => setIsSwiping(false),
    trackTouch: true,
    trackMouse: false,
    delta: 30,
    preventScrollOnSwipe: true,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.main}>
        <div className={styles.viewport}>
          <section className={styles.hero}>
            <div className={styles.headline}>
              <h3 className={styles.subtitle}>OAFISH 25 FW : IMMATURE</h3>
              <h1 className={styles.title}>OAFISH WISH PROJECT</h1>
              <p className={styles.description}>
                지금 간절히 이루고 싶은 꿈이 있나요?
                <br />
                나의 꿈을 작성한 쪽지와 함께 씨앗을 심어보세요
                <br />
                2025년이 가기 전, 활짝 핀 나의 꽃과 함께
                <br />
                응원의 답장을 전해드려요
              </p>
            </div>

            <Link href="/write" className={styles.ctaLink}>
              <Button state="active">내 쪽지 심기</Button>
            </Link>

            <Link
              href="https://blog.naver.com/oafish_official/224010492006"
              className={styles.whyLink}
            >
              왜 오피쉬는 쪽지를 심나요?
            </Link>
          </section>

          <img className={styles.divider} src="/assets/divider.svg" />
          <section className={styles.garden}>
            <div className={styles.searchInner}>
              <WishSearchBox
                onSearch={(v) => {
                  setNickname(v);
                  setPage(1);
                }}
              />
            </div>

            <div className={styles.gridWrap}>
              <div className={styles.soilBox}>
                <div className={styles.plantGridArea} {...handlers}>
                  <WishPlantGrid
                    page={page}
                    nickname={nickname}
                    onCardClick={(id) => {
                      if (!isSwiping) setSelectedId(id);
                    }}
                    onMeta={({ totalPages }) => setTotalPages(totalPages)}
                  />
                </div>

                {totalPages > 1 && (
                  <WishPager
                    page={page}
                    totalPages={totalPages}
                    onPrev={() => setPage((p) => Math.max(1, p - 1))}
                    onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
                  />
                )}
              </div>
            </div>
          </section>

          <WishDetailModal
            id={selectedId}
            onClose={() => setSelectedId(null)}
          />
        </div>
      </main>
    </QueryClientProvider>
  );
}
