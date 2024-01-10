const express = require('express');
const router = express.Router();
const authJwt = require("../middleware/authJWT");

const {
	form
  } = require("../controllers/index");
  

router.post('/:id', authJwt, form.Save);
router.get('/:id', authJwt, form.getById);

module.exports = router;