import fs from "fs";
import path from "path";
// import { fileURLToPath } from 'url';

// Determine the directory name of the current module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

if (process.argv.length < 3) {
  console.error("Usage: ts-node generateHelpers.ts <lowercaseFileName>");
  process.exit(1);
}

// Get file name from command-line argument
const lowercaseFileName: string = process.argv[2];

const helpersDirectory: string = path.join(
  process.cwd(),
  "src",
  "app",
  "helpers",
);

// Create the target directory
fs.mkdirSync(helpersDirectory, { recursive: true });

// Function to replace placeholders in the template
const replacePlaceholders = (template: string): string => {
  return template.replace(/{{lowercaseFileName}}/g, lowercaseFileName);
};

// Import template strings and replace placeholders
import catchAsyncTemplate from "./catchAsyncTemplate.js";
import sendResponseTemplate from "./sendResponseTemplate.js";
import jwtHelpersTemplate from "./jwtHelpersTemplate.js";
import queryBuilderTemplate from "./queryBuilderTemplate.js";

const processedCatchAsyncTemplate: string =
  replacePlaceholders(catchAsyncTemplate);
const processedSendResponseTemplate: string =
  replacePlaceholders(sendResponseTemplate);
const processedJwtHelpersTemplate: string =
  replacePlaceholders(jwtHelpersTemplate);
const processedQueryBuilderTemplate: string =
  replacePlaceholders(queryBuilderTemplate);

// Write the processed templates to files
fs.writeFileSync(
  path.join(helpersDirectory, "catchAsync.ts"),
  processedCatchAsyncTemplate,
);
fs.writeFileSync(
  path.join(helpersDirectory, "sendResponse.ts"),
  processedSendResponseTemplate,
);
fs.writeFileSync(
  path.join(helpersDirectory, "jwtHelpers.ts"),
  processedJwtHelpersTemplate,
);
fs.writeFileSync(
  path.join(helpersDirectory, "queryBuilder.ts"),
  processedQueryBuilderTemplate,
);

console.log(
  `Helpers catchAsync.ts, sendResponse.ts, jwtHelpers.ts, and queryBuilder.ts have been created.`,
);
