const fs = require('fs');
let code = fs.readFileSync('src/components/CaptionStudioTab.jsx', 'utf8');

const newPreview = `const PlatformPreview = ({ platform, captionText, hashtags, media, eventName, locationName }) => {
  const getIcon = () => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const formattedHashtags = hashtags && hashtags.length > 0 
    ? hashtags.map(t => typeof t === 'string' && t.startsWith('#') ? t : \`#\${t}\`).join(" ")
    : "";

  return (
    <div className="text-sm border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col w-full">
      <div className="flex items-center gap-2 p-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-amber-500 flex items-center justify-center text-white shrink-0">
           {getIcon()}
        </div>
        <div className="flex flex-col flex-1">
          <span className="font-bold text-gray-800 text-xs flex items-center gap-1">
            {eventName || "EventSync AI"}
            <CheckCircle2 className="w-3 h-3 text-blue-500" />
          </span>
          <span className="text-[10px] text-gray-500 flex items-center gap-1">
            {locationName || "Event Location"} • Just now
          </span>
        </div>
        <MoreHorizontal className="w-4 h-4 text-gray-400" />
      </div>
      
      {(platform === 'facebook' || platform === 'linkedin') && (
        <div className="p-3 text-gray-800 text-xs whitespace-pre-wrap leading-relaxed">
          {captionText}
          {formattedHashtags && <div className="text-blue-600 mt-1">{formattedHashtags}</div>}
        </div>
      )}

      {media && (
        <div className="bg-gray-100 flex justify-center border-y border-gray-100 max-h-64 overflow-hidden relative">
          {media.type === "video" ? (
             <video src={media.url} className="object-cover w-full h-full" controls={false} />
          ) : (
             <img src={media.url} className="object-cover w-full h-full" />
          )}
        </div>
      )}

      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-3">
            <Heart className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors cursor-pointer" />
            <MessageCircle className="w-5 h-5 text-gray-700 hover:text-blue-500 transition-colors cursor-pointer" />
            {platform === 'linkedin' ? (
               <Repeat className="w-5 h-5 text-gray-700 hover:text-green-500 transition-colors cursor-pointer" />
            ) : (
               <Send className="w-5 h-5 text-gray-700 hover:text-blue-500 transition-colors cursor-pointer" />
            )}
          </div>
          <Bookmark className="w-5 h-5 text-gray-700 hover:text-yellow-500 transition-colors cursor-pointer" />
        </div>
        
        <div className="text-xs font-bold text-gray-800 mb-1">
          1,234 likes
        </div>

        {(!platform || platform === 'instagram' || platform === 'all') && (
          <div className="text-gray-800 text-xs whitespace-pre-wrap leading-relaxed">
            <span className="font-bold mr-1">{eventName || "EventSync AI"}</span>
            {captionText}
            {formattedHashtags && <div className="text-blue-600 mt-1">{formattedHashtags}</div>}
          </div>
        )}
      </div>
    </div>
  );
};
`;

const regex = /const PlatformPreview = \(\{.*?\}\);/s;
code = code.replace(regex, newPreview);

fs.writeFileSync('src/components/CaptionStudioTab.jsx', code);
console.log("Updated PlatformPreview");
