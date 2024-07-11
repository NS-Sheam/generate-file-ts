const modelTemplate = `
import mongoose, {model} from "mongoose";

// Declare the Schema of the Mongo model
const {{lowercaseFileName}}Schema = new mongoose.Schema(
  {
    // Define the schema fields
  },
  {
    timestamps: true,
  }
);

// Export the model
export const {{uppercaseFileName}} = model("{{uppercaseFileName}}", {{lowercaseFileName}}Schema);
`;

export default modelTemplate;
