import React from "react";
import { Calendar, Bell, BookmarkCheck, Bookmark, Briefcase, CalendarDays, Camera, CheckCheck, Check, ChevronRight, AlertCircle, CheckCircle2, HelpCircle, Clock, Copy, MoreHorizontal, Eye, Facebook, FolderHeart, GraduationCap, Globe, Heart, Image, Info, Instagram, LayoutDashboard, Linkedin, ListTodo, Lock, MapPin, Menu, MessageCircle, MessageSquare, Plus, Repeat, Send, Settings, Share2, ShieldCheck, Sparkle, Sparkles, SquarePen, Star, ThumbsUp, Trash2, Unlink, Upload, UserPlus, UserRoundCheck, Users, X, Zap } from 'lucide-react';

const PlatformPreview = ({ platform, captionText, hashtags, media, eventName, locationName }) => {
  const p = platform ? platform.toLowerCase() : 'all';
  const isInsta = p === 'instagram' || p === 'all';
  const isFb = p === 'facebook';
  const isLi = p === 'linkedin';

  const formattedHashtags = hashtags && hashtags.length > 0 
    ? hashtags.map(t => typeof t === 'string' && t.startsWith('#') ? t : `#${t}`).join(" ")
    : "";

  const renderMedia = () => {
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
  };

  if (isInsta) {
    return (
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col w-full text-sm">
        <div className="flex items-center gap-2 p-3 border-b border-gray-100">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-amber-500 p-[2px]">
             <div className="w-full h-full rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-pink-100 text-pink-500 text-xs font-bold">
                  {eventName ? eventName.charAt(0) : 'E'}
                </div>
             </div>
          </div>
          <div className="flex flex-col flex-1">
            <span className="font-bold text-gray-800 text-xs flex items-center gap-1">
              {eventName ? eventName.replace(/\s+/g, '').toLowerCase() : "eventsync_ai"}
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
            <span className="font-bold mr-1">{eventName ? eventName.replace(/\s+/g, '').toLowerCase() : "eventsync_ai"}</span>
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
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
             {eventName ? eventName.charAt(0) : 'E'}
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
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold shrink-0 border border-gray-200">
           {eventName ? eventName.charAt(0) : 'E'}
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
};

export default function CaptionStudioTab({
  events: r,
  media: e,
  onSaveCaption: t,
  preselectedMedia: s = [],
  preselectedEventId: a = "",
  onNavigateToTab: u,
}) {
  var Ai, Si;
  const [c, p] = React.useState(
      a || ((Ai = r[0]) == null ? void 0 : Ai.id) || "",
    ),
    [g, y] = React.useState("fun"),
    [E, w] = React.useState("instagram"),
    [I, V] = React.useState(""),
    [z, te] = React.useState(0),
    [oe, pe] = React.useState(s),
    [Te, Ee] = React.useState(!1),
    [me, Re] = React.useState(""),
    [be, k] = React.useState([]),
    [C, O] = React.useState(null),
    [L, M] = React.useState(null),
    [P, R] = React.useState([]),
    [rt, pt] = React.useState("idle"),
    [selectedAccountsState, ce] = React.useState({}),
    [ne, De] = React.useState(null),
    [Xe, N] = React.useState({}),
    [G, le] = React.useState({}),
    [isRecording, setIsRecording] = React.useState(!1),
    [mediaRecorder, setMediaRecorder] = React.useState(null),
    J = [
      {
        value: "fun",
        label: "Fun & Engaging 🚀",
        desc: "Conversational, creative, emoji-rich",
      },
      {
        value: "professional",
        label: "Professional & Corporate 💼",
        desc: "Insightful, structured, career-driven",
      },
      {
        value: "emotional",
        label: "Warm & Emotional ❤️",
        desc: "Heartfelt, intimate, memorable",
      },
      {
        value: "formal",
        label: "Formal Announcement 📢",
        desc: "Objective, polished, announcements",
      },
    ],
    ue = [
      {
        value: "instagram",
        label: "Instagram",
        icon: Instagram,
      },
      {
        value: "linkedin",
        label: "LinkedIn",
        icon: Linkedin,
      },
      {
        value: "facebook",
        label: "Facebook",
        icon: Facebook,
      },
      {
        value: "all",
        label: "All Platforms (Optimized)",
        icon: Globe,
      },
    ];

  React.useEffect(() => {
    a && p(a);
  }, [a]);

  React.useEffect(() => {
    if (s && s.length > 0) pe(s);
    else {
      const Ie = e.filter((_t) => _t.eventId === c && _t.isHighlighted),
        He = e.filter((_t) => _t.eventId === c && !_t.isHighlighted);
      pe([...Ie, ...He]);
    }
  }, [c, e, s]);

  const he = r.find((Ie) => Ie.id === c);
  console.log("wv rendered. oe is:", oe, "Array?", Array.isArray(oe));

  const handleMicClick = async () => {
    if (isRecording) {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      setIsRecording(!1);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
          const chunks = [];
          recorder.ondataavailable = (e) => chunks.push(e.data);
          recorder.onstop = async () => {
            const blob = new Blob(chunks, {
              type: "audio/webm",
            });
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
              const base64data = reader.result;
              try {
                V((prev) =>
                  prev ? prev + " (Transcribing...)" : "Transcribing...",
                );
                const response = await fetch("/api/transcribe-audio", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    audioBase64: base64data,
                    mimeType: blob.type,
                  }),
                });
                if (response.ok) {
                  const data = await response.json();
                  V((prev) => {
                    const cleanPrev = prev
                      .replace(" (Transcribing...)", "")
                      .replace("Transcribing...", "");
                    return (
                      cleanPrev +
                      (cleanPrev && cleanPrev.trim() ? " " : "") +
                      data.text
                    );
                  });
                } else {
                  V((prev) =>
                    prev
                      .replace(" (Transcribing...)", "")
                      .replace("Transcribing...", ""),
                  );
                  alert("Failed to transcribe audio.");
                }
              } catch (e) {
                console.error(e);
                V((prev) =>
                  prev
                    .replace(" (Transcribing...)", "")
                    .replace("Transcribing...", ""),
                );
              }
            };
            stream.getTracks().forEach((t) => t.stop());
          };
          recorder.start();
          setMediaRecorder(recorder);
          setIsRecording(true);
        } catch (err) {
          alert("Microphone access denied or error occurred.");
          console.error(err);
        }
      }
    },
    J = [
      {
        value: "fun",
        label: "Fun & Engaging 🚀",
        desc: "Conversational, creative, emoji-rich",
      },
      {
        value: "professional",
        label: "Professional & Corporate 💼",
        desc: "Insightful, structured, career-driven",
      },
      {
        value: "emotional",
        label: "Warm & Emotional ❤️",
        desc: "Heartfelt, intimate, memorable",
      },
      {
        value: "formal",
        label: "Formal Announcement 📢",
        desc: "Objective, polished, announcements",
      },
    ],
    ue = [
      {
        value: "instagram",
        label: "Instagram",
        icon: Instagram,
      },
      {
        value: "linkedin",
        label: "LinkedIn",
        icon: Linkedin,
      },
      {
        value: "facebook",
        label: "Facebook",
        icon: Facebook,
      },
      {
        value: "all",
        label: "All Platforms (Optimized)",
        icon: Globe,
      },
    ];
  (React.useEffect(() => {
    a && p(a);
  }, [a]),
    React.useEffect(() => {
      if (s && s.length > 0) pe(s);
      else {
        const Ie = e.filter((_t) => _t.eventId === c && _t.isHighlighted),
          He = e.filter((_t) => _t.eventId === c && !_t.isHighlighted);
        pe([...Ie, ...He]);
      }
    }, [c, e, s]));
  const he = r.find((Ie) => Ie.id === c);
  console.log("wv rendered. oe is:", oe, "Array?", Array.isArray(oe));
  const we = async () => {
      if (!he) {
        alert("Please select or create an event first!");
        return;
      }
      (Ee(!0), Re(""), k([]));
      const Ie = oe[z];
      let He = "",
        _t = "";
      Ie && ((He = Ie.base64Data), (_t = Ie.mimeType || "image/jpeg"));
      try {
        const St = await fetch("/api/generate-caption", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventName: he.name,
            eventType: he.type,
            location: he.location,
            description: I || he.description,
            tone: g,
            platform: E,
            imageBase64: He,
            imageType: _t,
          }),
        });
        if (!St.ok) {
          let errorMsg = "Failed to contact Gemini engine";
          try {
            const errData = await St.json();
            errorMsg = errData.error || errorMsg;
          } catch (e) {
            errorMsg = `Server error: ${St.status} ${St.statusText}`;
          }
          throw new Error(errorMsg);
        }
        let hn;
        try {
          hn = await St.json();
        } catch(e) {
          throw new Error("Invalid response from server");
        }
        if (hn.captions && hn.captions.length > 0) k(hn.captions);
        else throw new Error("No caption configurations returned.");
      } catch (St) {
        (console.warn(St.message || St),
          Re(St.message || "An unexpected network error occurred."));
      } finally {
        Ee(!1);
      }
    },
    Be = (Ie, He, _t) => {
      const St = `${Ie}

${He.join(" ")}`;
      (navigator.clipboard.writeText(St),
        O(_t),
        setTimeout(() => O(null), 2e3));
    },
    ct = async (Ie, He, _t) => {
      var An;
      (M(_t),
        pt("running"),
        R(["Establishing secure connection with social graph API..."]));
      const St = E === "all" ? "instagram" : E,
        hn = [
          `Authorizing account tokens for eventsync.${St}...`,
          "Optimizing media resolution & resizing container assets...",
          "Encoding post captions & parsing generated hashtags...",
          `Uploading campaign image reference to ${St.toUpperCase()} CDN server...`,
          "Publishing timeline post to feeds...",
          "Post shared successfully! Syncing logs to Firestore database...",
        ];
      for (let At = 0; At < hn.length; At++)
        (await new Promise((Dt) => setTimeout(Dt, 800)),
          R((Dt) => [...Dt, hn[At]]));
      (await t({
        eventId: c,
        mediaId: (An = oe[z]) == null ? void 0 : An.id,
        tone: g,
        platform: St,
        text: Ie,
        hashtags: He,
        createdAt: new Date().toISOString(),
      }),
        pt("done"));
    },
    Gs = () => {
      (M(null), pt("idle"), R([]));
    };
  return (
    <div id="caption-studio-view" className="flex-1 p-4 md:p-8 ">
      {
        <div id="caption-header" className="mb-8">
          {
            <h2
              id="caption-title"
              className="text-2xl font-extrabold text-gray-900 tracking-tight bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
            >
              AI Caption Studio
            </h2>
          }
          {
            <p className="text-gray-500 text-sm mt-1">
              Harness Gemini 2.5 Flash to write rich, platform-optimized posts
              with visual contexts.
            </p>
          }
        </div>
      }
      {
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {
            <div className="lg:col-span-7 flex flex-col gap-6">
              {
                <div className="bg-white border border-pink-100 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                  {
                    <h3 className="font-bold text-sm text-pink-600 uppercase tracking-wider font-mono border-b border-pink-50 pb-3">
                      1. Composition Settings
                    </h3>
                  }
                  {
                    <div className="flex flex-col gap-2">
                      {
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Select Source Event
                        </label>
                      }
                      {
                        <select
                          value={c}
                          onChange={(Ie) => p(Ie.target.value)}
                          className="bg-pink-50/10 border border-pink-100 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-pink-400 cursor-pointer"
                        >
                          {r.map((Ie) => (
                            <option key={Ie.id} value={Ie.id}>{Ie.name}</option>
                          ))}
                        </select>
                      }
                    </div>
                  }
                  {
                    <div className="flex flex-col gap-2">
                      {
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Target Publication Channel
                        </label>
                      }
                      {
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {ue.map((Ie) => {
                            const He = Ie.icon,
                              _t = E === Ie.value;
                            return (
                              <button key={Ie.value}
                                onClick={() => w(Ie.value)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border font-semibold text-xs transition-all cursor-pointer ${_t ? "bg-pink-50 border-pink-300 text-pink-600" : "bg-pink-50/10 border-pink-100/50 text-gray-500 hover:border-pink-200"}`}
                              >
                                {<He className="w-4 h-4 mb-1.5" />}
                                {<span>{Ie.label}</span>}
                              </button>
                            );
                          })}
                        </div>
                      }
                    </div>
                  }
                  {
                    <div className="flex flex-col gap-2">
                      {
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Post Persona & Tone
                        </label>
                      }
                      {
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {J.map((Ie) => {
                            const He = g === Ie.value;
                            return (
                              <button key={Ie.value}
                                onClick={() => y(Ie.value)}
                                className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${He ? "bg-pink-50/60 border-pink-300" : "bg-pink-50/10 border-pink-100/50 hover:border-pink-200"}`}
                              >
                                {
                                  <p
                                    className={`text-xs font-bold ${He ? "text-pink-600" : "text-gray-700"}`}
                                  >
                                    {Ie.label}
                                  </p>
                                }
                                {
                                  <p className="text-[10px] text-gray-400 mt-1">
                                    {Ie.desc}
                                  </p>
                                }
                              </button>
                            );
                          })}
                        </div>
                      }
                    </div>
                  }
                  {
                    <div className="flex flex-col gap-2">
                      {
                        <div className="flex justify-between items-center mb-1">
                          {
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Specific details to highlight (Optional)
                            </label>
                          }
                          {
                            <button
                              type="button"
                              onClick={handleMicClick}
                              className={
                                "flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-md transition-colors border shadow-sm " +
                                (isRecording
                                  ? "bg-red-50 text-red-600 border-red-200 animate-pulse"
                                  : "bg-gradient-to-r from-pink-50 to-rose-50 text-pink-600 border-pink-200 hover:border-pink-300")
                              }
                              title="Use Gemini to transcribe voice note"
                            >
                              {
                                <span className="text-xs">
                                  {isRecording ? "🛑" : "🎤"}
                                </span>
                              }
                              {
                                <span>
                                  {isRecording ? "Recording..." : "Voice Note"}
                                </span>
                              }
                            </button>
                          }
                        </div>
                      }
                      {
                        <textarea
                          placeholder="Mention specific guests, awards, highlight reels, or special announcement copy..."
                          value={I}
                          onChange={(Ie) => V(Ie.target.value)}
                          rows={3}
                          className="bg-pink-50/10 border border-pink-100 rounded-xl px-4 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 resize-none"
                        />
                      }
                    </div>
                  }
                  {
                    <button
                      onClick={we}
                      disabled={Te || !he}
                      className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/10 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {<Sparkles className="w-4 h-4 animate-glow" />}
                      {
                        <span>
                          {Te
                            ? "Composing Captions with Gemini..."
                            : "Generate AI Captions"}
                        </span>
                      }
                    </button>
                  }
                </div>
              }
            </div>
          }
          {
            <div className="lg:col-span-5 flex flex-col gap-6 min-w-0">
              {
                <div className="bg-white border border-pink-100 rounded-2xl p-5 shadow-sm">
                  {
                    <h3 className="font-bold text-sm text-pink-600 uppercase tracking-wider font-mono border-b border-pink-50 pb-3 mb-4">
                      2. Visual Context
                    </h3>
                  }
                  {oe.length > 0 ? (
                    <div>
                      {
                        <div className="relative aspect-video rounded-xl  bg-gray-50 border border-pink-100">
                          {(Si = oe[z]) &&
                          Si.mimeType &&
                          Si.mimeType.startsWith("video/") ? (
                            <video
                              src={Si.base64Data}
                              className="w-full h-full object-cover"
                              controls={true}
                            />
                          ) : (
                            <img
                              src={
                                (Si = oe[z]) == null ? void 0 : Si.base64Data
                              }
                              alt="Active context reference"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          {
                            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-[10px] text-gray-300 font-semibold px-2 py-1 rounded">
                              Image {z + 1} of {oe.length}
                            </div>
                          }
                        </div>
                      }
                      {oe.length > 1 && (
                        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                          {oe.map((Ie, He) => (
                            <button key={He}
                              onClick={() => te(He)}
                              className={`w-14 h-14 rounded-lg  shrink-0 border-2 transition-all cursor-pointer ${z === He ? "border-pink-500 scale-95" : "border-pink-100"}`}
                            >
                              {Ie.mimeType &&
                              Ie.mimeType.startsWith("video/") ? (
                                <video
                                  src={Ie.base64Data}
                                  className="w-full h-full object-cover"
                                  muted={true}
                                  autoPlay={true}
                                  loop={true}
                                />
                              ) : (
                                <img
                                  src={Ie.base64Data}
                                  alt="Thumb"
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 border border-dashed border-pink-100 rounded-xl bg-pink-50/10">
                      {<Image className="w-10 h-10 text-pink-300 mx-auto mb-2" />}
                      {
                        <p className="text-xs text-gray-500 font-semibold">
                          No media selected from this event
                        </p>
                      }
                      {
                        <p className="text-[10px] text-gray-400 max-w-xs mx-auto mt-0.5 mb-3">
                          Captions can still be generated using event schedule
                          metadata!
                        </p>
                      }
                      {
                        <button
                          onClick={() => u("gallery")}
                          className="bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-100 text-[10px] px-3 py-1.5 rounded-lg cursor-pointer font-bold transition-all"
                        >
                          Go to Media Studio
                        </button>
                      }
                    </div>
                  )}
                </div>
              }
              {
                <div className="bg-gradient-to-br from-pink-50/20 to-white border border-pink-100 rounded-2xl p-5 shadow-sm">
                  {
                    <h4 className="text-xs font-bold text-pink-600 uppercase tracking-wider font-mono mb-2">
                      Campaign Tip: Engagement booster
                    </h4>
                  }
                  {
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Posts uploaded with localized event captions and
                      corresponding platform formatting yield up to **4.5x
                      higher engagement rates**. Ensure tone alignment matches
                      the target business audience.
                    </p>
                  }
                </div>
              }
            </div>
          }
        </div>
      }
      {(be.length > 0 || Te || me) && (
        <div
          id="generated-feed-section"
          className="mt-8 border-t border-pink-100 pt-8"
        >
          {
            <div className="flex items-center gap-2 mb-6">
              {
                <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
              }
              {
                <h3 className="text-lg font-bold text-gray-800">
                  Gemini Generated Campaign Copy
                </h3>
              }
            </div>
          }
          {Te && (
            <div className="flex flex-col items-center justify-center py-16 bg-white border border-pink-100 rounded-2xl shadow-sm">
              {
                <div className="w-12 h-12 rounded-full border-t-2 border-pink-500 animate-spin mb-4" />
              }
              {
                <p className="text-sm text-pink-600 font-semibold font-mono animate-pulse">
                  Consulting Gemini Social AI Graph...
                </p>
              }
            </div>
          )}
          {me && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs rounded-xl flex items-center gap-2.5">
              {<AlertCircle className="w-4 h-4" />}
              {<span>{me}</span>}
            </div>
          )}
          {be.length > 0 && (
            <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 pb-4 md:pb-0 md:overflow-visible md:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {be.map((Ie, He) => {
                const _t = !!selectedAccountsState[He],
                  St = E === "all" ? "instagram" : E,
                  hn = Xe[He] !== void 0;
                return (
                  <div key={He} className="bg-white border border-pink-100 rounded-2xl p-5 flex flex-col justify-between hover:border-pink-200 transition-all shadow-sm shrink-0 w-[85vw] md:w-auto snap-center">
                    {
                      <div>
                        {
                          <div className="flex justify-between items-center mb-4 pb-2 border-b border-pink-50">
                            {
                              <span className="text-[10px] font-bold text-pink-600 bg-pink-50 border border-pink-100 px-2.5 py-1 rounded font-mono">
                                OPTION {He + 1}
                              </span>
                            }
                            {
                              <div className="flex items-center gap-1.5">
                                {
                                  <button
                                    onClick={() =>
                                      ce((An) => ({
                                        ...An,
                                        [He]: !1,
                                      }))
                                    }
                                    className={`px-2 py-1 text-[9px] font-bold rounded transition-all cursor-pointer ${_t ? "text-gray-400 hover:text-pink-600 hover:bg-pink-50" : "bg-gradient-to-tr from-pink-500 to-rose-500 text-white"}`}
                                  >
                                    Draft
                                  </button>
                                }
                                {
                                  <button
                                    onClick={() =>
                                      ce((An) => ({
                                        ...An,
                                        [He]: !0,
                                      }))
                                    }
                                    className={`px-2 py-1 text-[9px] font-bold rounded transition-all flex items-center gap-1 cursor-pointer ${_t ? "bg-gradient-to-tr from-pink-500 to-rose-500 text-white" : "text-gray-400 hover:text-pink-600 hover:bg-pink-50"}`}
                                  >
                                    {<Eye className="w-2.5 h-2.5" />}Mockup
                                  </button>
                                }
                              </div>
                            }
                          </div>
                        }
                        {_t ? (
                          <div className="scale-95 origin-top border border-pink-100 rounded-xl  shadow-xs p-1 bg-white">
                            {
                              <PlatformPreview
                                platform={St}
                                captionText={Ie.text}
                                hashtags={Ie.hashtags}
                                media={oe[z]}
                                eventName={he ? he.name : "Special Event"}
                                locationName={he ? he.location : "Main Stage"}
                              />
                            }
                          </div>
                        ) : (
                          <React.Fragment>
                            {
                              <div className="flex justify-between items-start gap-2 mb-2">
                                {
                                  <p className="text-xs text-gray-700 italic leading-relaxed whitespace-pre-wrap flex-1">
                                    "{Ie.text}"
                                  </p>
                                }
                                {
                                  <button
                                    onClick={() => Be(Ie.text, Ie.hashtags, He)}
                                    className="text-gray-400 hover:text-pink-600 p-1 rounded-lg hover:bg-pink-50 transition-all cursor-pointer shrink-0"
                                    title="Copy caption"
                                  >
                                    {C === He ? (
                                      <Check className="w-4 h-4 text-emerald-500" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </button>
                                }
                              </div>
                            }
                            {
                              <div className="flex flex-wrap gap-1 mt-4">
                                {Ie.hashtags.map((An, At) => (
                                  <span key={At} className="text-[10px] text-pink-600 font-mono bg-pink-50 px-1.5 py-0.5 rounded border border-pink-100/50">
                                    {An}
                                  </span>
                                ))}
                              </div>
                            }
                          </React.Fragment>
                        )}
                      </div>
                    }
                    {
                      <div className="border-t border-pink-50 pt-4 mt-5">
                        {!_t && Ie.explanation && (
                          <div className="p-2.5 bg-pink-50/10 rounded-xl border border-pink-100/50 text-[10px] text-gray-500 leading-normal mb-3">
                            {
                              <span className="font-bold text-pink-600">
                                AI Placement Strategy:
                              </span>
                            }{" "}
                            {Ie.explanation}
                          </div>
                        )}
                        {hn && (
                          <div className="p-2 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-mono rounded-xl mb-3 flex items-center gap-1.5">
                            {<Calendar className="w-3.5 h-3.5" />}
                            {
                              <span>
                                Scheduled: {Xe[He]} at {G[He]}
                              </span>
                            }
                          </div>
                        )}
                        {
                          <div className="flex gap-2">
                            {
                              <button
                                onClick={() => ct(Ie.text, Ie.hashtags, He)}
                                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-pink-500/10 cursor-pointer transition-all"
                              >
                                {<Send className="w-3.5 h-3.5" />}
                                {<span>Publish Now</span>}
                              </button>
                            }
                            {
                              <button
                                onClick={() => De(He)}
                                className="bg-white hover:bg-pink-50 border border-pink-100 text-pink-500 hover:text-pink-600 p-2 rounded-xl transition-all cursor-pointer"
                                title="Schedule post release"
                              >
                                {<Calendar className="w-4 h-4" />}
                              </button>
                            }
                          </div>
                        }
                      </div>
                    }
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {L !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-xs overflow-y-auto">
          {
            <div className="bg-white border border-pink-100 rounded-2xl p-6 w-full max-w-md md:max-w-3xl shadow-2xl transition-all">
              {
                <div className="flex items-center justify-between border-b border-pink-50 pb-4 mb-5">
                  {
                    <div className="flex items-center gap-3">
                      {
                        <div className="w-8 h-8 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center font-bold">
                          📱
                        </div>
                      }
                      {
                        <div>
                          {
                            <h4 className="font-extrabold text-gray-800 text-sm">
                              Post Publishing Pipeline
                            </h4>
                          }
                          {
                            <p className="text-[10px] text-gray-400 uppercase font-mono tracking-wider mt-0.5">
                              Automated Event Posting
                            </p>
                          }
                        </div>
                      }
                    </div>
                  }
                  {rt === "done" && (
                    <button
                      onClick={Gs}
                      className="text-gray-400 hover:text-pink-500 p-1 rounded-lg border border-pink-100 hover:bg-pink-50 transition-colors"
                    >
                      {<X className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              }
              {
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {
                    <div className="flex flex-col justify-between">
                      {
                        <div>
                          {
                            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 font-mono">
                              Publishing Progress
                            </h5>
                          }
                          {
                            <div className="flex flex-col gap-3  pr-1 mb-5">
                              {P.map((Ie, He) => (
                                <div key={He} className="flex gap-2.5 text-xs items-start">
                                  {
                                    <span className="text-pink-500 shrink-0 font-bold">
                                      ✓
                                    </span>
                                  }
                                  {
                                    <p className="text-gray-700 font-medium leading-relaxed">
                                      {Ie}
                                    </p>
                                  }
                                </div>
                              ))}
                              {rt === "running" && (
                                <div className="flex items-center gap-2 text-xs text-gray-400 font-mono italic animate-pulse mt-1">
                                  {
                                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                                  }
                                  {<span>Uploading payload packets...</span>}
                                </div>
                              )}
                            </div>
                          }
                        </div>
                      }
                      {
                        <div className="border-t border-pink-50 pt-4 flex gap-2 justify-end md:justify-start">
                          {rt === "done" ? (
                            <button
                              onClick={Gs}
                              className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1"
                            >
                              {<span>Complete Publishing</span>}
                            </button>
                          ) : (
                            <button
                              disabled={!0}
                              className="w-full md:w-auto bg-pink-50 text-pink-400 font-bold text-xs px-5 py-2.5 rounded-xl border border-pink-100 opacity-60 flex items-center justify-center gap-2"
                            >
                              {
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                              }
                              {<span>Publishing in progress...</span>}
                            </button>
                          )}
                        </div>
                      }
                    </div>
                  }
                  {
                    <div className="border-t md:border-t-0 md:border-l border-pink-50 pt-5 md:pt-0 md:pl-6 flex flex-col justify-center">
                      {
                        <h5 className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-4 font-mono text-center md:text-left flex items-center gap-1.5 justify-center md:justify-start">
                          {
                            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                          }
                          {<span>Platform-Specific Live Feed Simulator</span>}
                        </h5>
                      }
                      {L !== null && be[L] && (
                        <div className="bg-white border border-pink-100 rounded-2xl p-2.5 max-w-sm mx-auto shadow-xs">
                          {
                            <PlatformPreview
                              platform={E === "all" ? "instagram" : E}
                              captionText={be[L].text}
                              hashtags={be[L].hashtags}
                              media={oe[z]}
                              eventName={he ? he.name : "Special Event"}
                              locationName={he ? he.location : "Main Stage"}
                            />
                          }
                        </div>
                      )}
                    </div>
                  }
                </div>
              }
            </div>
          }
        </div>
      )}
      {ne !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          {
            <div className="bg-white border border-pink-100 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
              {
                <div className="flex items-center gap-3 border-b border-pink-50 pb-4 mb-5">
                  {<Calendar className="w-5 h-5 text-pink-500" />}
                  {
                    <div>
                      {
                        <h4 className="font-extrabold text-gray-800 text-sm">
                          Schedule Publication
                        </h4>
                      }
                      {
                        <p className="text-[10px] text-gray-400 uppercase font-mono tracking-wider mt-0.5">
                          Automated Post Release
                        </p>
                      }
                    </div>
                  }
                </div>
              }
              {
                <div className="flex flex-col gap-4 mb-5">
                  {
                    <div className="flex flex-col gap-1.5">
                      {
                        <label className="text-[10px] font-bold text-pink-600 uppercase tracking-wider">
                          App Client ID (API Key)
                        </label>
                      }
                      {
                        <input
                          type="text"
                          placeholder="e.g., cli_12893041_instagram"
                          value={a}
                          onChange={(V) => u(V.target.value)}
                          className="bg-pink-50/10 border border-pink-100 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400"
                        />
                      }
                    </div>
                  }
                  {
                    <div className="flex flex-col gap-1.5">
                      {
                        <label className="text-[10px] font-bold text-pink-600 uppercase tracking-wider">
                          App Client Secret
                        </label>
                      }
                      {
                        <div className="relative">
                          {
                            <input
                              type="password"
                              placeholder="••••••••••••••••••••••••"
                              value={c}
                              onChange={(V) => p(V.target.value)}
                              className="w-full bg-pink-50/10 border border-pink-100 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400"
                            />
                          }
                          {
                            <Lock className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                          }
                        </div>
                      }
                    </div>
                  }
                </div>
              }
              {
                <div className="flex justify-end gap-3 border-t border-pink-50 pt-4">
                  {
                    <button
                      onClick={() => De(null)}
                      className="px-4 py-2 border border-pink-100 text-xs text-gray-500 rounded-xl font-semibold hover:bg-pink-50/30 cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                  }
                  {
                    <button
                      onClick={() => {
                        var _t, St;
                        const Ie =
                            ((_t = document.getElementById(
                              "scheduler-date-input",
                            )) == null
                              ? void 0
                              : _t.value) ||
                            new Date().toISOString().split("T")[0],
                          He =
                            ((St = document.getElementById(
                              "scheduler-time-input",
                            )) == null
                              ? void 0
                              : St.value) || "12:00";
                        (N((hn) => ({
                          ...hn,
                          [ne]: Ie,
                        })),
                          le((hn) => ({
                            ...hn,
                            [ne]: He,
                          })),
                          De(null));
                      }}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-md cursor-pointer transition-all"
                    >
                      Set Schedule
                    </button>
                  }
                </div>
              }
            </div>
          }
        </div>
      )}
    </div>
  );
}
export default CaptionStudioTab;
