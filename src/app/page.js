"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";

import WishSearchBox from "@/components/feature/wish/WishSearchBox";
import WishPlantGrid from "@/components/feature/wish/WishPlantGrid";
import WishPager from "@/components/feature/wish/WishPager";

import styles from "@/styles/feature/wish/MainPage.module.css";

export default function MainPage() {
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
              여러분이 심었던 소망이 꽃으로 피어났어요.
              <br />
              자신의 꽃을 클릭해, 작은 씨앗에 담았던 나만의 꿈과
              <br />
              그날의 나에게 도착한 답장을 확인해 보세요.
              <br />
              새해에는 하고 싶은 일을 향한 마음이
              <br />
              꽃처럼 활짝 만개하는 한 해가 되길 응원합니다.
            </p>
          </div>
        </section>

        <img className={styles.divider} src="/assets/divider.svg" />

        <section className={styles.garden}>
          <div className={styles.searchInner}>
            <WishSearchBox
              onSearch={(v) => {
                if (/^\d+$/.test(v)) {
                  setPhoneNumber(v);
                  setNickname("");
                }
                else {
                  setNickname(v);
                  setPhoneNumber("");
                }
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
                  phoneNumber={phoneNumber}
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
