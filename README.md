# ♡ serve-placeholder

> Connect/Express middleware to respond with better placeholders based on request instead of 404 page

[![Standard JS][standard-src]][standard-href]
[![david dm][david-src]][david-href]
[![codecov][codecov-src]][codecov-href]
[![circleci][circleci-src]][circleci-href]

[![npm version][npm-v-src]][npm-v-href]
[![npm downloads][npm-dt-src]][npm-dt-href]
[![package phobia][packagephobia-src]][packagephobia-href]

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


## Handlers

These are default handles. See [options](#options) section to see how to customize or disable them.

Handler  | Extensions             | Mime type                |  Placeholder
---------|------------------------|--------------------------|-------------------
default  | any unknown extension  | -                        | -
css      | `css`                  | `text/css`               | `/* style not found */`
html     | `html`, `htm`          | `text/html`              | `<!-- page not found -->`
js       | `js`                   | `application/javascript` | `/* script not found */`
json     | `json`                 | `application/json`       | `{}`
map      | `map`                  | `application/json`       | `{"version": "3", "sources": [], "mappings": "" }`
plain    | `txt`, `text`, `md`    | `text/plain`             |  ``
image    | `png`, `jpg`, `jpeg`, `gif`, `svg`, `webp`, `bmp`, `ico` | `image/gif` | transparent 1x1 image

## Options

### `handlers`

A mapping from file extensions to the handler. Extensions should start with *dot* like `.js`.

You can disable any of the handlers by setting the value to `null`

If the value of a handler is set to `false`, middleware will be ignored for that extension.

### `statusCode`

- Default: `404`

Sets `statusCode` for all handled responses. Set to `false` to disable overriding statusCode.

### `skipUnknown`

- Default: `false`

Skip middleware when no handler is defined for the current request.

Please note that if this option is set to `true`, then `default` handler will be disabled!

### `placeholders`

- Type: `Object`

A mapping from handler to placeholder. Values can be `String` or `Buffer`. You can disable any of the placeholders by setting the value to `false`.

### `mimes`

- Type: `Object`

A mapping from handler to the mime type. Mime type will be set as `Content-Type` header. You can disable sending any of the mimes by setting the value to `false`.

## License

MIT

Made with 💖  by [Nuxt.js](https://nuxtjs.org) team with!

<!-- Refs -->
[standard-src]: https://flat.badgen.net/badge/code%20style/standard/green
[standard-href]: https://standardjs.com

[npm-v-src]: https://flat.badgen.net/npm/v/serve-placeholder/latest
[npm-v-href]: https://npmjs.com/package/serve-placeholder

[npm-dt-src]: https://flat.badgen.net/npm/dt/serve-placeholder
[npm-dt-href]: https://npmjs.com/package/serve-placeholder

[packagephobia-src]: https://flat.badgen.net/packagephobia/install/serve-placeholder
[packagephobia-href]: https://packagephobia.now.sh/result?p=serve-placeholder

[david-src]: https://flat.badgen.net/david/dep/nuxt/serve-placeholder
[david-href]: https://david-dm.org/nuxt/serve-placeholder

[codecov-src]: https://flat.badgen.net/codecov/c/github/nuxt/serve-placeholder/master
[codecov-href]: https://codecov.io/gh/nuxt/serve-placeholder

[circleci-src]: https://flat.badgen.net/circleci/github/nuxt/serve-placeholder/master
[circleci-href]: https://circleci.com/gh/nuxt/serve-placeholder
