'use strict'

const fs = require('fs')

const commonHelper = require('../../lib/helpers/common')
const imageHelper = require('../../lib/helpers/image')

module.exports = {
  uploadFile
}

async function uploadFile(payload) {
  const base64Data = payload.body ? payload.body.base64Img : null
  let imgBuffer = null
  let outputFilePath = null

  // base 64 img
  if (base64Data) {
    ({ imgBuffer, outputFilePath } = await _uploadBase64Img(base64Data))
    fs.writeFile(outputFilePath, imgBuffer)
  }

  return {
    message: 'file upload success'
  }
}

async function _uploadBase64Img(base64Img) {
  const mimeType = commonHelper.base64MimeType(base64Img)

  if (!mimeType) {
    throw Error('Only base64 images are allowed.')
  }

  base64Img = base64Img.replace(/^data:(.*)base64,/, '')
  const outputFilePath = commonHelper.generateOutputFilePath(mimeType)

  const imgBuffer = Buffer.from(base64Img, 'base64')
  return { imgBuffer, outputFilePath }
}

