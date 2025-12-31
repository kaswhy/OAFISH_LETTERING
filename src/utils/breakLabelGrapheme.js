export function breakLabelGrapheme(text = "", size = 5) {
  if (!text) return [];

  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    const arr = Array.from(seg.segment(text), (x) => x.segment);
    const chunks = [];

    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size).join(""));
    }
    return chunks;
  }

  return text.match(new RegExp(`.{1,${size}}`, "g")) ?? [text];
}
