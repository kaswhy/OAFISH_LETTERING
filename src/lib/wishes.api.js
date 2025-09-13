import { api } from "./api";

export function listWishes({ page = 1, size = 9, nickname = "" }) {
  return api("/api/wishes", { params: { page, size, nickname } });
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
