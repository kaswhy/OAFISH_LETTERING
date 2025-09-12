import Image from "next/image";
import clsx from "clsx";
import styles from "@/styles/ui/IconButton.module.css";

export default function IconButton({
  src,
  ariaLabel,
  width,
  height,
  box,
  disabled,
  onClick,
  className,
  ...rest
}) {
  return (
    <button
      type="button"
      className={clsx(styles.btn, className)}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      style={{ width: box, height: box }}
      {...rest}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className={styles.img}
        priority={false}
      />
    </button>
  );
}
