import fs from "fs";
import path from "path";
// import { fileURLToPath } from "url";
import globalErrorHandlerTemplate from "./globalErrorHandlerTamplate";
import notFoundRouteTemplate from "./notFoundRouteTemplate";

// Determine the directory name of the current module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

if (process.argv.length < 3) {
  console.error("Usage: node generateMiddlewares.js <lowercaseFileName>");
  process.exit(1);
}

// Get file name from command-line argument
const lowercaseFileName: string = process.argv[2];

const middlewareDirectory: string = path.join(
  process.cwd(),
  "src",
  "app",
  "middlewares",
);

// Create the target directory
fs.mkdirSync(middlewareDirectory, { recursive: true });

// Function to replace placeholders in the template
const replacePlaceholders = (template: string): string => {
  return template.replace(/{{lowercaseFileName}}/g, lowercaseFileName);
};

const processedGlobalErrorHandlerTemplate: string = replacePlaceholders(
  globalErrorHandlerTemplate,
);
const processedNotFoundRouteTemplate: string = replacePlaceholders(
  notFoundRouteTemplate,
);

// Write the processed templates to files
fs.writeFileSync(
  path.join(middlewareDirectory, `globalErrorHandler.ts`),
  processedGlobalErrorHandlerTemplate,
);
fs.writeFileSync(
  path.join(middlewareDirectory, "notFound.ts"),
  processedNotFoundRouteTemplate,
);

console.log(
  `Middleware ${lowercaseFileName} with files globalErrorHandler.ts and notFound.ts has been created.`,
);
