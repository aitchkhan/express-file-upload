const express = require('express')
const path = require('path')
const timeout = require('connect-timeout')
// const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const index = require('./routes/index')
const users = require('./routes/users')

const app = express()

// uncomment after placing your favicon in /public
app.use(timeout('2m')) // timeout after 2mins
app.use(logger('dev'))
app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))
app.use(haltOnTimedout)
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use('/', index)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}


  res.status(err.status || 500)
  res.json({
    err: 'error',
    message: err.message || 'internal server error'
})
})

function haltOnTimedout (req, res, next) {
  if (!req.timedout) {
    next()
  }
}

module.exports = app
