export async function api(path, { method = "GET", body, params } = {}) {
  const url = new URL(
    path,
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_BASE_URL
      : window.location.origin
  );
  if (params)
    for (const [k, v] of Object.entries(params))
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
