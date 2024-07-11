const controllerTemplate = `
import { Request, Response } from 'express';
import catchAsync from "../../utils/catchAsync";
import { 
  {{uppercaseFileName}}Services
 } from "./{{lowercaseFileName}}.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';

// Create {{lowercaseFileName}}
const create{{uppercaseFileName}} = catchAsync(async (req:Request, res:Response) => {
  const result = await 
  {{uppercaseFileName}}Services.create{{uppercaseFileName}}(req.body);
  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "{{uppercaseFileName}} created successfully",
    data: result,
  });
});

// Get all {{lowercaseFileName}}
const getAll{{uppercaseFileName}} = catchAsync(async (req:Request, res:Response) => {
  const result = await 
  {{uppercaseFileName}}Services.getAll{{uppercaseFileName}}(req.query);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Got all {{uppercaseFileName}} successfully",
    data: result,
  });
});

// Get single {{lowercaseFileName}}
const getSingle{{uppercaseFileName}} = catchAsync(async (req:Request, res:Response) => {
  const { id } = req.params;
  const result = await 
  {{uppercaseFileName}}Services.getSingle{{uppercaseFileName}}(id);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Got single {{uppercaseFileName}} successfully",
    data: result,
  });
});

// Update {{lowercaseFileName}}
const update{{uppercaseFileName}} = catchAsync(async (req:Request, res:Response) => {
  const { id } = req.params;
  const result = await 
  {{uppercaseFileName}}Services.update{{uppercaseFileName}}(id, req.body);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "{{uppercaseFileName}} updated successfully",
    data: result,
  });
});

// Delete {{lowercaseFileName}}
const delete{{uppercaseFileName}} = catchAsync(async (req:Request, res:Response) => {
  const { id } = req.params;
  const result = await 
  {{uppercaseFileName}}Services.delete{{uppercaseFileName}}(id);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "{{uppercaseFileName}} deleted successfully",
    data: result,
  });
});

export const {{uppercaseFileName}}Controllers ={
  create{{uppercaseFileName}},
  getAll{{uppercaseFileName}},
  getSingle{{uppercaseFileName}},
  update{{uppercaseFileName}},
  delete{{uppercaseFileName}}

}
`;

export default controllerTemplate;
