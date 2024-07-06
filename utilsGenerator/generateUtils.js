const fs = require("fs");
const path = require("path");

if (process.argv.length < 3) {
  console.error("Usage: node generateUtils.js <lowercaseFileName>");
  process.exit(1);
}

// Get file name from command-line argument
const lowercaseFileName = process.argv[2];

const utilsDirectory = path.join(process.cwd(), "src", "app", "utils");

// Create the target directory
fs.mkdirSync(utilsDirectory, { recursive: true });

// Function to replace placeholders in the template
const replacePlaceholders = (template) => {
  return template.replace(/{{lowercaseFileName}}/g, lowercaseFileName);
};

// Import template strings and replace placeholders
const textToJsonParserTemplate = replacePlaceholders(require("./textToJsonParserTemplate"));

// Write the processed templates to files
fs.writeFileSync(path.join(utilsDirectory, `${lowercaseFileName}.js`), textToJsonParserTemplate);

console.log(`Utility ${lowercaseFileName}.js has been created.`);
// Path: utilsGenerator/textToJsonParserTemplate.js
