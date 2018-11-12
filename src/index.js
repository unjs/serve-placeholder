const path = require('path')
const defaultsDeep = require('defaults-deep')

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
    let handler = options.handlers[ext]

    // Skip middleware is handler is explictly set to false
    if (handler === false) {
      return next()
    }

    // In case of no handler guessed
    if (typeof handler === 'undefined') {
      if (options.skipUnknown) {
        // Skip this middleware
        return next()
      } else {
        // Use 'default' handler
        handler = 'default'
      }
    }

    // Set statusCode
    if (options.statusCode) {
      res.statusCode = options.statusCode
    }

    // Try to set appreciate mime type based on handler
    const mime = options.mimes[handler]
    if (mime) {
      res.setHeader('Content-Type', mime)
    }

    // Try to find placeholder based on handler
    const placeholder = options.placeholders[handler]

    // Send placeholder and end response
    res.end(placeholder)
  }
}
