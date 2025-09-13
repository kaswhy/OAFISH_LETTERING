"use client";

import { useState } from "react";
import {
  useMutation,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { createWish } from "@/lib/wishes.api";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import SeedCard from "@/components/ui/SeedCard";
import TextArea from "@/components/ui/TextArea";
import InputText from "@/components/ui/InputText";
import Modal from "@/components/ui/Modal";
import TermsModalContent from "@/components/ui/modal-contents/TermsModalContent";

import styles from "@/styles/feature/wish/WritingPage.module.css";

const TERMS_TEXT = `[개인정보 수집·이용 동의]

1. 수집 항목: 닉네임, 연락처(휴대폰 번호 또는 이메일)
2. 수집 목적:
\t- 이벤트 참여 확인 및 관리
\t- 웹사이트를 통한 개인별 메시지 확인 서비스 제공
\t- 결과 안내 및 관련 소통
3. 보유·이용 기간: 이벤트 종료 및 결과 확인 가능 기간 종료 후 3개월 이내 파기
4. 동의 거부 권리: 개인정보 제공을 거부할 수 있으며, 거부 시 이벤트 참여 및 결과 확인 서비스 이용이 제한됩니다.`;

function WriteForm() {
  const [plantKey, setPlantKey] = useState(null);
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const qc = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: createWish,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wishes"] });
      router.push("/");
    },
  });

  const isDisabled =
    !plantKey ||
    !agree ||
    !nickname ||
    !content ||
    phoneNumber.length !== 11 ||
    nickname.length > 10 ||
    content.length > 200;

  const handleSubmit = () => {
    if (!isDisabled) {
      mutate({ plantKey, nickname, phoneNumber, content });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.viewport}>
        <main className={styles.content}>
          <section className={styles.hero}>
            <div className={styles.headline}>
              <h3 className={styles.subtitle}>OAFISH 25 FW : IMMATURE</h3>
              <h1 className={styles.title}>OAFISH WISH PROJECT</h1>
              <p className={styles.description}>
                지금 간절히 이루고 싶은 것이 있나요?
                <br />
                나의 꿈을 작성한 쪽지와 함께 씨앗을 심어보세요
                <br />
                2025년이 가기 전, 활짝 핀 나의 꽃과 함께
                <br />
                응원의 답장을 전해드려요
              </p>
            </div>
          </section>

          <div className={styles.formSection}>
            <p className={styles.step1}>
              STEP 1. 원하는 씨앗을 골라보세요
              <br /> 선택한 씨앗에 따라 새싹과 꽃이 달라져요!
            </p>
            <div className={styles.seedGrid}>
              {["sunflower", "susun", "rose", "freesia", "daisy", "mugung"].map(
                (k) => (
                  <SeedCard
                    key={k}
                    type={k}
                    selected={plantKey === k}
                    onClick={() => setPlantKey(k)}
                  />
                )
              )}
            </div>
          </div>

          <div className={styles.formSection}>
            <p className={styles.step2}>
              STEP 2. 지금 이루고 싶은 꿈을 쪽지에 적어 함께 심어요
            </p>
            <TextArea
              rows={6}
              placeholder="이루고 싶은 것을 적어보세요"
              value={content}
              onChange={setContent}
              maxLength={200}
            />
          </div>

          <div className={styles.formSection}>
            <p className={styles.step3}>
              STEP 3. 내 닉네임과 연락처를 작성해요
              <br />
              (연락처는 추후 안내 문자 발송 시에만 활용됩니다)
            </p>
            <div className={styles.inputGroup}>
              <label className={styles.label}>닉네임</label>
              <InputText
                placeholder="닉네임 (10자 이하, 특수문자 불가)"
                value={nickname}
                onChange={(e) => setNickname(e.target.value.slice(0, 10))}
              />
              <label className={styles.label}>연락처</label>
              <InputText
                placeholder="연락처 ('-' 없이 숫자만 입력)"
                value={phoneNumber}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))
                }
                inputMode="numeric"
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <div className={styles.agreeContainer}>
              <label>
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className={styles.hiddenCheckbox}
                />
                <span className={styles.customCheckbox}></span>
              </label>

              <span className={styles.agreeText}>
                닉네임과 연락처 수집·이용에 동의합니다
              </span>

              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className={styles.viewTermsButton}
              >
                보기
              </button>
            </div>

            <Button
              state={isDisabled || isPending ? "inactive" : "active"}
              onClick={handleSubmit}
              disabled={isDisabled || isPending}
              className={styles.writingButton}
            >
              {isPending ? "심는 중…" : "내 쪽지 심기"}
            </Button>
          </div>
        </main>
      </div>

      <Modal open={showTerms} onClose={() => setShowTerms(false)}>
        <TermsModalContent text={TERMS_TEXT} />
      </Modal>
    </div>
  );
}

export default function WritePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <WriteForm />
    </QueryClientProvider>
  );
}
