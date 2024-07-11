import fs from "fs";
import path from "path";
import controllerTemplate from "./controllerTemplate";
import serviceTemplate from "./serviceTemplate";
import modelTemplate from "./modelTemplate";
import routesTemplate from "./routesTemplate";

if (process.argv.length < 3) {
  console.error("Usage: node generateFiles.js <lowercaseFileName>");
  process.exit(1);
}

// Get file name from command-line argument
const lowercaseFileName: string = process.argv[2];

// Convert the lowercase file name to uppercase folder name
const uppercaseFileName: string =
  lowercaseFileName.charAt(0).toUpperCase() + lowercaseFileName.slice(1);

// Define the target directory
const moduleDirectory: string = path.join(
  process.cwd(),
  "src",
  "app",
  "modules",
  uppercaseFileName,
);

// Create the target directory
fs.mkdirSync(moduleDirectory, { recursive: true });

// Function to replace placeholders in the template
const replacePlaceholders = (template: string): string => {
  return template
    .replace(/{{lowercaseFileName}}/g, lowercaseFileName)
    .replace(/{{uppercaseFileName}}/g, uppercaseFileName);
};

// Process templates
const processedControllerTemplate: string =
  replacePlaceholders(controllerTemplate);
const processedServiceTemplate: string = replacePlaceholders(serviceTemplate);
const processedRoutesTemplate: string = replacePlaceholders(routesTemplate);
const processedModelTemplate: string = replacePlaceholders(modelTemplate);

// Write the processed templates to files
fs.writeFileSync(
  path.join(moduleDirectory, `${lowercaseFileName}.controller.ts`),
  processedControllerTemplate,
);
fs.writeFileSync(
  path.join(moduleDirectory, `${lowercaseFileName}.service.ts`),
  processedServiceTemplate,
);
fs.writeFileSync(
  path.join(moduleDirectory, `${lowercaseFileName}.routes.ts`),
  processedRoutesTemplate,
);
fs.writeFileSync(
  path.join(moduleDirectory, `${lowercaseFileName}.model.ts`),
  processedModelTemplate,
);

console.log(
  `Module ${uppercaseFileName} with files ${lowercaseFileName}.controller.ts, ${lowercaseFileName}.service.ts, ${lowercaseFileName}.routes.ts, and ${lowercaseFileName}.model.ts has been created.`,
);
