const textToJsonParserTemplate = `
import { Request, Response, NextFunction } from 'express';
const textToJsonPerser = (req: Request, res: Response, next: NextFunction) => {
    if (req?.body?.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  };
  export default textToJsonPerser;
  `;

module.exports = textToJsonParserTemplate;
