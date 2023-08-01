const express = require("express");
const multer = require("multer");

const { storage } = require("../cloudinary");
const upload = multer({ storage });
const router = express.Router();
const { ROUTES } = require("../controllers/routes");
const { isLoggedIn } = require("../middleware");

const account = require("../controllers/account");

router.route(ROUTES.account).get(isLoggedIn, account.renderAccountMain);
router.route(ROUTES.fetchUserData).get(account.fetchUserData);
router
  .route(ROUTES.changePassword)
  .get(isLoggedIn, account.renderChangePassword);

router.route(ROUTES.changeProfile).get(isLoggedIn, account.renderChangeProfile);
router.route(ROUTES.updatePassword).post(isLoggedIn, account.updatePassword);
router
  .route(ROUTES.updateProfile)
  .post(isLoggedIn, upload.single("profileImg"), account.updateProfile);

router.route(ROUTES.viewProfile).get(account.viewProfile);

module.exports = router;
