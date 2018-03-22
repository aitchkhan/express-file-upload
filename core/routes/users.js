'use strict'
const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const fileUpload = require('../middlewares/file-upload')

/* Upload a file */
router.post('/files', fileUpload.uploadSingle(), userController.uploadFile)

module.exports = router
