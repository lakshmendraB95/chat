
const debug = require('debug')('app');

exports.wrapAsync = function wrapAsync(asyncHandler) {
  return (req, res, next) => {
    asyncHandler(req, res, next)
    .catch(ex => {
      debug(ex);
      res.status(500).send(ex.message);
    });
  };
}