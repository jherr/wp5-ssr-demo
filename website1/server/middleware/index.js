const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const envMiddleware = require('./environmentMiddleware')
const securityMiddleware = require('./security')

module.exports = (express, app, done) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(cookieParser())

  // security middleware
  securityMiddleware(express, app, done)

  // environment based middlewares
  envMiddleware(express, app, done)
  app.use((req, res, next) => {
    const cookie = req.cookies.jwToken
    const jwToken = 'fake' // TRY: set to 'real' to authenticate ADMIN route

    if (cookie !== jwToken) {
      res.cookie('jwToken', jwToken, { maxAge: 900000 })
      req.cookies.jwToken = jwToken
    }

    next()
  })
}
