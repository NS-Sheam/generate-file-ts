import fs from "fs";
import path from "path";
// import { fileURLToPath } from 'url';

// Determine the directory name of the current module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

if (process.argv.length < 3) {
  console.error("Usage: ts-node generateUtils.ts <lowercaseFileName>");
  process.exit(1);
}

// Get file name from command-line argument
const lowercaseFileName: string = process.argv[2];

const utilsDirectory: string = path.join(process.cwd(), "src", "app", "utils");

// Create the target directory
fs.mkdirSync(utilsDirectory, { recursive: true });

// Function to replace placeholders in the template
const replacePlaceholders = (template: string): string => {
  return template.replace(/{{lowercaseFileName}}/g, lowercaseFileName);
};

// Import template strings and replace placeholders
import textToJsonParserTemplate from "./textToJsonParserTemplate.js";

const processedTextToJsonParserTemplate: string = replacePlaceholders(
  textToJsonParserTemplate,
);

// Write the processed templates to files
fs.writeFileSync(
  path.join(utilsDirectory, `${lowercaseFileName}.ts`),
  processedTextToJsonParserTemplate,
);

console.log(`Utility ${lowercaseFileName}.ts has been created.`);
