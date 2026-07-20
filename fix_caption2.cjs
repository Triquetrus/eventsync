const fs = require('fs');
let code = fs.readFileSync('src/components/CaptionStudioTab.jsx', 'utf8');

const regex = /        if \(!St\.ok\) \{ let errorMsg.*?\/\/\n          const An = await St\.json\(\);\n          throw new Error\(An\.error \|\| "Failed to contact Gemini engine"\);\n        \}\n        const hn = await St\.json\(\);/s;

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

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/components/CaptionStudioTab.jsx', code);
  console.log("Successfully replaced in CaptionStudioTab.jsx");
} else {
  console.log("Regex not matched");
}
