
const express = require('express');
const users = require('../controllers/users');
const { wrapAsync } = require('../utils');

const router = new express.Router();

router.post('/register', wrapAsync(users.register));
router.post('/login', wrapAsync(users.login));
router.post("/data", wrapAsync(users.userData))

module.exports = router;