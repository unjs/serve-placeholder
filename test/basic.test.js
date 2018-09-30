const connect = require('connect')
const Axios = require('axios')
const placeholder = require('..')
const defaults = require('../src/defaults')

describe('basic', () => {
  let app
  let server
  let axios

  it('init', () => {
    app = connect()

    app.use('/test', (req, res) => { res.end('Works!') })
    app.use(placeholder({}))

    server = app.listen(8080)
    axios = Axios.create({ baseURL: 'http://localhost:8080' })
  })

  it('/test', async () => {
    const response = await axios.get('/test')
    expect(response.data).toBe('Works!')
  })

  // Test formats
  Object.entries(defaults.handler).map(([ext, handler]) => {
    it('Handler for ' + ext, async () => {
      const response = await axios.get(`/assets/foo${ext}`, {
        transformResponse: req => req
      }).catch(e => e.response)

      const placeholder = defaults.placeholder[handler]

      if (placeholder instanceof Buffer) {
        expect(response.data.data).toBe(defaults.placeholder[handler].data)
      } else {
        expect(response.data).toBe(defaults.placeholder[handler])
      }
    })
  })

  it('close', () => {
    return new Promise(resolve => server.close(resolve))
  })
})
