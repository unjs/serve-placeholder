const path = require('path')
const defaultsDeep = require('lodash.defaultsdeep')

const defaults = require('./defaults')

module.exports = function createServePlaceholder (_options) {
  // Assign default options
  const options = defaultsDeep({}, _options, defaults)

  return function servePlaceholderMiddleware (req, res, next) {
    // Get url from req object
    const { url } = req

    // Get ext of requst url
    const ext = path.extname(url)

    // Try to find a handler based on ext
    const handler = options.handler[ext]

    // Skip this middleware if no appreciate handler was found
    if (!handler && options.skipUnknown) {
      return next()
    }

    // Set statusCode
    if (options.statusCode) {
      res.statusCode = options.statusCode
    }

    // Try to set appreciate mime type based on handler
    const mime = options.mime[handler]
    if (mime) {
      res.setHeader('Content-Type', mime)
    }

    // Try to find placeholder based on handler
    const placeholder = options.placeholder[handler]

    // Send placeholder and end response
    res.end(placeholder)
  }
}
