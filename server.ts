import util from "util";
import express from "express";

import ffmpeg from 'fluent-ffmpeg';
ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');
import fs from 'fs';
import os from 'os';


import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

import webpush from "web-push";

let vapidKey = process.env.VAPID_PUBLIC_KEY || "";
vapidKey = vapidKey.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
let vapidPriv = process.env.VAPID_PRIVATE_KEY || "";
vapidPriv = vapidPriv.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

try {
  webpush.setVapidDetails(
    'mailto:test@example.com',
    vapidKey,
    vapidPriv
  );
} catch(e) { console.log(e); }

let subscriptions = [];
let scheduledEvents = [];

setInterval(() => {
  if (!scheduledEvents || scheduledEvents.length === 0) return;
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];
  const currentHour = String(now.getHours()).padStart(2, "0");
  const currentMin = String(now.getMinutes()).padStart(2, "0");
  const currentTime = currentHour + ":" + currentMin;

  scheduledEvents.forEach((evt) => {
    if (evt.date === currentDate && evt.time === currentTime) {
      if (!evt._backendNotified) {
         evt._backendNotified = true;
         const payload = JSON.stringify({ 
           title: "Event Starting Reminder!", 
           message: `Reminder: ${evt.name} is scheduled for now (${evt.time}) at ${evt.location || 'the location'}.` 
         });
         subscriptions.forEach(sub => {
           webpush.sendNotification(sub, payload).catch(e => console.error("Push fail", e));
         });
      }
    }
  });
}, 15000);


// Lazy-initialize Gemini client to prevent crash if key is missing
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) { throw new Error("GEMINI_API_KEY environment variable is required"); }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  
function getErrorMessage(e: any): string {
  let message = e.message || "An unknown error occurred";
  
  if (message.includes("429") || message.includes("RESOURCE_EXHAUSTED") || message.includes("quota")) {
    return "API Quota Exceeded. Please try again later or check your Gemini API billing details.";
  }

  try {
    const jsonStart = message.indexOf('{');
    if (jsonStart !== -1) {
       const parsed = JSON.parse(message.substring(jsonStart));
       if (parsed.error && parsed.error.message) {
         if (parsed.error.code === 429) {
           return "API Quota Exceeded. Please try again later or check your Gemini API billing details.";
         }
         message = parsed.error.message;
       }
    }
  } catch (err) {
    // Ignore parse error
  }
  return message;
}

