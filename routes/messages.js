const express = require('express');
const router = express.Router();
const passport = require('passport');

const messagesController = require('../controllers/messages_controller');

router.get('/chats',passport.checkAuthentication,messagesController.userChats);

module.exports = router;