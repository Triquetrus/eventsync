const fs = require('fs');
let code = fs.readFileSync('src/components/GenAITools.jsx', 'utf8');

const analyzeButtonStr = \`<button
              onClick={() => setActiveTab("analyze")}
              className={\\\`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all \${activeTab === "analyze" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}\\\`}
            >
              Analyze Media
            </button>\`;

const mergeButtonStr = \`<button
              onClick={() => setActiveTab("video-merge")}
              className={\\\`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all \${activeTab === "video-merge" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}\\\`}
            >
              Merge Media
            </button>\`;

if (!code.includes('Merge Media')) {
  code = code.replace(analyzeButtonStr, mergeButtonStr + '\\n          }          {\\n            ' + analyzeButtonStr);
}

// Ensure VeoMergeTool is rendered when activeTab === "video-merge", but handle selectedMedia being null if needed.
// Right now VeoMergeTool is only rendered when selectedMedia is true:
// {selectedMedia && activeTab === "video-merge" && (<VeoMergeTool ... />)}
// We should change it to {activeTab === "video-merge" && (<VeoMergeTool ... />)}
// Wait, if selectedMedia is null, VeoMergeTool might break because it expects mediaArray.
// Let's check VeoMergeTool

fs.writeFileSync('src/components/GenAITools.jsx', code);
console.log("Updated GenAITools.jsx");
