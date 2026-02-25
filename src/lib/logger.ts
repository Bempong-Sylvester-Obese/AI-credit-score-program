const isDev = import.meta.env.DEV;

/**
 * Centralized logger that suppresses output in production builds.
 * In development, proxies to the native console methods.
 */
export const logger = {
  error(...args: unknown[]) {
    if (isDev) console.error(...args);
  },
  warn(...args: unknown[]) {
    if (isDev) console.warn(...args);
  },
  info(...args: unknown[]) {
    if (isDev) console.info(...args);
  },
  debug(...args: unknown[]) {
    if (isDev) console.debug(...args);
  },
};
