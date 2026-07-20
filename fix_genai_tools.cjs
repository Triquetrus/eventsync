const fs = require('fs');
let code = fs.readFileSync('src/components/GenAITools.jsx', 'utf8');

code = code.replace(
  /React\.useEffect\(\(\) => \{\s*if \(selectedMedia\) \{\s*setActiveTab\("edit-image"\);\s*\} else \{\s*setActiveTab\("edit-image"\);\s*\}\s*\}, \[selectedMedia\]\);/g,
  \`React.useEffect(() => {
    if (selectedMedia) {
      setActiveTab("video-merge");
    }
  }, [selectedMedia]);\`
);

code = code.replace(
  /\{!selectedMedia && \(/g,
  \`{(true) && (\`
);

const newTabs = \`<button
              onClick={() => setActiveTab("generate-image")}
              className={\\\`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all \${activeTab === "generate-image" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}\\\`}
            >
              Generate Image
            </button>
            <button
              onClick={() => setActiveTab("edit-image")}
              className={\\\`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all \${activeTab === "edit-image" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}\\\`}
            >
              Edit Image
            </button>
            <button
              onClick={() => setActiveTab("video-merge")}
              className={\\\`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all \${activeTab === "video-merge" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}\\\`}
            >
              Video Merge
            </button>
            <button
              onClick={() => setActiveTab("analyze")}
              className={\\\`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all \${activeTab === "analyze" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}\\\`}
            >
              Analyze Media
            </button>\`;

// We'll just replace the inner content of the div with flex gap-2
const divStart = '<div className="flex gap-2 mb-8 bg-gray-100 p-1.5 rounded-xl self-start overflow-x-auto w-full md:w-auto">';
const divEnd = '</div>';
const regex = new RegExp(divStart.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&') + '[\\\\s\\\\S]*?' + divEnd);

code = code.replace(regex, divStart + '\\n' + newTabs + '\\n' + divEnd);

// Also fix the rendering conditionals
code = code.replace(/\\{\\!selectedMedia && activeTab === "generate-image" && \\(/g, '{activeTab === "generate-image" && (');
code = code.replace(/\\{\\!selectedMedia && activeTab === "analyze" && \\(/g, '{activeTab === "analyze" && (');
code = code.replace(/\\{selectedMedia && activeTab === "video-merge" && \\(/g, '{activeTab === "video-merge" && (');
// Wait, VeoMergeTool requires selectedMedia. If activeTab === "video-merge" but no selectedMedia?
// Let's check VeoMergeTool. It uses mediaArray. If selectedMedia is null, it might crash.

fs.writeFileSync('src/components/GenAITools.jsx', code);
console.log("Updated GenAITools.jsx");
