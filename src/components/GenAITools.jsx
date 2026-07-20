import React from "react";
import VeoMergeTool from "./VeoMergeTool";
import ImageGenerationTool from "./ImageGenerationTool";
import AnalyzeVideoTool from "./AnalyzeVideoTool";
import ImageEditTool from "./ImageEditTool";
import { Bell, BookmarkCheck, Bookmark, Briefcase, CalendarDays, Calendar, Camera, CheckCheck, Check, ChevronRight, AlertCircle, CheckCircle2, HelpCircle, Clock, Copy, MoreHorizontal, Eye, Facebook, FolderHeart, GraduationCap, Globe, Heart, Image, Info, Instagram, LayoutDashboard, Linkedin, ListTodo, Lock, MapPin, Menu, MessageCircle, MessageSquare, Plus, Repeat, Send, Settings, Share2, ShieldCheck, Sparkle, Sparkles, SquarePen, Star, ThumbsUp, Trash2, Unlink, Upload, UserPlus, UserRoundCheck, Users, X, Zap } from 'lucide-react';
function GenAITools({
  onNavigateToTab,
  onSaveMedia,
  onTriggerCaptionFromMedia,
  events,
  allMedia,
}) {
  const [activeTab, setActiveTab] = React.useState("edit-image");
  const selectedMedia = window.selectedVideoForVeo;
  React.useEffect(() => {
    if (selectedMedia) {
      setActiveTab("video-merge");
    } else {
      setActiveTab("edit-image");
    }
  }, [selectedMedia]);
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto flex flex-col h-full overflow-y-auto">
      {
        <h1 className="text-3xl fontxtrabold text-gray-900 mb-2">
          {selectedMedia ? (
            "AI Media Generator"
          ) : (
            <span className="inline-flex items-center gap-2">
              {
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-pink-500"
                >
                  {
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  }
                  {<path d="M5 3v4" />}
                  {<path d="M3 5h4" />}
                </svg>
              }
              AI Video Tools
            </span>
          )}
        </h1>
      }
      {
        <p className="text-gray-500 mb-8">
          Create and analyze media using advanced generative AI models.
        </p>
      }
            {true && (
        <div className="flex gap-2 mb-8 bg-gray-100 p-1.5 rounded-xl self-start overflow-x-auto w-full md:w-auto">
          <button
            onClick={() => setActiveTab("generate-image")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === "generate-image" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}`}
          >
            Generate Image
          </button>
          <button
            onClick={() => setActiveTab("edit-image")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === "edit-image" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}`}
          >
            Edit Image
          </button>
          <button
            onClick={() => setActiveTab("analyze")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === "analyze" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}`}
          >
            Analyze Media
          </button>
          <button
            onClick={() => setActiveTab("video-merge")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === "video-merge" ? "bg-white shadow-sm text-pink-600" : "text-gray-600 hover:bg-gray-200"}`}
          >
            Merge Media
          </button>
        </div>
      )}
      {activeTab === "video-merge" && (
        <VeoMergeTool
          selectedMedia={selectedMedia || []}
          onSaveMedia={onSaveMedia}
          onTriggerCaptionFromMedia={onTriggerCaptionFromMedia}
        />
      )}
      {activeTab === "generate-image" && (
        <ImageGenerationTool onSaveMedia={onSaveMedia} />
      )}
      {activeTab === "analyze" && (
        <AnalyzeVideoTool events={events} allMedia={allMedia} />
      )}
      {activeTab === "edit-image" && (
        <ImageEditTool
          events={events}
          allMedia={allMedia}
          onSaveMedia={onSaveMedia}
        />
      )}
    </div>
  );
}
export default GenAITools;
