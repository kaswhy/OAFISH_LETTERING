import clsx from "clsx";
import styles from "@/styles/ui/Button.module.css";

export default function Button({
  state = "inactive",
  type = "button",
  className,
  children,
  ...rest
}) {
  const stateClass = styles[state] ?? styles.inactive;

  return (
    <button
      {...rest}
      type={type}
      className={clsx(styles.base, stateClass, className)}
    >
      {children}
    </button>
  );
}
