const express = require('express');
const router = express.Router();
const getInfoAccountController = require('../controllers/getInfoAccount');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/', verifyJWT, getInfoAccountController.handleGetInfoAccount);

module.exports = router;