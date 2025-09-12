import TermsModalContent from "./TermsModalContent";

export default {
  title: "UI/ModalContent/Terms",
  component: TermsModalContent,
  tags: ["autodocs"],
  args: {
    text: `[개인정보 수집·이용 동의]

1. 수집 항목: 닉네임, 연락처(휴대폰 번호 또는 이메일)
2. 수집 목적:
\t- 이벤트 참여 확인 및 관리
\t- 웹사이트를 통한 개인별 메시지 확인 서비스 제공
\t- 결과 안내 및 관련 소통
3. 보유·이용 기간: 이벤트 종료 및 결과 확인 가능 기간 종료 후 3개월 이내 파기
4. 동의 거부 권리: 개인정보 제공을 거부할 수 있으며, 거부 시 이벤트 참여 및 결과 확인 서비스 이용이 제한됩니다.`,
  },
};

export const Default = {};
