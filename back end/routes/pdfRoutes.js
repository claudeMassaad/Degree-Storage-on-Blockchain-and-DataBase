const express = require('express');
const router = express.Router();
const {postPDF, validatePDF} = require('../controllers/PdfsController');

const authMiddleWare = require('../middleware/userAuth');

router.route('/postPDF').post(authMiddleWare,postPDF);
//create a route to validate the pdf.
router.route('/validate').post(validatePDF);
module.exports = router;