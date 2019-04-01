const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')
const urlMatch = require('url-pattern-match')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const {pathname, query} = parsedUrl
    const profileMatch = urlMatch('/profile/:id', pathname)

    if (profileMatch.state) {
      const newQuery = Object.assign({}, query, profileMatch.children)

      return app.render(req, res, '/profile', newQuery)
    }

    handle(req, res, parsedUrl)
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})