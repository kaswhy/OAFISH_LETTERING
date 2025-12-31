import Image from "next/image";
import clsx from "clsx";
import styles from "@/styles/ui/IconButton.module.css";

export default function IconButton({
  src,
  ariaLabel,
  variant = "default",
  size = 40,
  disabled = false,
  onClick,
  className,
  ...rest
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={clsx(styles.btn, styles[variant], className)}
      style={{ width: size, height: size }}
      {...rest}
    >
      <Image
        src={src}
        alt=""
        width={size * 0.6}
        height={size * 0.7}
        className={styles.img}
        priority={false}
      />
    </button>
  );
}
