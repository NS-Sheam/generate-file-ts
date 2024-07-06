const fs = require("fs");
const path = require("path");

if (process.argv.length < 3) {
  console.error("Usage: node generateFiles.js <lowercaseFileName>");
  process.exit(1);
}

// Get file name from command-line argument
const lowercaseFileName = process.argv[2];

const middlewareDirectory = path.join(process.cwd(), "src", "app", "middlewares");

// Create the target directory
fs.mkdirSync(middlewareDirectory, { recursive: true });

// Function to replace placeholders in the template
const replacePlaceholders = (template) => {
  return template.replace(/{{lowercaseFileName}}/g, lowercaseFileName);
};

// Import template strings and replace placeholders
const globalErrorHandlerTemplate = replacePlaceholders(require("./globalErrorHandlerTamplate"));
const notFoundRouteTemplate = replacePlaceholders(require("./notFoundRouteTemplate"));

// Write the processed templates to files
fs.writeFileSync(path.join(middlewareDirectory, `globalErrorHandler.js`), globalErrorHandlerTemplate);
fs.writeFileSync(path.join(middlewareDirectory, "notFound.js"), notFoundRouteTemplate);

console.log(`Middleware ${lowercaseFileName} with files globalErrorHandler.js and notFound.js has been created.`);
