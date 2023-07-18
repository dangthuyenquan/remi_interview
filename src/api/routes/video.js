const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videosController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
    .get(videosController.getAllVideos)
    .post(verifyJWT, videosController.createNewVideo);

module.exports = router;