import clsx from "clsx";
import styles from "@/styles/ui/modal-contents/TermsModalContent.module.css";

export default function TermsModalContent({
  text,
  className,
  maxHeight = 420,
  paddingTop = 60,
}) {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.body} style={{ maxHeight, paddingTop }}>
        {text}
      </div>
    </div>
  );
}
