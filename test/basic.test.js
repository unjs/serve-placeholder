import {
  createApp,
  eventHandler,
  fromNodeMiddleware,
  toNodeListener,
} from "h3";
import { listen } from "listhen";
import { fetch } from "ofetch";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { servePlaceholder } from "../src";
import { DefaultOptions } from "../src/defaults";

describe("default", () => {
  let app;
  let listener;
  let _fetch;

  beforeAll(async () => {
    app = createApp();
    app.use(
      "/test",
      eventHandler(() => "Works!"),
    );
    app.use(fromNodeMiddleware(servePlaceholder({})));
    listener = await listen(toNodeListener(app), { port: 0 });
    console.log(listener.url);
    _fetch = (url) => fetch(listener.url + url);
  });

  afterAll(async () => {
    await listener.close();
  });

  it("/test", async () => {
    const res = await _fetch("test");
    expect(await res.text()).toBe("Works!");
  });

  it("Headers", async () => {
    const res = await _fetch(`${listener.url}404.json`);
    expect(Object.fromEntries(res.headers.entries())).toMatchObject({
      "cache-control": "no-cache, no-store, must-revalidate",
      connection: "keep-alive",
      "content-length": "2",
      "content-type": "application/json",
      expires: "0",
      pragma: "no-cache",
      "x-placeholder": "json",
    });
  });

  // Test all handlers
  const handlersToTest = Object.entries(DefaultOptions.handlers).map(
    ([ext, handler]) => ({ ext, handler }),
  );
  handlersToTest.push({ ext: ".unknown", handler: "default " });
  for (const { ext, handler } of handlersToTest) {
    it(`Handler for ${ext}`, async () => {
      const res = await _fetch(`${listener.url}assets/foo${ext}`);
      expect(await res.text()).toMatchObject(
        DefaultOptions.placeholders[handler] || "",
      );
    });
  }
});

describe("withOptions", () => {
  let app;
  let listener;
  let _fetch;

  beforeAll(async () => {
    app = createApp();
    app.use(
      "/test",
      eventHandler(() => "Works!"),
    );
    app.use(
      fromNodeMiddleware(
        servePlaceholder({
          skipUnknown: true,
          cacheHeaders: false,
          handlers: {
            ".skipme": false,
          },
        }),
      ),
    );
    app.use(
      "/",
      eventHandler(() => "Unknown!"),
    );
    listener = await listen(toNodeListener(app), { port: 0 });
    _fetch = (url) => fetch(listener.url + url);
  });

  afterAll(async () => {
    await listener.close();
  });

  it("/test", async () => {
    const res = await _fetch("test");
    expect(await res.text()).toBe("Works!");
  });

  it.todo("/foo?bar.map", async () => {
    const res = await _fetch("/foo?bar.map");
    expect(await res.text()).toBe("Unknown!");
  });

  it("Headers", async () => {
    const res = await _fetch("/404.json");
    const resHeaders = Object.fromEntries(res.headers.entries());
    expect(resHeaders).toMatchObject({
      connection: "keep-alive",
      "content-length": "2",
      "content-type": "application/json",
    });
    for (const header of ["cache-control", "expires", "pragma"]) {
      expect(resHeaders[header]).toBeUndefined();
    }
  });

  it.todo(".skipme", async () => {
    const res = await _fetch("/assets/foo.skipme");
    expect(await res.text()).toBe("Unknown!");
  });

  it("unknown", async () => {
    const res = await _fetch("/assets/foo.unknown");
    expect(await res.text()).toBe("Unknown!");
  });
});
