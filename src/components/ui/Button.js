import clsx from "clsx";
import styles from "@/styles/ui/Button.module.css";

export default function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className,
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      {...rest}
      className={clsx(styles.base, styles[variant], styles[size], className)}
    >
      {children}
    </button>
  );
}
