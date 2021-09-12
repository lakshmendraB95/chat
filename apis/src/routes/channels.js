const express = require('express');
const channels = require('../controllers/channels');
const messages = require('../controllers/messages');
const { wrapAsync } = require('../utils');
const mws = require("../middlewares")

const router = new express.Router();

router.post('/create',mws.auth.authenticate, wrapAsync(channels.createChannel));
router.post('/join', mws.auth.authenticate, wrapAsync(channels.joinChannel));
router.get('/list', mws.auth.authenticate, wrapAsync(channels.listChannel));
router.post('/send',mws.auth.authenticate, wrapAsync(messages.createMessage));
router.get('/list-messages/:channelId',mws.auth.authenticate, wrapAsync(messages.listMessages));

module.exports = router;