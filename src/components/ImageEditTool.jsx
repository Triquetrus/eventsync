import React from "react";
import { Bell, BookmarkCheck, Bookmark, Briefcase, CalendarDays, Calendar, Camera, CheckCheck, Check, ChevronRight, AlertCircle, CheckCircle2, HelpCircle, Clock, Copy, MoreHorizontal, Eye, Facebook, FolderHeart, GraduationCap, Globe, Heart, Image, Info, Instagram, LayoutDashboard, Linkedin, ListTodo, Lock, MapPin, Menu, MessageCircle, MessageSquare, Plus, Repeat, Send, Settings, Share2, ShieldCheck, Sparkle, Sparkles, SquarePen, Star, ThumbsUp, Trash2, Unlink, Upload, UserPlus, UserRoundCheck, Users, X, Zap } from 'lucide-react';
function ImageEditTool({ events, allMedia, onSaveMedia }) {
  const [prompt2, setPrompt] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [resultImage, setResultImage2] = React.useState("");
  const [showEventFolders, setShowEventFolders] = React.useState(false);
  const [selectedEventId, setSelectedEventId] = React.useState(null);
  const images = allMedia
    ? allMedia.filter(
        (m2) =>
          (m2.mimeType && m2.mimeType.startsWith("image/")) ||
          (m2.base64Data && m2.base64Data.startsWith("data:image/")) ||
          m2.type === "image",
      )
    : [];
  const handleEdit = async () => {
    if (!prompt2 || !selectedImage) return;
    setLoading(true);
    try {
      const res = await fetch("/api/edit-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt2,
          imageBase64: selectedImage.base64Data,
          imageType: selectedImage.mimeType || "image/jpeg",
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.image) {
        setResultImage2(data.image);
      } else {
        alert("Failed to get image: " + data.text);
      }
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };
  const handleGenerate = async () => {
    if (!prompt2) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt2,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.image) {
        setResultImage2(data.image);
      } else {
        alert("Failed to generate image: " + data.text);
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
      timestamp: /* @__PURE__ */ new Date().toISOString(),
    };
    if (onSaveMedia) onSaveMedia(newMedia);
    alert("Edited image saved to gallery!");
  };
  return (
    <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm flex flex-col gap-6">
      {
        <h2 className="text-xl font-bold text-gray-800">
          AI Image Editor
        </h2>
      }
      {
        <div className="flex flex-col gap-2">
          {
            <div className="flex gap-2 items-center mb-2">
              {
                <button
                  onClick={() => {
                    setShowEventFolders(false);
                    setSelectedImage(null);
                  }}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg border ${!showEventFolders ? "bg-pink-50 border-pink-300 text-pink-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  Gallery Images
                </button>
              }
              {
                <button
                  onClick={() => {
                    setShowEventFolders(true);
                    setSelectedImage(null);
                  }}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg border ${showEventFolders ? "bg-pink-50 border-pink-300 text-pink-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  Live Events
                </button>
              }
            </div>
          }
          {!showEventFolders ? (
            <div className="flex gap-2 overflow-x-auto p-4 border border-gray-200 rounded-xl bg-gray-50">
              {images.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No images available in gallery.
                </p>
              ) : (
                images.map((img) => (
                  <img key={img.id}
                    src={img.base64Data}
                    className={`h-12 w-12 object-cover rounded-lg cursor-pointer border-2 transition-all shrink-0 ${selectedImage?.id === img.id ? "border-pink-500 scale-105 shadow-md" : "border-transparent hover:border-pink-300"}`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 flex flex-col gap-4 max-h-32 overflow-y-auto">
              {
                <div className="flex flex-wrap gap-2">
                  {events &&
                    events.map((ev) => (
                      <button key={ev.id}
                        onClick={() =>
                          setSelectedEventId(
                            ev.id === selectedEventId ? null : ev.id,
                          )
                        }
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${selectedEventId === ev.id ? "bg-pink-100 border-pink-300 text-pink-800" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"}`}
                      >
                        {ev.name || "Unnamed Event"}
                      </button>
                    ))}
                </div>
              }
              {selectedEventId && (
                <div className="grid grid-cols-8 sm:grid-cols-10 gap-2 mt-2">
                  {images.filter((mItem) => mItem.eventId === selectedEventId)
                    .length > 0 ? (
                    images
                      .filter((mItem) => mItem.eventId === selectedEventId)
                      .map((mItem, idx) => (
                        <img key={mItem.id}
                          onClick={() => setSelectedImage(mItem)}
                          src={mItem.base64Data}
                          className={`aspect-square object-cover rounded-lg cursor-pointer border-2 transition-all ${selectedImage?.id === mItem.id ? "border-pink-500 scale-105 shadow-md" : "border-transparent hover:border-pink-300"}`}
                        />
                      ))
                  ) : (
                    <div className="col-span-full text-sm text-gray-500">
                      No images found in this event.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      }
      {selectedImage && (
        <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
          {
            <p className="text-sm font-semibold text-gray-700">
              Selected Image:
            </p>
          }
          {
            <img
              src={selectedImage.base64Data}
              className="w-full max-h-32 object-contain rounded-lg bg-black"
            />
          }
        </div>
      )}
      {
        <div className="flex flex-col gap-2">
          {
            <label className="text-sm font-semibold text-gray-700">
              Prompt
            </label>
          }
          {
            <textarea
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm resize-none"
              rows={3}
              placeholder="e.g. Turn the background into a starry night..."
              value={prompt2}
              onChange={(e) => setPrompt(e.target.value)}
            />
          }
        </div>
      }
      {
        <div className="flex flex-col gap-3 mt-4">
          {!selectedImage && (
            <p className="text-red-500 text-sm">
              ⚠️ Please select an image from the gallery above to enable the
              'Generate Edit' button.
            </p>
          )}
          {
            <button
              className="w-full text-white font-bold py-4 px-4 rounded-xl transition-colors disabled:opacity-50 shadow-md"
              style={{
                backgroundColor: "#ec4899",
              }}
              onClick={handleEdit}
              disabled={loading || !prompt2 || !selectedImage}
            >
              {loading
                ? "Processing Edit..."
                : "\u2728 Generate Edit (Requires Image + Prompt)"}
            </button>
          }
          {
            <button
              className="w-full text-white font-bold py-4 px-4 rounded-xl transition-colors disabled:opacity-50 shadow-md"
              style={{
                backgroundColor: "#a855f7",
              }}
              onClick={handleGenerate}
              disabled={loading || !prompt2}
            >
              {loading
                ? "Generating Image..."
                : "\u{1F5BC}\uFE0F Generate New Image (Prompt Only)"}
            </button>
          }
        </div>
      }
      {resultImage && (
        <div className="mt-6 flex flex-col gap-4 p-4 border border-green-200 bg-green-50 rounded-xl">
          {
            <p className="text-sm font-semibold text-green-800">
              Edit Successful!
            </p>
          }
          {
            <img
              src={resultImage}
              className="w-full max-w-[200px] rounded-xl border border-gray-200 bg-white"
            />
          }
          {
            <button
              className="bg-gray-900 hover:bg-black text-white font-bold py-2 px-4 rounded-xl transition-colors self-start"
              onClick={handleSave}
            >
              Save to Gallery
            </button>
          }
        </div>
      )}
    </div>
  );
}
export default ImageEditTool;
