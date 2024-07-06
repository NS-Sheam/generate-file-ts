const fs = require("fs");
const path = require("path");

if (process.argv.length < 3) {
  console.error("Usage: node generateHelpers.js <lowercaseFileName>");
  process.exit(1);
}

// Get file name from command-line argument
const lowercaseFileName = process.argv[2];

const helpersDirectory = path.join(process.cwd(), "src", "app", "helpers");

// Create the target directory
fs.mkdirSync(helpersDirectory, { recursive: true });

// Function to replace placeholders in the template
const replacePlaceholders = (template) => {
  return template.replace(/{{lowercaseFileName}}/g, lowercaseFileName);
};

// Import template strings and replace placeholders
const catchAsyncTemplate = replacePlaceholders(require("./catchAsyncTemplate"));
const sendResponseTemplate = replacePlaceholders(require("./sendResponseTemplate"));
const jwtHelpersTemplate = replacePlaceholders(require("./jwtHelpersTemplate"));
const queryBuilderTemplate = replacePlaceholders(require("./queryBuilderTemplate"));

// Write the processed templates to files
fs.writeFileSync(path.join(helpersDirectory, "catchAsync.js"), catchAsyncTemplate);
fs.writeFileSync(path.join(helpersDirectory, "sendResponse.js"), sendResponseTemplate);
fs.writeFileSync(path.join(helpersDirectory, "jwtHelpers.js"), jwtHelpersTemplate);
fs.writeFileSync(path.join(helpersDirectory, "queryBuilder.js"), queryBuilderTemplate);

console.log(`Helpers catchAsync.js, sendResponse.js, and jwtHelpers.js have been created.`);
// Path: utilsGenerator/textToJsonParserTemplate.js
