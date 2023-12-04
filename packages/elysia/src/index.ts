// import { cors, HTTPMethod } from "@elysiajs/cors";
import Elysia, { ElysiaConfig, HTTPMethod, t } from "elysia";
import pino from "pino";
import { fileRouter } from "./fileRouter";

export interface ElysiaCustomConfig extends Partial<ElysiaConfig> {
  routesDir?: string;
  cors?: {
    origin?: string[];
    methods?: HTTPMethod[];
    allowedHeaders?: string[];
    exposedHeaders?: string[];
    credentials?: boolean;
    maxAge?: number;
  };
  log?: {
    enabled?: boolean;
    redact?: string[];
    level?: pino.Level;
  };
}

export const createServer = (config: ElysiaCustomConfig = {}) => {
  const { cors = {}, log = {}, routesDir, ...rest } = config;
  const app = new Elysia(rest)
    .options("/*", (c) => (c.set.status = 204))
    .all("/*", (c) => {
      c.set.status = 404;
      return "Not Found";
    })
    // Logger
    .derive(({ headers }) => {
      return {
        log: pino({
          ...log,
          formatters: {
            level: (label) => ({ level: label }),
          },
        }),
      };
    });

  // Default Response Headers
  const { methods, allowedHeaders, exposedHeaders } = cors;
  const headers = {
    "Access-Control-Allow-Credentials": String(cors.credentials ?? true),
    "Access-Control-Allow-Headers": allowedHeaders
      ? allowedHeaders.join(", ")
      : "*",
    "Access-Control-Allow-Methods": methods ? methods.join(", ") : "*",
    "Access-Control-Expose-Headers": exposedHeaders
      ? exposedHeaders.join(", ")
      : "*",
    "Access-Control-Max-Age": String(cors.maxAge ?? 5),
    "Content-Security-Policy": "default-src 'none'",
    "Referrer-Policy": "no-referrer",
    "Strict-Transport-Security": "max-age=31536000; includeSubdomains; preload",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "0",
  };
  app.onRequest((c) => {
    c.set.headers = { ...headers };
    const origin = c.request.headers.get("origin");
    if (cors.origin && origin && cors.origin.includes(origin)) {
      console.log(cors.origin);
      c.set.headers["Access-Control-Allow-Origin"] = origin;
      c.set.headers["Vary"] = "Origin";
    }
  });

  // File-based router
  if (routesDir) {
    fileRouter(app, routesDir);
  }

  app.onStart(({ app, log }) => {
    if (app.server) {
      log.info(`Listening on http://${app.server.hostname}:${app.server.port}`);
    }
  });

  return app;
};

export * from "@sinclair/typebox";
export * from "elysia";
export * from "./fileRouter";
