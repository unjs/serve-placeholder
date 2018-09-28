# serve-placeholder

> Connect/Express middleware to responsd with appreciate placeholders based on request instead of 404

[![npm](https://img.shields.io/npm/dt/serve-placeholder.svg?style=flat-square)](https://npmjs.com/package/serve-placeholder)
[![npm (scoped with tag)](https://img.shields.io/npm/v/serve-placeholder/latest.svg?style=flat-square)](https://npmjs.com/package/serve-placeholder)

## Why?

**💵 Rendering 404 errors is sometimes costly**

Specially when you are doing SSR, each 404 error means a new SSR request and it may crash server or add extra load.

**👣 Hard to Debug and Trace**

When you look at debugger tools for 404 assets, you may probably see an ugly HTML page.

**👌 Graceful Responses**

When an asset is not found from server, we can send better response instead of nothing. For example, for images we send a transparent 1x1 image.

## Usage

Install package:

```bash
npm install serve-placeholder
```

OR

```bash
yarn add serve-placeholder
```

Require and use middleware:

```js
const placeholder = require('serve-placeholder')

// [regular middleware such as serve-static]

// Response with appreciate placeholders
app.use(placeholder())

// OR with options...
//app.use(placeholder({ /* options */ }))

// [global error handler]
```

## Options

### `handler`

A mapping from file extensions to handler. Extensions should start with `.` like `.js`.

You can disable any of default handlers by setting value to `false`

### `statusCode`

- Default: `404`

Sets `statusCode` for all handled responses. Set to `false` to disable overriding statusCode.

### `skipUnknown`

- Default: `false`

Skip middleware when no handler is defined for the current request and call `next()` instead.

### `placeholder`

- Type: `Object`

A mapping from handler to placeholder . Values can be `String` or `Buffer`.

### `mime`

- Type: `Object`

A mapping from handler to the mime type. Mime type will be set as `Content-Type` header.

## Supported Handlers

Handler  | Extensions                                        | Mime type                | Placeholder
---------|---------------------------------------------------|--------------------------|-------------------
js       | `js`                                              | `application/javascript` | `/* script not found */`
json     | `json`                                            | `application/json`       | `{}`
html     | `html`, `htm`                                     | `text/html`              | `<!-- page not found -->`
css      | `css`                                             | `text/css`               | `/* style not found */`
image    | `png`, `jpg`, `jpeg`, `gif`, `svg`, `webp`, `bmp` | `image/gif`              | 1x1 transparent gif

## License

MIT. Made by [Nuxt.js](https://nuxtjs.org) team with ❤️
