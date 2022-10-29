const express = require('express');
const router = express.Router();
const {hashPdfs} = require('../controllers/hashingpdfs');


router.route('/').get(hashPdfs);

module.exports = router;