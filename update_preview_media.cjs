const fs = require('fs');
let code = fs.readFileSync('src/components/CaptionStudioTab.jsx', 'utf8');

const regex = /const renderMedia = \(\) => \{.*?\};\n/s;
const newRenderMedia = `const renderMedia = () => {
    if (!media) return null;
    const isVideo = media.mimeType ? media.mimeType.startsWith("video/") : media.type === "video";
    const srcUrl = media.url || media.base64Data;
    if (!srcUrl) return null;
    
    return (
      <div className="w-full bg-black/5 flex justify-center items-center">
        {isVideo ? (
          <video src={srcUrl} className="w-full h-auto max-h-[500px] object-contain" controls={false} muted={true} autoPlay={true} loop={true} playsInline={true} />
        ) : (
          <img src={srcUrl} className="w-full h-auto max-h-[500px] object-contain" />
        )}
      </div>
    );
  };\n`;

code = code.replace(regex, newRenderMedia);
fs.writeFileSync('src/components/CaptionStudioTab.jsx', code);
console.log("Fixed renderMedia in PlatformPreview");
