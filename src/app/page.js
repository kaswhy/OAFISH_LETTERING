"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";

import WishSearchBox from "@/components/feature/wish/WishSearchBox";
import WishPlantGrid from "@/components/feature/wish/WishPlantGrid";
import WishPager from "@/components/feature/wish/WishPager";

import styles from "@/styles/feature/wish/MainPage.module.css";

export default function MainPage() {
  const [nickname, setNickname] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
      </div>
    </main>
  );
}
