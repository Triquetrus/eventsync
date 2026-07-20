var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var aiClient = null;
function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new import_genai.GoogleGenAI({ apiKey });
  }
  return aiClient;
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "15mb" }));
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.post("/api/generate-caption", async (req, res) => {
    try {
      const { eventType, tone, eventName, location, description, platform, imageBase64, imageType } = req.body;
      if (!eventName) {
        return res.status(400).json({ error: "Event name is required." });
      }
      const ai = getAI();
      const promptParts = [];
      let textPrompt = `You are EventSync AI, a world-class social media assistant.
Generate 3 distinct alternative captions and matching sets of optimized hashtags for a social media post about the following event:
- Event Name: ${eventName}
- Event Type: ${eventType || "General"}
- Location: ${location || "Not specified"}
- Description: ${description || "No description provided"}
- Selected Tone: ${tone || "fun"}
- Target Social Platform: ${platform || "all"}

Please output the result strictly in JSON format as an object with the following schema:
{
  "captions": [
    {
      "text": "Caption text goes here",
      "hashtags": ["#tag1", "#tag2", "#tag3"],
      "explanation": "Why this caption works for the selected tone/platform"
    }
  ],
  "smartPrompts": [
    "Suggested photo opportunity prompt 1",
    "Suggested photo opportunity prompt 2"
  ]
}

Make sure the captions are optimized specifically for ${platform === "all" ? "a variety of platforms" : platform}.
- Instagram: visually engaging, conversational, friendly spacing, visual descriptions.
- LinkedIn: professional, insightful, structured, networking-friendly.
- Facebook: relatable, community-focused, readable, shares-encouraging.

Generate 3 captions reflecting the selected tone "${tone}".`;
      if (imageBase64 && imageType) {
        const pureBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        promptParts.push({
          inlineData: {
            data: pureBase64,
            mimeType: imageType
          }
        });
        textPrompt += `

CRITICAL: Analyze the attached image for this event and make the captions directly reference the visual elements, setting, colors, and subject matter depicted in the photo, creating a highly customized, authentic post!`;
      }
      promptParts.push(textPrompt);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: promptParts,
        config: {
          responseMimeType: "application/json"
        }
      });
      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response content received from Gemini API.");
      }
      const parsedJSON = JSON.parse(responseText);
      return res.json(parsedJSON);
    } catch (error) {
      console.error("Caption generation failed:", error);
      return res.status(500).json({
        error: error.message || "An unexpected error occurred during caption generation.",
        details: error.toString()
      });
    }
  });
  app.post("/api/generate-prompts", async (req, res) => {
    try {
      const { eventType, eventName, location } = req.body;
      const ai = getAI();
      const textPrompt = `Generate a list of 5 creative, highly specific, event-based photo/video prompts to guide a user during their event.
- Event Name: ${eventName}
- Event Type: ${eventType || "General"}
- Location: ${location || "Not specified"}

These prompts should trigger before, during, and after the event (e.g. "Take a group photo by the entrance", "Capture a candid laugh during the speech", "Record a 5-second video of the crowd reacting").

Return your response strictly in JSON format as an array of strings:
[
  "Prompt 1",
  "Prompt 2",
  "Prompt 3",
  "Prompt 4",
  "Prompt 5"
]`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [textPrompt],
        config: {
          responseMimeType: "application/json"
        }
      });
      const parsedJSON = JSON.parse(response.text || "[]");
      return res.json({ prompts: parsedJSON });
    } catch (error) {
      console.error("Prompts generation failed:", error);
      return res.status(500).json({
        error: error.message || "Failed to generate smart prompts",
        details: error.toString()
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EventSync AI Server running on http://localhost:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Error starting EventSync server:", err);
});
//# sourceMappingURL=server.cjs.map
