'use strict'

// const path = require('path')
const multer = require('multer')
const mimeTypes = require('mime-types')
const uploadsDir = __dirname + '/tmp'

module.exports = {
  uploadSingle
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    const ext = mimeTypes.extension(file.mimetype)
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
  }
})

const upload = multer({ storage })

function uploadSingle (req, res, next) {
  return upload.single('file')
}
