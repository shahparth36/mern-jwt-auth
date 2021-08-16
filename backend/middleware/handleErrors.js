const handleErrors = (err, req, res, next) => {
  switch (true) {
    case err.name === "UnauthorizedError":
      return res
        .status(401)
        .json({ type: "Unauthorized", message: "Invalid JWT token" });

    case typeof err === "string":
      if (err.indexOf("Validation error") !== -1) {
        const parts = err.split("Validation error");
        return res
          .status(400)
          .json({ type: "Validation error", message: JSON.parse(parts[1]) });
      }
      break;

    case err.type && err.type === "entity.parse.failed":
      return res
        .status(400)
        .json({ type: "Bad Request", message: "Entity parse failed" });

    case err.isBoom:
      const {
        statusCode,
        payload: { error },
      } = err.output;
      return res.status(statusCode).json({ type: error, message: err.message });

    case err.isHttpError:
      return res
        .status(err.statusCode)
        .json({ type: err.name, message: err.message });

    default:
      return res.status(500).json({
        type: "Internal Server Error",
        message: "An internal server error occurred",
      });
  }
};

module.exports = handleErrors;
