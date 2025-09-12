import styles from "@/styles/ui/modal-contents/TermsModalContent.module.css";

export default function TermsModalContent({ text }) {
  return (
    <div className={styles.wrap}>
      {" "}
      <div className={styles.body}>{text}</div>{" "}
    </div>
  );
}
