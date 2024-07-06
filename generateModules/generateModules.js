const fs = require("fs");
const path = require("path");

if (process.argv.length < 3) {
  console.error("Usage: node generateFiles.js <lowercaseFileName>");
  process.exit(1);
}

// Get file name from command-line argument
const lowercaseFileName = process.argv[2];

// Convert the lowercase file name to uppercase folder name
const uppercaseFileName = lowercaseFileName.charAt(0).toUpperCase() + lowercaseFileName.slice(1);

// Define the target directory
const moduleDirectory = path.join(process.cwd(), "src", "app", "modules", uppercaseFileName);

// Create the target directory
fs.mkdirSync(moduleDirectory, { recursive: true });

// Function to replace placeholders in the template
const replacePlaceholders = (template) => {
  return template
    .replace(/{{lowercaseFileName}}/g, lowercaseFileName)
    .replace(/{{uppercaseFileName}}/g, uppercaseFileName);
};

// Import template strings and add debugging logs
const controllerTemplate = replacePlaceholders(require("./controllerTemplate"));
const serviceTemplate = replacePlaceholders(require("./serviceTemplate"));
const routesTemplate = replacePlaceholders(require("./routesTemplate"));
const modelTemplate = replacePlaceholders(require("./modelTemplate"));

// Write the processed templates to files
fs.writeFileSync(path.join(moduleDirectory, `${lowercaseFileName}.controller.js`), controllerTemplate);
fs.writeFileSync(path.join(moduleDirectory, `${lowercaseFileName}.service.js`), serviceTemplate);
fs.writeFileSync(path.join(moduleDirectory, `${lowercaseFileName}.routes.js`), routesTemplate);
fs.writeFileSync(path.join(moduleDirectory, `${lowercaseFileName}.model.js`), modelTemplate);

console.log(
  `Module ${uppercaseFileName} with files ${lowercaseFileName}.controller.js, ${lowercaseFileName}.service.js, ${lowercaseFileName}.routes.js, and ${lowercaseFileName}.model.js has been created.`
);
