export interface ServePlaceholderOptions {
  /**
   * Sets `statusCode` for all handled responses. Set to `false` to disable overriding statusCode.
   *
   * @default 404
   */
  statusCode?: number;

  /**
   * Skip middleware when no handler is defined for the current request.
   * Please note that if this option is set to `true`, then `default` handler will be disabled
   *  @default false
   */
  skipUnknown?: boolean;

  /**
   * Set headers to prevent accidentally caching 404 resources.
   *
   * @default true
   */
  cacheHeaders?: boolean;

  /**
   * Sets an `X-Placeholder` header with value of handler name.
   *
   * @default true
   */
  placeholderHeader?: boolean;

  /**
   * A mapping from file extensions to the handler. Extensions should start with *dot* like `.js`.
   * You can disable any of the handlers by setting the value to `null`
   * If the value of a handler is set to `false`, the middleware will be ignored for that extension.
   */
  handlers?: Record<string, string | false>;

  /**
   * A mapping from handler to placeholder. Values can be `String` or `Buffer`. You can disable any of the placeholders by setting the value to `false`.
   */
  placeholders?: Record<string, string | undefined>;

  /**
   * A mapping from handler to the mime type. Mime type will be set as `Content-Type` header. You can disable sending any of the mimes by setting the value to `false`.
   */
  mimes?: Record<string, string | undefined>;
}

export const DefaultOptions: ServePlaceholderOptions = {
  statusCode: 404,

  skipUnknown: false,

  cacheHeaders: true,

  placeholderHeader: true,

  handlers: {
    // css
    ".css": "css",
    // html
    ".html": "html",
    ".htm": "html",
    // image
    ".png": "image",
    ".jpg": "image",
    ".jpeg": "image",
    ".gif": "image",
    ".svg": "image",
    ".webp": "image",
    ".bmp": "image",
    ".ico": "image",
    // js
    ".js": "js",
    // json
    ".json": "json",
    // map
    ".map": "map",
    // plain
    ".txt": "plain",
    ".text": "plain",
    ".md": "plain",
  },

  placeholders: {
    css: "/* style not found */",
    default: undefined,
    html: "<!-- page not found -->",
    image:
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    js: "/* script not found */",
    json: "{}",
    map: '{"version": "3", "sources": [], "mappings": "" }',
    plain: "",
  },

  mimes: {
    css: "text/css",
    default: undefined,
    html: "text/html",
    js: "application/javascript",
    json: "application/json",
    image: "image/gif",
    map: "application/json",
    plain: "text/plain",
  },
};
