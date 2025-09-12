import clsx from "clsx";
import styles from "@/styles/ui/InputText.module.css";

export default function InputText({
  value,
  onChange,
  placeholder,
  ...rest
}) {
  const hasValue = (value ?? "").length > 0;
  return (
    <div className={styles.wrap}>
      <div className={clsx(styles.box, hasValue && styles.filled)}>
        <input
          className={styles.input}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
        ></input>
      </div>
    </div>
  );
}
