const DEFAULT_HOST = process.env.HOST ?? "0.0.0.0";
const DEFAULT_PORT = Number(process.env.PORT ?? 3000);
const DEFAULT_PROTOCOL = process.env.APP_PROTOCOL ?? "http";
const PUBLIC_URL = process.env.APP_BASE_URL ?? process.env.NEXT_PUBLIC_APP_URL;

const normalizeUrl = (value?: string | null) => {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const sanitized = trimmed.replace(/^\/+/, "");
  return `${DEFAULT_PROTOCOL}://${sanitized}`;
};

const normalizedEnvUrl = normalizeUrl(PUBLIC_URL);
const inferredAppUrl = normalizedEnvUrl ?? `${DEFAULT_PROTOCOL}://${DEFAULT_HOST}:${DEFAULT_PORT}`;

export const runtimeConfig = {
  host: DEFAULT_HOST,
  port: DEFAULT_PORT,
  protocol: DEFAULT_PROTOCOL,
  appUrl: inferredAppUrl,
};

const socketProtocol = runtimeConfig.protocol === "https" ? "wss" : "ws";

export const socketUrl = `${socketProtocol}://${runtimeConfig.host}:${runtimeConfig.port}/api/socketio`;
