import clsx from "clsx";
import styles from "@/styles/ui/Button.module.css";

export default function Button({ state = "inactive", children, ...rest }) {
  return (
    <button className={clsx(styles.base, styles[state])}>{children}</button>
  );
}
