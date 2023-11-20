import { CustomError } from "../utils/CustomError.js";

export const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Errors";
  const BAD_REQUEST = 400;
  switch (err.name) {
    case "JsonWebTokenError":
      err.message = `Json Web Token is invalid, Try again `;
      err.statusCode = 401;
      break;
    case "TokenExpiredError":
      err.message = "Json Web Token is Expired, Try again ";
      err.statusCode = 401;
      break;
    default:
      break;
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(err.statusCode).json({
    error: err.message,
  });
};

export default ErrorMiddleware;
