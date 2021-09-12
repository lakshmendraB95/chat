const config = require('../config');
const auth = require('../helpers/auth');
const { wrapAsync } = require('../utils');


exports.authenticate = function (req, res, next) {
  const { _chat } = req;
  const { loggedIn = false } = _chat;

  if (loggedIn === false) {
    res.status(403).json({
      error: 'forbidden',
    });
    return;
  }

  next();
};

exports.parse = wrapAsync(async function sessionParser(req, res, next) {
  const sessionId = req.header(config.get('auth.header'));
  console.log('Sessionid', sessionId);

  if (!sessionId) {
    req._chat = {
        loggedIn: false,
        user: null,
    };
    next();
    return;
  }


  const userInfo = await auth.decode(sessionId);
  req._chat = { 
      loggedIn: true,
      user: userInfo,
    };
  next();
});