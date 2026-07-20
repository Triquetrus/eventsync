const fs = require('fs');
let code = fs.readFileSync('src/components/GenAITools.jsx', 'utf8');

const target = \`            <button
              onClick={() => setActiveTab("analyze")}
              className={\\\`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all \${activeTab === "analyze" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}\\\`}
            >
              Analyze Media
            </button>
          }
        </div>
      )}
      {selectedMedia && activeTab === "video-merge" && (
        <VeoMergeTool
          selectedMedia={selectedMedia}
          onSaveMedia={onSaveMedia}
          onTriggerCaptionFromMedia={onTriggerCaptionFromMedia}
        />
      )}
      {!selectedMedia && activeTab === "generate-image" && (\`;

const replacement = \`            <button
              onClick={() => setActiveTab("analyze")}
              className={\\\`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all \${activeTab === "analyze" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}\\\`}
            >
              Analyze Media
            </button>
          }
          {
            <button
              onClick={() => setActiveTab("video-merge")}
              className={\\\`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all \${activeTab === "video-merge" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}\\\`}
            >
              Merge Media
            </button>
          }
        </div>
      )}
      {activeTab === "video-merge" && (
        <VeoMergeTool
          selectedMedia={selectedMedia || []}
          onSaveMedia={onSaveMedia}
          onTriggerCaptionFromMedia={onTriggerCaptionFromMedia}
        />
      )}
      {activeTab === "generate-image" && (\`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/GenAITools.jsx', code);
console.log("Updated GenAITools.jsx");
