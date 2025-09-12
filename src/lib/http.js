import { NextResponse } from 'next/server';

export const ok = (data, status = 200) =>
  NextResponse.json({ ok: true, data }, { status });

export const create = (data) =>
    ok(data, 201);

export const fail = (message, status = 400, details) =>
  NextResponse.json({ ok: false, error: { message, details } }, { status });

export const badRequest = (message = 'Bad Request', details) =>
  fail(message, 400, details);

export const notFound = (message = 'Not Found') =>
  fail(message, 404);

export const internalError = (message = 'Internal Server Error') =>
  fail(message, 500);
