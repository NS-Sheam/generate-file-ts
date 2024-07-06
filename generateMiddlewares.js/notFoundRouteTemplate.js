const notFoundRouteTemplate = `
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
const notFound = (req: Request, res: Responst, next: NextFunction) => {
    const success = false;
    const status = httpStatus.NOT_FOUND;
    const message = \`Requested path \${req.originalUrl} Not Found\`;
    res.status(status).json({
      status,
      success,
      message,
    });
  };
  
  export default notFound;
`;

module.exports = notFoundRouteTemplate;
