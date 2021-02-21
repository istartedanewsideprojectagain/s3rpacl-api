const jwt = require('jsonwebtoken');


exports.checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        return res.status(400).json({
          message: err.message,
          error: true,
        });
      }
      req.user = decoded._id;
      next();
    });
  } else {
    console.log("JWT not valid")
    return res.status(401).json({
      error: true,
      message: 'Auth token is not supplied',
    });
  }
};

exports.checkPresence = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
          error: true,
          data: null,
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      error: true,
      message: 'Auth token is not supplied',
      data: null,
    });
  }
};
