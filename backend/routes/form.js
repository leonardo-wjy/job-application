const express = require('express');
const router = express.Router();
const authJwt = require("../middleware/authJWT");

const {
	form
  } = require("../controllers/index");
  

router.post('/:id', authJwt, form.Save);
router.get('/id/:id', authJwt, form.getById);
router.get('/all', authJwt, form.getAll);
router.delete('/delete/:id', authJwt, form.Delete);

module.exports = router;