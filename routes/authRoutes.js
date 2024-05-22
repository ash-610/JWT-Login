const router = require('express').Router();
const { get_signup , get_login , get_logout , post_login , post_signup } = require('../Controller/authController')

router.get("/signup", get_signup);
router.post("/signup", post_signup);

router.get("/login", get_login);
router.post("/login", post_login);

router.get("/logout", get_logout);

module.exports = router;