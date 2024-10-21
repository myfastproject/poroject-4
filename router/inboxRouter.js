//external imports
const express = require("express");

//intarnal imports
const {getInbox} = require("../controller/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

//login page
router.get("/", decorateHtmlResponse("inbox"), getInbox);

module.exports = router;