// https://ai.google.dev/gemini-api/docs/text-generation#javascript
import {GoogleGenAI} from "@google/genai";
import * as fs from "node:fs";
import dotenv from "dotenv"
dotenv.config()
async function main() {

  const ai = new GoogleGenAI({apiKey : process.env.GOOGLE_GENERATIVE_AI_API_KEY});

  const prompt =
    "Create a picture of Shawarma sandwish in Syrian restaurant";

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents: prompt,
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("generated-assets/gemini6.png", buffer);
      console.log("Image saved as gemini-native-image-6.png");
    }
  }
}

main();