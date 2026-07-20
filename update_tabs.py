import sys

with open('src/components/GenAITools.jsx', 'r') as f:
    content = f.read()

target = """            <button
              onClick={() => setActiveTab("analyze")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === "analyze" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}`}
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
      {!selectedMedia && activeTab === "generate-image" && ("""

replacement = """            <button
              onClick={() => setActiveTab("analyze")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === "analyze" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}`}
            >
              Analyze Media
            </button>
          }
          {
            <button
              onClick={() => setActiveTab("video-merge")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === "video-merge" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}`}
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
      {activeTab === "generate-image" && ("""

if target in content:
    content = content.replace(target, replacement)
    with open('src/components/GenAITools.jsx', 'w') as f:
        f.write(content)
    print("Replaced!")
else:
    print("Target not found")
