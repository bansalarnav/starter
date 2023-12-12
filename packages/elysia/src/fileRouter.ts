import { readdirSync } from "node:fs";
import { TObject, TOptional, TString } from "@sinclair/typebox";
import Elysia, {
  DecoratorBase,
  DefinitionBase,
  Handler,
  InputSchema,
  InvalidCookieSignature,
  LocalHook,
  MergeSchema,
  NotFoundError,
  ParseError,
  RouteSchema,
  UnwrapRoute,
  ValidationError,
} from "elysia";
import { Logger, LoggerOptions } from "pino";

export interface DecoratorWithLogAndAuth extends DecoratorBase {
  request: {
    log: Logger<LoggerOptions>;
    auth: {
      userId: TString;
      sessionId: TString;
    };
  };
}

export interface SchemaWithDefaultHeaders extends RouteSchema {
  headers: TObject<{
    "x-forwarded-for": TString;
    authorization: TOptional<TString>;
  }>;
}

export const createRoute = <
  BasePath extends string,
  Decorators extends DecoratorWithLogAndAuth,
  Definitions extends DefinitionBase,
  ParentSchema extends SchemaWithDefaultHeaders,
  Path extends string,
  LocalSchema extends InputSchema<Extract<keyof Definitions["type"], string>>,
  HandlerFunction extends Handler<Route, Decorators, `${BasePath}${Path}`>,
  Route extends MergeSchema<
    UnwrapRoute<LocalSchema, Definitions["type"]>,
    UnwrapRoute<ParentSchema, Definitions["type"]>
  >,
>({
  handler,
  ...hook
}: { handler: HandlerFunction } & LocalHook<
  LocalSchema,
  Route,
  Decorators,
  Definitions["error"],
  `${BasePath}${Path}`
>) => {
  const { error } = hook;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  hook.error = (c) => {
    let errorMsg;
    if (c.error instanceof InvalidCookieSignature) {
      errorMsg = c.error.message;
    } else if (c.error instanceof ParseError) {
      errorMsg = "Parse Error";
    } else if (c.error instanceof NotFoundError) {
      errorMsg = "Not Found";
    } else if (c.error instanceof ValidationError) {
      errorMsg = {
        message: `Validation Error - ${c.error.message}`,
        expected: c.error.model,
        found: c.error.value,
      };
    } else {
      c.log.error(c.error);
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        errorMsg = error ? error(c) : "Internal Server Error";
        errorMsg ??= "Internal Server Error";
      } catch {
        errorMsg = "Internal Server Error";
      }
    }
    return typeof errorMsg === "string" ? { message: errorMsg } : errorMsg;
  };
  return {
    handler,
    hook,
  };
};

export const fileRouter = (app: Elysia, dir: string) => {
  const routeFiles = readdirRecursive(dir);
  const httpMethods = new Set([
    "DELETE",
    "GET",
    "HEAD",
    "PATCH",
    "POST",
    "PUT",
    "OPTIONS",
  ]);

  for (const file of routeFiles) {
    if (file.endsWith(".ts") || file.endsWith(".js")) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const routeFile = require(file);
      const url = pathToUrl(file.replace(dir, "")).replaceAll("\\", "/");
      for (const method in routeFile) {
        if (httpMethods.has(method)) {
          const router = routeFile[method];
          app.route(method, url, router.handler, router.hook);
        }
      }
    }
  }
  return app;
};

const readdirRecursive = (dir: string) => {
  const list: string[] = [];
  const files0 = readdirSync(dir, { withFileTypes: true });
  for (const file of files0) {
    const name = `${dir}/${file.name}`;
    if (file.isDirectory()) {
      const files1 = readdirRecursive(name);
      list.push(...files1);
    } else {
      list.push(name);
    }
  }
  return list;
};

const pathToUrl = (path: string) => {
  // Remove extension
  let extIndex = path.lastIndexOf(".");
  if (extIndex === -1) extIndex = path.length;
  path = path.substring(0, extIndex);

  // Replace [...slug] with *
  path = path.replace(/\[\.\.\.(.*?)\]/g, "*");

  // Replace [slug] with :slug
  path = path.replace(/\[(.*?)\]/g, ":$1");

  // Remove index
  path = path.replace("/index", "/");

  return path;
};
