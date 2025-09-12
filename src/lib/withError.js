import { fail } from "./http.js";

export function withError(handler) {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (err) {
      console.error(err);
      if (err instanceof Response) return err;
      return fail("Internal Server Error", 500);
    }
  };
}
