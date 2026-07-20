const fs = require('fs');
let code = fs.readFileSync('src/components/GenAITools.jsx', 'utf8');

const replacement = `      {true && (
        <div className="flex gap-2 mb-8 bg-gray-100 p-1.5 rounded-xl self-start overflow-x-auto w-full md:w-auto">
          <button
            onClick={() => setActiveTab("generate-image")}
            className={\`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all \${activeTab === "generate-image" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}\`}
          >
            Generate Image
          </button>
          <button
            onClick={() => setActiveTab("edit-image")}
            className={\`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all \${activeTab === "edit-image" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}\`}
          >
            Edit Image
          </button>
          <button
            onClick={() => setActiveTab("analyze")}
            className={\`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all \${activeTab === "analyze" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}\`}
          >
            Analyze Media
          </button>
          <button
            onClick={() => setActiveTab("video-merge")}
            className={\`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all \${activeTab === "video-merge" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}\`}
          >
            Merge Media
          </button>
        </div>
      )}`;

code = code.replace(/\{true && \([\s\S]*?<\/div>\s*\)\}/, replacement);
fs.writeFileSync('src/components/GenAITools.jsx', code);
