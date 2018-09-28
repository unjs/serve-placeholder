# ♡ serve-placeholder

> Connect/Express middleware to respond with better placeholders based on request instead of 404 page

<p align="center">
<a href="https://david-dm.org/nuxt/serve-placeholder">
    <img alt="" src="https://david-dm.org/nuxt/serve-placeholder/status.svg?style=flat-square">
</a>
<a href="https://standardjs.com">
    <img alt="" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square">
</a>
<a href="https://circleci.com/gh/nuxt/serve-placeholder">
    <img alt="" src="https://img.shields.io/circleci/project/github/nuxt/serve-placeholder.svg?style=flat-square">
</a>
<a href="https://codecov.io/gh/nuxt/serve-placeholder">
    <img alt="" src="https://img.shields.io/codecov/c/github/nuxt/serve-placeholder.svg?style=flat-square">
</a>
<br>
<a href="https://npmjs.com/package/serve-placeholder">
    <img alt="" src="https://img.shields.io/npm/v/serve-placeholder/latest.svg?style=flat-square">
</a>
<a href="https://npmjs.com/package/serve-placeholder">
    <img alt="" src="https://img.shields.io/npm/dt/serve-placeholder.svg?style=flat-square">
</a>
</p>

## Why?

**💵 Rendering 404 errors is sometimes costly**

Especially when you are doing SSR, each 404 error means a new SSR request and it may crash the server or add extra load.

**👣 Hard to Debug and Trace**

When you look at debugger tools for 404 assets, you may probably see an ugly HTML page.

**👌 Graceful Responses**

When an asset is not found from the server, we can send better response instead of nothing. For example, for images, we send a transparent 1x1 image.

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

A mapping from file extensions to the handler. Extensions should start with `.` like `.js`.

You can disable any of the default handlers by setting the value to `false`

### `statusCode`

- Default: `404`

Sets `statusCode` for all handled responses. Set to `false` to disable overriding statusCode.

### `skipUnknown`

- Default: `false`

Skip middleware when no handler is defined for the current request and call `next()` instead.

### `placeholder`

- Type: `Object`

A mapping from handler to placeholder. Values can be `String` or `Buffer`. You can disable any of the placeholders by setting the value to `false`.

### `mime`

- Type: `Object`

A mapping from handler to the mime type. Mime type will be set as `Content-Type` header. You can disable sending any of the mimes by setting the value to `false`.

## Supported Handlers

Handler  | Extensions                                        | Default Mime type                | Default Placeholder
---------|---------------------------------------------------|----------------------------------|-------------------
js       | `js`                                              | `application/javascript`         | `/* script not found */`
json     | `json`                                            | `application/json`               | `{}`
html     | `html`, `htm`                                     | `text/html`                      | `<!-- page not found -->`
css      | `css`                                             | `text/css`                       | `/* style not found */`
image    | `png`, `jpg`, `jpeg`, `gif`, `svg`, `webp`, `bmp` | `image/gif`                      | 1x1 transparent image

## License

MIT. Made by [Nuxt.js](https://nuxtjs.org) team with ❤️
