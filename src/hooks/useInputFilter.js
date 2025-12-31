export default function useInputFilter(value, onChange, allowedPattern) {
  function handleBeforeInput(e) {
    if (e.isComposing || e.inputType?.startsWith("insertComposition")) return;

    const data = e.data;
    if (!data) return;

    for (const ch of Array.from(data)) {
      if (!allowedPattern.test(ch)) {
        e.preventDefault();
        return;
      }
    }
  }

  function handleKeyDown(e) {
    if (e.isComposing) return;
    if (e.key?.length === 1 && !allowedPattern.test(e.key)) {
      e.preventDefault();
    }
  }

  function handlePaste(e) {
    const text = e.clipboardData?.getData("text") ?? "";
    const filtered = Array.from(text)
      .filter((ch) => allowedPattern.test(ch))
      .join("");

    if (filtered.length !== text.length) {
      e.preventDefault();
      const input = e.currentTarget;

      const start = input.selectionStart ?? value.length;
      const end = input.selectionEnd ?? start;

      const nextValue = value.slice(0, start) + filtered + value.slice(end);
      onChange(nextValue);
    }
  }

  return {
    handleBeforeInput,
    handleKeyDown,
    handlePaste,
  };
}
