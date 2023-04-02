const express = require("express");
const router = express.Router();

const users = require("../controllers/users");

router.route("/account").get(users.renderAccount);
