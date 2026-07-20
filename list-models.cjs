const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
async function run() {
  const models = await ai.models.list();
  const names = [];
  for await (const m of models) names.push(m.name);
  console.log(names.filter(n => n.includes('imagen') || n.includes('image')));
}
run().catch(console.error);
