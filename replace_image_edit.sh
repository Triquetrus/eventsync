sed -i '446,549d' GenAITools.tsx
cat << 'INNER_EOF' >> GenAITools.tsx
function ImageEditTool({ events, allMedia, onSaveMedia }) {
  const [prompt, setPrompt] = ve.useState("");
  const [selectedImage, setSelectedImage] = ve.useState(null);
  const [loading, setLoading] = ve.useState(false);
  const [resultImage, setResultImage] = ve.useState("");
  const [showEventFolders, setShowEventFolders] = ve.useState(false);
  const [selectedEventId, setSelectedEventId] = ve.useState(null);
  
  const images = allMedia ? allMedia.filter((m) => (m.mimeType && m.mimeType.startsWith('image/')) || (m.base64Data && m.base64Data.startsWith('data:image/')) || m.type === 'image') : [];

  const handleEdit = async () => {
    if (!prompt || !selectedImage) return;
    setLoading(true);
    try {
      const res = await fetch("/api/edit-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, imageBase64: selectedImage.base64Data, imageType: selectedImage.mimeType || 'image/jpeg' })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.image) {
        setResultImage(data.image);
      } else {
         alert("Failed to get image: " + data.text);
      }
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!resultImage) return;
    const newMedia = {
      id: "media_" + Date.now(),
      base64Data: resultImage,
      mimeType: "image/png",
      timestamp: new Date().toISOString()
    };
    if (onSaveMedia) onSaveMedia(newMedia);
    alert("Edited image saved to gallery!");
  };

  return m.jsxs("div", {
    className: "bg-white p-6 rounded-2xl border border-pink-100 shadow-sm flex flex-col gap-6",
    children: [
      m.jsx("h2", { className: "text-xl font-bold text-gray-800", children: "Edit Image with Nano Banana" }),
      
      m.jsxs("div", {
        className: "flex flex-col gap-2",
        children: [
          m.jsxs("div", {
            className: "flex gap-2 items-center mb-2",
            children: [
              m.jsx("button", {
                onClick: () => { setShowEventFolders(false); setSelectedImage(null); },
                className: `px-4 py-2 text-sm font-semibold rounded-lg border ${!showEventFolders ? 'bg-pink-50 border-pink-300 text-pink-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`,
                children: "Gallery Images"
              }),
              m.jsx("button", {
                onClick: () => { setShowEventFolders(true); setSelectedImage(null); },
                className: `px-4 py-2 text-sm font-semibold rounded-lg border ${showEventFolders ? 'bg-pink-50 border-pink-300 text-pink-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`,
                children: "Live Events"
              })
            ]
          }),
          
          !showEventFolders ? m.jsx("div", {
             className: "flex gap-2 overflow-x-auto p-4 border border-gray-200 rounded-xl bg-gray-50",
             children: images.length === 0 ? m.jsx("p", { className: "text-sm text-gray-500", children: "No images available in gallery." }) : images.map((img) => 
               m.jsx("img", {
                 key: img.id,
                 src: img.base64Data,
                 className: `h-24 w-24 object-cover rounded-lg cursor-pointer border-2 transition-all shrink-0 ${selectedImage?.id === img.id ? 'border-pink-500 scale-105 shadow-md' : 'border-transparent hover:border-pink-300'}`,
                 onClick: () => setSelectedImage(img)
               })
             )
          }) : m.jsxs("div", { 
             className: "w-full border border-gray-200 rounded-xl p-4 bg-gray-50 flex flex-col gap-4 max-h-64 overflow-y-auto",
             children: [
               m.jsx("div", {
                 className: "flex flex-wrap gap-2",
                 children: events && events.map((ev) => m.jsx("button", {
                   key: ev.id,
                   onClick: () => setSelectedEventId(ev.id === selectedEventId ? null : ev.id),
                   className: `px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${selectedEventId === ev.id ? 'bg-pink-100 border-pink-300 text-pink-800' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'}`,
                   children: ev.name || "Unnamed Event"
                 }))
               }),
               selectedEventId && m.jsx("div", {
                 className: "grid grid-cols-4 sm:grid-cols-6 gap-2 mt-2",
                 children: images.filter((mItem) => mItem.eventId === selectedEventId).length > 0 
                   ? images.filter((mItem) => mItem.eventId === selectedEventId).map((mItem, idx) => m.jsx("img", {
                       key: idx,
                       onClick: () => setSelectedImage(mItem),
                       src: mItem.base64Data,
                       className: `aspect-square object-cover rounded-lg cursor-pointer border-2 transition-all ${selectedImage?.id === mItem.id ? 'border-pink-500 scale-105 shadow-md' : 'border-transparent hover:border-pink-300'}`
                     }))
                   : m.jsx("div", { className: "col-span-full text-sm text-gray-500", children: "No images found in this event." })
               })
             ]
          })
        ]
      }),
      
      selectedImage && m.jsxs("div", {
        className: "flex flex-col gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200",
        children: [
          m.jsx("p", { className: "text-sm font-semibold text-gray-700", children: "Selected Image:" }),
          m.jsx("img", { src: selectedImage.base64Data, className: "w-full max-h-48 object-contain rounded-lg bg-black" })
        ]
      }),
      
      m.jsxs("div", {
        className: "flex flex-col gap-2",
        children: [
          m.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Edit Prompt" }),
          m.jsx("textarea", {
            className: "w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm resize-none",
            rows: 3,
            placeholder: "e.g. Turn the background into a starry night...",
            value: prompt,
            onChange: (e) => setPrompt(e.target.value)
          })
        ]
      }),
      m.jsx("button", {
        className: "bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50",
        onClick: handleEdit,
        disabled: loading || !prompt || !selectedImage,
        children: loading ? "Editing Image..." : "Generate Edit"
      }),
      
      resultImage && m.jsxs("div", {
        className: "mt-6 flex flex-col gap-4 p-4 border border-green-200 bg-green-50 rounded-xl",
        children: [
          m.jsx("p", { className: "text-sm font-semibold text-green-800", children: "Edit Successful!" }),
          m.jsx("img", { src: resultImage, className: "w-full max-w-sm rounded-xl border border-gray-200 bg-white" }),
          m.jsx("button", {
            className: "bg-gray-900 hover:bg-black text-white font-bold py-2 px-4 rounded-xl transition-colors self-start",
            onClick: handleSave,
            children: "Save to Gallery"
          })
        ]
      })
    ]
  });
}
window.GenAITools = GenAITools;
INNER_EOF