const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Configure JSON parser with larger limits for base64 image uploads
  app.use(express.json({ limit: "15mb" }));

  // API endpoints
  
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  app.get("/api/vapidPublicKey", (req, res) => {
    res.send(vapidKey);
  });

  app.post("/api/subscribe", (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({});
  });

  app.post("/api/sync-events", (req, res) => {
    // Merge new events while keeping _backendNotified flag if it exists
    const newEvents = req.body.events || [];
    scheduledEvents = newEvents.map(newEvt => {
      const existing = scheduledEvents.find(e => e.id === newEvt.id);
      if (existing) {
        newEvt._backendNotified = existing._backendNotified;
      }
      return newEvt;
    });
    res.json({ success: true });
  });

  // POST /api/generate-caption
  
  
  // POST /api/generate-image
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image',
        contents: {
          parts: [{ text: prompt || "A beautiful image" }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          }
        }
      });
      let responseImage = null;
      if (response.candidates && response.candidates.length > 0) {
        const parts = response.candidates[0].content.parts;
        for (const p of parts) {
           if (p.inlineData && p.inlineData.mimeType.startsWith('image/')) {
              responseImage = `data:${p.inlineData.mimeType};base64,${p.inlineData.data}`;
              break;
           }
        }
      }
      if (responseImage) {
        res.json({ image: responseImage });
      } else {
        res.status(500).json({ error: "Failed to generate image.", text: response.text });
      }
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: getErrorMessage(e) });
    }
  });

  // POST /api/edit-image
  app.post("/api/edit-image", async (req, res) => {
    try {
      const { prompt, imageBase64, imageType } = req.body;
      const ai = getAI();
      const pureBase64 = imageBase64.replace(/^data:[a-zA-Z0-9\/+-]+;base64,/, "");

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-image",
        contents: {
          parts: [
            {
              inlineData: {
                data: pureBase64,
                mimeType: imageType || "image/png"
              }
            },
            {
              text: prompt || "Edit this image"
            }
          ]
        }
      });

      let responseImage = null;
      if (response.candidates && response.candidates.length > 0) {
        const parts = response.candidates[0].content.parts;
        for (const p of parts) {
           if (p.inlineData && p.inlineData.mimeType.startsWith('image/')) {
              responseImage = `data:${p.inlineData.mimeType};base64,${p.inlineData.data}`;
              break;
           }
        }
      }

      if (responseImage) {
        res.json({ image: responseImage });
      } else {
        res.json({ text: response.text });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/generate-caption", async (req, res) => {
    try {
      const { eventType, tone, eventName, location, description, platform, imageBase64, imageType } = req.body;

      if (!eventName) {
        return res.status(400).json({ error: "Event name is required." });
      }

      const ai = getAI();
      const promptParts: any[] = [];

      // Build context prompt
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
        // Strip out the data URL prefix if it exists
        const pureBase64 = imageBase64.replace(/^data:[a-zA-Z0-9\/+-]+;base64,/, "");
        promptParts.push({
          inlineData: {
            data: pureBase64,
            mimeType: imageType,
          },
        });
        textPrompt += `\n\nCRITICAL: Analyze the attached media (image or video) for this event and make the captions directly reference the visual elements, action, setting, colors, and subject matter depicted in the media, creating a highly customized, authentic post!`;
      }

      promptParts.push(textPrompt);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-002",
        contents: promptParts,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response content received from Gemini API.");
      }

      let cleanText = responseText;
      const match = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (match) {
        cleanText = match[1];
      }
      const parsedJSON = JSON.parse(cleanText);
      return res.json(parsedJSON);
    } catch (error: any) {
      console.error("Caption generation failed:", error);
      return res.status(500).json({
        error: getErrorMessage(error) || "An unexpected error occurred during caption generation.",
        details: error.toString(),
      });
    }
  });

    // POST /api/transcribe-audio
  app.post("/api/transcribe-audio", async (req, res) => {
    try {
      const { audioBase64, mimeType } = req.body;
      if (!audioBase64) return res.status(400).json({ error: "No audio data provided" });
      
      const ai = getAI();
      const pureBase64 = audioBase64.replace(/^data:audio\/\w+(?:;codecs=[^;]+)?;base64,/, "").replace(/^data:video\/\w+(?:;codecs=[^;]+)?;base64,/, "");
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-002",
        contents: [
          {
            inlineData: {
              data: pureBase64,
              mimeType: mimeType || "audio/webm"
            }
          },
          "Transcribe this voice note and convert it into clear, professional text to be used as context for social media captions. Output only the text."
        ]
      });
      return res.json({ text: response.text });
    } catch (error: any) {
      console.error("Audio transcription failed:", error);
      return res.status(500).json({ error: getErrorMessage(error) || "Failed to transcribe audio" });
    }
  });

  // POST /api/generate-prompts
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
        model: "gemini-2.5-flash-002",
        contents: [textPrompt],
        config: {
          responseMimeType: "application/json",
        },
      });

      const parsedJSON = JSON.parse(response.text || "[]");
      return res.json({ prompts: parsedJSON });
    } catch (error: any) {
      console.error("Prompts generation failed:", error);
      return res.status(500).json({
        error: getErrorMessage(error) || "Failed to generate smart prompts",
        details: error.toString(),
      });
    }
  });
  
  // POST /api/merge-videos
  // POST /api/merge-videos
  app.post("/api/merge-videos", async (req, res) => {
    let tmpDir = '';
    try {
      const { videos, brightness = 100, contrast = 100, filter = 'normal', volume = 100 } = req.body;
      if (!videos || !Array.isArray(videos) || videos.length === 0) {
        return res.status(400).json({ error: "No videos provided" });
      }

      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'merge-'));
      const concatListPath = path.join(tmpDir, 'concat.txt');
      const outputPath = path.join(tmpDir, 'output.mp4');
      
      let concatList = '';
      const ffprobe = util.promisify(ffmpeg.ffprobe);

      for (let i = 0; i < videos.length; i++) {
        const videoItem = videos[i];
        const base64String = typeof videoItem === 'string' ? videoItem : (videoItem.data || videoItem.base64Data || '');
        if (!base64String) {
          throw new Error("Invalid video data format at index " + i);
        }
        
        const b = typeof videoItem === 'object' && videoItem.brightness !== undefined ? videoItem.brightness : brightness;
        const c = typeof videoItem === 'object' && videoItem.contrast !== undefined ? videoItem.contrast : contrast;
        const f = typeof videoItem === 'object' && videoItem.filter !== undefined ? videoItem.filter : filter;
        const v = typeof videoItem === 'object' && videoItem.volume !== undefined ? videoItem.volume : volume;

        const isImage = base64String.startsWith('data:image/');
        const base64Data = base64String.replace(/^data:[^,]+,/, "");
        
        const ext = isImage ? '.png' : '.mp4';
        const rawFilePath = path.join(tmpDir, `raw_${i}${ext}`);
        fs.writeFileSync(rawFilePath, Buffer.from(base64Data, 'base64'));
        
        let hasAudio = false;
        if (!isImage) {
            try {
               const meta = await ffprobe(rawFilePath);
               hasAudio = meta.streams && meta.streams.some(s => s.codec_type === 'audio');
            } catch (err) {
               console.warn(`Could not probe file ${rawFilePath}, assuming no audio`);
            }
        }
        
        const normFilePath = path.join(tmpDir, `norm_${i}.mp4`);
        
        await new Promise((resolve, reject) => {
            let cmd = ffmpeg();
            
            if (isImage) {
               cmd = cmd.input(rawFilePath).inputOptions(['-loop', '1', '-t', '3']);
            } else {
               cmd = cmd.input(rawFilePath);
            }
            
            if (!hasAudio) {
               cmd = cmd.input('anullsrc=channel_layout=stereo:sample_rate=44100').inputOptions(['-f', 'lavfi']);
            }
            
            let vFilters = [
              'scale=1280:720:force_original_aspect_ratio=decrease',
              'pad=1280:720:(ow-iw)/2:(oh-ih)/2',
              'setsar=1',
              'fps=30'
            ];
            
            if (b !== 100 || c !== 100) {
               let valB = (b - 100) / 100.0;
               let valC = c / 100.0;
               vFilters.push(`eq=brightness=${valB}:contrast=${valC}`);
            }
            if (f === 'grayscale') vFilters.push('hue=s=0');
            if (f === 'sepia') vFilters.push('colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131');
            if (f === 'vintage') {
               vFilters.push('colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131');
               vFilters.push('eq=contrast=1.2');
            }
            
            let outOptions = [
                '-c:v', 'libx264',
                '-pix_fmt', 'yuv420p',
                '-c:a', 'aac',
                '-ar', '44100',
                '-ac', '2'
            ];
            
            if (isImage || !hasAudio) {
               outOptions.push('-shortest');
            }
            
            cmd.videoFilters(vFilters);
            
            if (v !== 100 && hasAudio) {
               cmd.audioFilters(`volume=${v / 100.0}`);
            }
            
            cmd.outputOptions(outOptions)
              .output(normFilePath)
              .on('end', resolve)
              .on('error', (err, stdout, stderr) => {
                 console.error('Error normalizing video ' + i + ':', stderr);
                 reject(new Error(`Error normalizing video ${i}: ${err.message}`));
              })
              .run();
        });
        
        concatList += `file '${normFilePath}'\n`;
      }
      fs.writeFileSync(concatListPath, concatList);

      await new Promise((resolve, reject) => {
        ffmpeg()
          .input(concatListPath)
          .inputOptions(['-f', 'concat', '-safe', '0'])
          .outputOptions(['-c:v', 'copy', '-c:a', 'copy'])
          .output(outputPath)
          .on('end', resolve)
          .on('error', (err, stdout, stderr) => {
            console.error('ffmpeg stderr:', stderr);
            reject(new Error(err.message + '\nStderr: ' + stderr));
          })
          .run();
      });

      const resultBase64 = fs.readFileSync(outputPath, { encoding: 'base64' });
      res.json({ videoBase64: resultBase64, mimeType: "video/mp4" });
    } catch (error) {
      console.error('Error merging videos:', error);
      res.status(500).json({ error: error.message });
    } finally {
      if (tmpDir) {
         fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    }
  });


