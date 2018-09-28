const connect = require('connect')
const Axios = require('axios')
const placeholder = require('..')

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

  it('js', async () => {
    const response = await axios.get('/assets/foo.js').catch(e => e.response)
    expect(response.data).toMatchSnapshot()
  })

  it('json', async () => {
    const response = await axios.get('/assets/foo.json').catch(e => e.response)
    expect(response.data).toMatchSnapshot()
  })

  it('html', async () => {
    const response = await axios.get('/assets/foo.html').catch(e => e.response)
    expect(response.data).toMatchSnapshot()
  })

  it('css', async () => {
    const response = await axios.get('/assets/foo.css').catch(e => e.response)
    expect(response.data).toMatchSnapshot()
  })

  it('png', async () => {
    const response = await axios.get('/assets/foo.png').catch(e => e.response)
    expect(Buffer.from(response.data).toString('base64')).toMatchSnapshot()
  })

  it('close', () => {
    return new Promise(resolve => server.close(resolve))
  })
})
