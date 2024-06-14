import type { IncomingMessage, ServerResponse } from "node:http";
import defu from "defu";
import { DefaultOptions, type ServePlaceholderOptions } from "./defaults";
export type ServerMiddleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
) => void;

const EXT_REGEX = /\.[\dA-Za-z]+$/;

export function servePlaceholder(
  _options: ServePlaceholderOptions = {},
): ServerMiddleware {
  // Assign default options
  const options: ServePlaceholderOptions = defu(_options, DefaultOptions);

  return function servePlaceholderMiddleware(req, res, next) {
    // If response already sent, skip
    if (res.writableEnded) {
      return;
    }

    // Get url from req object
    const url = req.url.split("?")[0];

    // Get ext of request url
    const ext = (url.match(EXT_REGEX) || [])[0] || "";

    // Try to find a handler based on ext
    let handler = options.handlers[ext];

    // Skip middleware is handler is explicitly set to false
    if (handler === false) {
      return next();
    }

    // In case of no handler guessed
    if (handler === undefined) {
      if (options.skipUnknown) {
        // Skip this middleware
        return next();
      }
      // Use 'default' handler
      handler = "default";
    }

    // Set statusCode
    if (options.statusCode) {
      res.statusCode = options.statusCode;
    }

    // Try to set appreciate mime type based on handler
    const mime = options.mimes[handler];
    if (mime) {
      res.setHeader("Content-Type", mime);
    }

    // Prevent caching
    if (options.cacheHeaders) {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
      res.setHeader("Pragma", "no-cache"); // HTTP 1.0
      res.setHeader("Expires", "0"); // Proxies
    }

    // Add X- header
    if (options.placeholderHeader) {
      res.setHeader("X-Placeholder", handler);
    }

    // Try to find placeholder based on handler
    const placeholder = options.placeholders[handler];

    // Send placeholder and end response
    res.end(placeholder);
  };
}
