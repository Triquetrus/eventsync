const fs = require('fs');
let code = fs.readFileSync('src/components/ImageEditTool.jsx', 'utf8');

// Replace "Edit Image with Nano Banana"
code = code.replace("Edit Image with Nano Banana", "AI Image Editor");

// Add Upload Image tab option
const tabsStart = `<div className="flex gap-2 items-center mb-2">`;
const newTabs = `<div className="flex gap-2 items-center mb-2">
              <button
                onClick={() => {
                  setShowEventFolders(false);
                  setSelectedImage(null);
                }}
                className={\`px-4 py-2 text-sm font-semibold rounded-lg border \${!showEventFolders ? "bg-pink-50 border-pink-300 text-pink-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}\`}
              >
                Gallery Images
              </button>
              <button
                onClick={() => {
                  setShowEventFolders(true);
                  setSelectedImage(null);
                }}
                className={\`px-4 py-2 text-sm font-semibold rounded-lg border \${showEventFolders ? "bg-pink-50 border-pink-300 text-pink-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}\`}
              >
                Live Events
              </button>
              <div className="ml-auto">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setSelectedImage({
                          id: 'uploaded_' + Date.now(),
                          base64Data: ev.target.result,
                          mimeType: file.type
                        });
                        setShowEventFolders(false);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                  id="image-upload-edit"
                />
                <label
                  htmlFor="image-upload-edit"
                  className="cursor-pointer px-4 py-2 text-sm font-semibold rounded-lg border bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Upload Image
                </label>
              </div>`;

code = code.replace(tabsStart + '\\n              {\\n                <button\\n                  onClick={() => {\\n                    setShowEventFolders(false);\\n                    setSelectedImage(null);\\n                  }}\\n                  className={`px-4 py-2 text-sm font-semibold rounded-lg border ${!showEventFolders ? "bg-pink-50 border-pink-300 text-pink-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}\\n                >\\n                  Gallery Images\\n                </button>\\n              }\\n              {\\n                <button\\n                  onClick={() => {\\n                    setShowEventFolders(true);\\n                    setSelectedImage(null);\\n                  }}\\n                  className={`px-4 py-2 text-sm font-semibold rounded-lg border ${showEventFolders ? "bg-pink-50 border-pink-300 text-pink-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}\\n                >\\n                  Live Events\\n                </button>\\n              }\\n            </div>', newTabs);

fs.writeFileSync('src/components/ImageEditTool.jsx', code);
console.log("Updated ImageEditTool.jsx");
