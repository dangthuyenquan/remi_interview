const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videosController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/')
    .get(videosController.getAllVideos)
    .post(videosController.createNewVideo)
    .put(videosController.updateVideo)
    .delete(videosController.deleteVideo);

router.route('/:id')
    .get(videosController.getVideo);

module.exports = router;