const fs = require('fs');
let code = fs.readFileSync('src/components/CaptionStudioTab.jsx', 'utf8');

const platformPreviewComponent = `
const PlatformPreview = ({ platform, captionText, hashtags, media, eventName, locationName }) => {
  return (
    <div className="text-sm p-2 flex flex-col gap-2">
      <div className="font-bold flex items-center mb-1 text-gray-700 capitalize">
        <span className="mr-2 border rounded p-1 bg-gray-50">{platform}</span>
      </div>
      {media && (
        <div className="bg-gray-100 rounded-lg overflow-hidden flex justify-center max-h-48 border border-gray-200">
          {media.type === "video" ? (
             <video src={media.url} className="object-contain w-full" controls={false} />
          ) : (
             <img src={media.url} className="object-contain w-full" />
          )}
        </div>
      )}
      <div className="text-gray-800 text-sm whitespace-pre-wrap">
        {captionText}
      </div>
      {hashtags && hashtags.length > 0 && (
        <div className="text-blue-500 text-xs font-medium">
          {hashtags.map(t => typeof t === 'string' && t.startsWith('#') ? t : \`#\${t}\`).join(" ")}
        </div>
      )}
      <div className="text-gray-400 text-xs mt-1 flex items-center gap-2">
         {eventName && <span>📍 {eventName}</span>}
         {locationName && <span>• {locationName}</span>}
      </div>
    </div>
  );
};

`;

code = code.replace(/function CaptionStudioTab\(\{/, platformPreviewComponent + 'function CaptionStudioTab({');
code = code.replace(/<p4/g, '<PlatformPreview');

fs.writeFileSync('src/components/CaptionStudioTab.jsx', code);
console.log("Fixed p4 -> PlatformPreview");
