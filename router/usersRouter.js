//external imports
const express = require("express");

//intarnal imports
const {getUsers} = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

//login page
router.get("/", decorateHtmlResponse("users"), getUsers);

module.exports = router;