const globalErrorHandlerTemplate = `
import config from "../config/index";
import {Request, Response, NextFunction} from "express";
const globalErrorHandler = (err, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  let errorSource = [
    {
      path: req.originalUrl,
      message,
    },
  ];
  return res.status(status).json({
    success: false,
    message,
    errorSource,
    stack: config.node_env === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
`;

export default globalErrorHandlerTemplate;
