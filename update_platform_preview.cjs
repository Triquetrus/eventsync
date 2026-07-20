const fs = require('fs');
let code = fs.readFileSync('src/components/CaptionStudioTab.jsx', 'utf8');

const newPreview = `const PlatformPreview = ({ platform, captionText, hashtags, media, eventName, locationName }) => {
  const getIcon = () => {
    switch (platform ? platform.toLowerCase() : 'all') {
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const p = platform ? platform.toLowerCase() : 'all';
  const isInsta = p === 'instagram' || p === 'all';
  const isFb = p === 'facebook';
  const isLi = p === 'linkedin';

  const formattedHashtags = hashtags && hashtags.length > 0 
    ? hashtags.map(t => typeof t === 'string' && t.startsWith('#') ? t : \`#\${t}\`).join(" ")
    : "";

  const renderMedia = () => {
    if (!media) return null;
    const isVideo = media.mimeType ? media.mimeType.startsWith("video/") : media.type === "video";
    const srcUrl = media.url || media.base64Data;
    if (!srcUrl) return null;
    
    return (
      <div className="w-full bg-black/5 flex justify-center items-center">
        {isVideo ? (
          <video src={srcUrl} className="w-full h-auto object-contain" controls={false} muted={true} autoPlay={true} loop={true} playsInline={true} style={{ aspectRatio: media.aspectRatio || 'auto' }} />
        ) : (
          <img src={srcUrl} className="w-full h-auto object-contain" style={{ aspectRatio: media.aspectRatio || 'auto' }} />
        )}
      </div>
    );
  };

  if (isInsta) {
    return (
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col w-full text-sm">
        <div className="flex items-center gap-2 p-3 border-b border-gray-100">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-amber-500 p-[2px] relative flex items-center justify-center text-white shrink-0">
             {getIcon()}
          </div>
          <div className="flex flex-col flex-1">
            <span className="font-bold text-gray-800 text-xs flex items-center gap-1">
              {eventName ? eventName.replace(/\\s+/g, '').toLowerCase() : "eventsync_ai"}
              <CheckCircle2 className="w-3 h-3 text-blue-500" />
            </span>
            {locationName && <span className="text-[10px] text-gray-500">{locationName}</span>}
          </div>
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </div>
        
        {renderMedia()}

        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-4">
              <Heart className="w-5 h-5 text-gray-800 hover:text-red-500 cursor-pointer" />
              <MessageCircle className="w-5 h-5 text-gray-800 hover:text-gray-500 cursor-pointer" />
              <Send className="w-5 h-5 text-gray-800 hover:text-blue-500 cursor-pointer" />
            </div>
            <Bookmark className="w-5 h-5 text-gray-800 hover:text-yellow-500 cursor-pointer" />
          </div>
          <div className="text-xs font-bold text-gray-800 mb-1">1,234 likes</div>
          <div className="text-gray-800 text-xs whitespace-pre-wrap leading-relaxed">
            <span className="font-bold mr-1">{eventName ? eventName.replace(/\\s+/g, '').toLowerCase() : "eventsync_ai"}</span>
            {captionText}
            {formattedHashtags && <div className="text-blue-600 mt-1">{formattedHashtags}</div>}
          </div>
        </div>
      </div>
    );
  }

  if (isFb) {
    return (
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col w-full text-sm">
        <div className="flex items-center gap-2 p-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0 relative">
             {getIcon()}
          </div>
          <div className="flex flex-col flex-1 leading-tight">
            <span className="font-bold text-gray-800 text-sm">
              {eventName || "EventSync AI"}
            </span>
            <span className="text-[11px] text-gray-500 flex items-center gap-1">
              Just now • <Globe className="w-3 h-3" />
            </span>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="px-3 pb-3 text-gray-800 text-[13px] whitespace-pre-wrap">
          {captionText}
          {formattedHashtags && <div className="text-blue-600 mt-1">{formattedHashtags}</div>}
        </div>

        {renderMedia()}

        <div className="px-3 py-2 flex items-center justify-between text-gray-500 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"><ThumbsUp className="w-2.5 h-2.5 text-white" /></div>
            <span className="text-xs">1.2K</span>
          </div>
          <div className="text-xs">123 Comments • 45 Shares</div>
        </div>
        <div className="p-1 flex items-center justify-between">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-semibold"><ThumbsUp className="w-4 h-4" /> Like</button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-semibold"><MessageSquare className="w-4 h-4" /> Comment</button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-semibold"><Share2 className="w-4 h-4" /> Share</button>
        </div>
      </div>
    );
  }

  // LinkedIn
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col w-full text-sm">
      <div className="flex items-start gap-2 p-3">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold shrink-0 border border-gray-200 relative">
           {getIcon()}
        </div>
        <div className="flex flex-col flex-1 leading-tight">
          <span className="font-bold text-gray-800 text-sm">
            {eventName || "EventSync AI"}
          </span>
          <span className="text-[12px] text-gray-500">{locationName || "Event Company"}</span>
          <span className="text-[11px] text-gray-500 flex items-center gap-1">
            1h • <Globe className="w-3 h-3" />
          </span>
        </div>
        <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded"><Plus className="w-4 h-4"/> Follow</button>
      </div>
      
      <div className="px-3 pb-3 text-gray-800 text-[13px] whitespace-pre-wrap">
        {captionText}
        {formattedHashtags && <div className="text-blue-600 mt-1 font-semibold">{formattedHashtags}</div>}
      </div>

      {renderMedia()}

      <div className="px-3 py-2 flex items-center justify-between text-gray-500 border-b border-gray-100">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"><ThumbsUp className="w-2.5 h-2.5 text-white" /></div>
          <span className="text-xs">1,234</span>
        </div>
        <div className="text-xs">123 comments • 45 reposts</div>
      </div>
      <div className="p-1 flex items-center justify-between">
        <button className="flex-1 flex items-center justify-center gap-1 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-semibold"><ThumbsUp className="w-4 h-4" /> Like</button>
        <button className="flex-1 flex items-center justify-center gap-1 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-semibold"><MessageSquare className="w-4 h-4" /> Comment</button>
        <button className="flex-1 flex items-center justify-center gap-1 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-semibold"><Repeat className="w-4 h-4" /> Repost</button>
        <button className="flex-1 flex items-center justify-center gap-1 py-3 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-semibold"><Send className="w-4 h-4" /> Send</button>
      </div>
    </div>
  );
};`;

const regex = /const PlatformPreview = \(\{.*?\}\);/s;
code = code.replace(regex, newPreview);

fs.writeFileSync('src/components/CaptionStudioTab.jsx', code);
console.log("Updated PlatformPreview");