// POST /api/analyze-video

  app.post("/api/analyze-video", async (req, res) => {
    try {
      const { prompt, videoBase64, videoType } = req.body;
      const ai = getAI();
      const pureBase64 = videoBase64.replace(/^data:[a-zA-Z0-9\\/+-]+;base64,/, "");

      let uploadedFile = null;
      let promptParts = [];
      const mime = videoType || "video/mp4";
      
      if (mime.startsWith("video/")) {
         const tmpFile = path.join(os.tmpdir(), `upload_${Date.now()}.mp4`);
         fs.writeFileSync(tmpFile, Buffer.from(pureBase64, 'base64'));
         uploadedFile = await ai.files.upload({ file: tmpFile, mimeType: mime });
         
         let fileInfo = await ai.files.get({ name: uploadedFile.name });
         while (fileInfo.state === 'PROCESSING') {
           await new Promise(r => setTimeout(r, 2000));
           fileInfo = await ai.files.get({ name: uploadedFile.name });
         }
         if (fileInfo.state === 'FAILED') {
           throw new Error("Video processing failed");
         }
         
         promptParts.push({
           fileData: {
             fileUri: uploadedFile.uri,
             mimeType: mime
           }
         });
         fs.unlinkSync(tmpFile);
      } else {
         promptParts.push({
           inlineData: {
             data: pureBase64,
             mimeType: mime
           }
         });
      }
      
      promptParts.push(prompt || "Analyze this media.");

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-002",
        contents: promptParts
      });
      
      if (uploadedFile) {
         try { await ai.files.delete({ name: uploadedFile.name }); } catch(e) {}
      }
      res.json({ text: response.text });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: getErrorMessage(e) });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EventSync AI Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting EventSync server:", err);
});
