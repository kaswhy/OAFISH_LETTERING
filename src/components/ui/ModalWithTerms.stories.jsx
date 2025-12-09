import { useState } from "react";
import Modal from "./Modal";
import TermsModalContent from "./modal-contents/TermsModalContent";

export default {
  title: "UI/Modal/Composed/Terms",
  component: Modal, // <- 조합의 핵심 단위는 Modal
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    open: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 360,
          height: "100vh",
          margin: "0 auto",
          background: "#ddd",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Interactive = {
  args: {
    open: true,
    text: `[개인정보 수집·이용 동의]

1. 수집 항목: 닉네임, 연락처(휴대폰 번호 또는 이메일)
2. 수집 목적:
  - 이벤트 참여 확인 및 관리
  - 웹사이트를 통한 개인별 메시지 확인 서비스 제공
  - 결과 안내 및 관련 소통
3. 보유·이용 기간: 이벤트 종료 후 3개월 이내 파기
4. 동의 거부 권리: 거부 시 서비스 이용이 제한됩니다.`,
  },

  render: ({ open: initialOpen, text }) => {
    const [open, setOpen] = useState(initialOpen);

    return (
      <Modal open={open} onClose={() => setOpen(false)}>
        <TermsModalContent text={text} />
      </Modal>
    );
  },
};
