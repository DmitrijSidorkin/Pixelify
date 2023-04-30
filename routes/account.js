const express = require("express");

const router = express.Router();
const { ROUTES } = require("../controllers/routes");
const { isLoggedIn } = require("../middleware");

const account = require("../controllers/account");

router.route(ROUTES.account).get(isLoggedIn, account.renderAccountMain);

module.exports = router;
