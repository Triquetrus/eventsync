const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
async function run() {
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-fast-generate-001',
    prompt: 'A futuristic city',
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '1:1'
    }
  });
  console.log(response.generatedImages?.[0]?.image?.imageBytes ? "SUCCESS" : "FAIL");
}
run().catch(console.error);
