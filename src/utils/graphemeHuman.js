import GraphemeSplitter from "grapheme-splitter";

const EP_ZWJ = /\p{Extended_Pictographic}(?:\u200d\p{Extended_Pictographic})+/gu;

export function countGraphemesHuman(str) {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const seg = new Intl.Segmenter("ko", { granularity: "grapheme" });
    return Array.from(seg.segment(str)).length;
  }
  let zwjCount = 0;
  const rest = str.replace(EP_ZWJ, () => {
    zwjCount += 1;
    return "";
  });
  const splitter = new GraphemeSplitter();
  return zwjCount + splitter.countGraphemes(rest);
}

export function sliceGraphemesHuman(str, max) {
  if (max == null) return str;

  // Intl.Segmenter가 있으면 그걸로 안전하게 자르기
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const seg = new Intl.Segmenter("ko", { granularity: "grapheme" });
    const parts = Array.from(seg.segment(str), s => s.segment);
    return parts.slice(0, max).join("");
  }

  const splitter = new GraphemeSplitter();
  const tokens = [];
  let lastIndex = 0;

  for (const m of str.matchAll(EP_ZWJ)) {
    if (m.index > lastIndex) {
      tokens.push(...splitter.splitGraphemes(str.slice(lastIndex, m.index)));
    }
    tokens.push(m[0]);
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < str.length) {
    tokens.push(...splitter.splitGraphemes(str.slice(lastIndex)));
  }

  return tokens.slice(0, max).join("");
}
