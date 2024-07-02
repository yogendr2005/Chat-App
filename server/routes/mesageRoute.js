const express = require('express');
const { sendMessage, getMessage } = require('../controllers/messageControllers');
const isAuthencticated = require('../middleware/isAuthenticated');
const router = express.Router();


router.route("/send/:id").post(isAuthencticated, sendMessage);
router.route("/:id").get(isAuthencticated, getMessage)

module.exports = router; 