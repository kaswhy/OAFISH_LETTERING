import GraphemeSplitter from "grapheme-splitter";

const hasSegmenter = typeof Intl !== "undefined" && Intl.Segmenter;

export function countGraphemes(str) {
  if (hasSegmenter) {
    const seg = new Intl.Segmenter("ko", { granularity: "grapheme" });
    return [...seg.segment(str)].length;
  }
  return new GraphemeSplitter().countGraphemes(str);
}

export function sliceGraphemes(str, max) {
  if (hasSegmenter) {
    const seg = new Intl.Segmenter("ko", { granularity: "grapheme" });
    const parts = [...seg.segment(str)];
    return parts.slice(0, max).map(p => p.segment).join("");
  }
  return new GraphemeSplitter().splitGraphemes(str).slice(0, max).join("");
}
