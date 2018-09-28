module.exports = {
  statusCode: 404,

  skipUnknown: false,

  handler: {
    '.js': 'js',
    '.json': 'json',
    '.css': 'css',
    '.html': 'html',
    '.htm': 'html',
    '.png': 'image',
    '.jpg': 'image',
    '.jpeg': 'image',
    '.gif': 'image',
    '.svg': 'image',
    '.webp': 'image',
    '.bmp': 'image'
  },

  placeholder: {
    js: '/* script not found */',
    json: '{}',
    html: '<!-- page not found -->',
    css: '/* style not found */',
    image: Buffer.from('R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==', 'base64')
  },

  mime: {
    js: 'application/javascript',
    json: 'application/json',
    html: 'text/html',
    css: 'text/css',
    image: 'image/gif'
  }
}
