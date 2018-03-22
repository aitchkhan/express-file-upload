'use strict'

const path = require('path')
const uuidv4 = require('uuid/v4')
const mimeTypes = require('mime-types')

module.exports = {
  generateUuid,
  base64MimeType,
  generateOutputFilePath
}

function generateUuid () {
  return uuidv4()
}

function base64MimeType (encoded) {
  let result = null

  if (typeof encoded !== 'string') {
    return result
  }

  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)

  if (mime && mime.length) {
    result = mime[1]
  }

  return result
}

function generateOutputFilePath (mimeType) {
  const ext = mimeTypes.extension(mimeType)
  return `${path.join(__dirname, '../..', 'tmp')}/file-${Date.now()}.${ext}`
}
