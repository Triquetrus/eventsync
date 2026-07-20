const fs = require('fs');
let code = fs.readFileSync('src/components/CaptionStudioTab.jsx', 'utf8');

const target = `        if (!St.ok) {
          const An = await St.json();
          throw new Error(An.error || "Failed to contact Gemini engine");
        }
        const hn = await St.json();`;

const replacement = `        if (!St.ok) {
          let errorMsg = "Failed to contact Gemini engine";
          try {
            const errData = await St.json();
            errorMsg = errData.error || errorMsg;
          } catch (e) {
            errorMsg = \`Server error: \${St.status} \${St.statusText}\`;
          }
          throw new Error(errorMsg);
        }
        let hn;
        try {
          hn = await St.json();
        } catch(e) {
          throw new Error("Invalid response from server");
        }`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/CaptionStudioTab.jsx', code);
  console.log("Successfully replaced in CaptionStudioTab.jsx");
} else {
  console.log("Target not found in CaptionStudioTab.jsx");
}

let serverCode = fs.readFileSync('server.ts', 'utf8');

const serverTarget = `      const parsedJSON = JSON.parse(responseText);`;

const serverReplacement = `      let cleanText = responseText;
      const match = responseText.match(/\`\`\`(?:json)?\\s*([\\s\\S]*?)\\s*\`\`\`/);
      if (match) {
        cleanText = match[1];
      }
      const parsedJSON = JSON.parse(cleanText);`;

if (serverCode.includes(serverTarget)) {
  serverCode = serverCode.replace(serverTarget, serverReplacement);
  fs.writeFileSync('server.ts', serverCode);
  console.log("Successfully replaced in server.ts");
} else {
  console.log("Target not found in server.ts");
}

