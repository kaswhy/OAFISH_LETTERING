import { api } from "./api";

export async function listWishes({ page = 1, size = 9, nickname } = {}) {
  const params = new URLSearchParams();
  params.set("page", String(Number.isFinite(page) ? page : 1));
  params.set("size", String(Number.isFinite(size) ? size : 9));
  if (nickname) params.set("nickname", nickname);

  const res = await fetch(`/api/wishes?${params.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch wishes");
  return res.json().then((r) => r.data);
}

export function getWish(id) {
  return api(`/api/wishes/${id}`);
}

export function createWish({ plantKey, nickname, phoneNumber, content }) {
  return api("/api/wishes", {
    method: "POST",
    body: { plantKey, nickname, phoneNumber, content },
  });
}
