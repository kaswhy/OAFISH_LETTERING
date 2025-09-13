export async function api(path, { method = "GET", body, params } = {}) {
  const url = new URL(
    path,
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_BASE_URL
      : window.location.origin
  );
  if (params) {
    for (const [k, v] of Object.entries(params))
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  }

  const headers = body ? { "Content-Type": "application/json" } : undefined;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    const err = new Error(msg || res.statusText);
    err.status = res.status;
    throw err;
  }

  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return null;
  }

  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json") ? res.json() : res.text();
}
