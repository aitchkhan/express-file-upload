'use strict'

const sharp = require('sharp')
const constants = require('../constants')

module.exports = {
  resizeImage
}

function resizeImage (inputBuffer, outputFilePath) {
  if (!inputBuffer && !outputFilePath) throw new Error('image buffer or output fileName required')
  // give destination from here. only expect file name

  const image = sharp(inputBuffer, { losless: true, quality: 100 })

  return image
    .metadata()
    .then(metadata => {
      return image
        .resize(constants.image.dimensions.height, constants.image.dimensions.width)
        .max()
        .toFile(outputFilePath)
        .then(success => outputFilePath)
        .catch((error) => error) // remove catch from here, so the error can be propogated upwards or throw error from here
    })
}
