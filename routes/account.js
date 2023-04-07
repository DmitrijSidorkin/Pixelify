const express = require("express");

const router = express.Router();
const { ROUTES } = require("../controllers/routes");

const users = require("../controllers/users");

router.route(ROUTES.account).get(users.renderAccount);

module.exports = router;
