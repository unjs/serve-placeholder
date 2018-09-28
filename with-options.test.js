const connect = require('connect')
const Axios = require('axios')
const placeholder = require('../src')

describe('skipUnknown', () => {
  let app
  let server
  let axios

  it('init', () => {
    app = connect()

    app.use('/test', (req, res) => { res.end('Works!') })

    app.use(placeholder({
      skipUnknown: true
    }))

    app.use('/', (req, res) => { res.end('Unknown!') })

    server = app.listen(8080)
    axios = Axios.create({ baseURL: 'http://localhost:8080' })
  })

  it('/test', async () => {
    const response = await axios.get('/test')
    expect(response.data).toBe('Works!')
  })

  it('unknown', async () => {
    const response = await axios.get('/assets/foo.unknown').catch(e => e.response)
    expect(response.data).toBe('Unknown!')
  })

  it('close', () => {
    return new Promise(resolve => server.close(resolve))
  })
})
