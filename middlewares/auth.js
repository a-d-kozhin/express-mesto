const jwt = require('jsonwebtoken');

module.exports.auth = (req, res, next) => {
  const token = req.headers.authorization
    && req.headers.authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;

  next();
};
