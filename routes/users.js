var express = require('express');
var router = express.Router();
var users = require('../controller/users');
var verifyToken = require('../middleware/auth');

router.get('/', users.main);
router.post('/posts', verifyToken, users.posts);
router.post('/signup', users.signup);
router.post('/login', users.login);

module.exports = router;