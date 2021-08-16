const Boom = require("@hapi/boom");
const expressJwt = require("express-jwt");
const get = require("lodash.get");
const User = require("../models").user;
const token = require("../constants/token");

const secret = JSON.parse(process.env.JWT_SECRET);

const authorize = () => {
  return [
    // authenticate JWT token and attach user to request object (req.user)
    expressJwt({ secret: secret.key, algorithms: [secret.type] }),
    async (req, res, next) => {
      const userId = get(req, `user['${token.TOKEN_KEY}'].x-user-id`, null);

      if (!userId) {
        return next(Boom.unauthorized("Unauthorized"));
      }

      const user = await User.findById(userId);

      if (!user) {
        return next(Boom.unauthorized("Unauthorized"));
      }

      req.user = user;

      next();
    },
  ];
};

module.exports = authorize;
