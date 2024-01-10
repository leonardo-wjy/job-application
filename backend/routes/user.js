const express = require('express');
const router = express.Router();
const authJwt = require("../middleware/authJWT");

const {
	user
  } = require("../controllers/index");
  

router.post('/login', user.Login);
router.post('/register', user.Register);

module.exports = router;