'use strict'

const userService = require('../../lib/services/users')

module.exports = {
  uploadFile,
}

async function uploadFile (req, res, next) {
  const payload = {
    file: req.file,
    body: req.body || {}
  }

  const response = await userService.uploadFile(payload)
  res.json(response)
}

