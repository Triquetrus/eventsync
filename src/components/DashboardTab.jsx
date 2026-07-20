import React from "react";
import { Calendar, Bell, BookmarkCheck, Bookmark, Briefcase, CalendarDays, Camera, CheckCheck, Check, ChevronRight, AlertCircle, CheckCircle2, HelpCircle, Clock, Copy, MoreHorizontal, Eye, Facebook, FolderHeart, GraduationCap, Globe, Heart, Image, Info, Instagram, LayoutDashboard, Linkedin, ListTodo, Lock, MapPin, Menu, MessageCircle, MessageSquare, Plus, Repeat, Send, Settings, Share2, ShieldCheck, Sparkle, Sparkles, SquarePen, Star, ThumbsUp, Trash2, Unlink, Upload, UserPlus, UserRoundCheck, Users, X, Zap } from 'lucide-react';
function DashboardTab({
  events: r,
  media: t,
  captions: e,
  onNavigateToTab: s,
  onSelectEventForCamera: a,
  onCreateEventClick: u,
  userProfile: up,
}) {
  const [c, p] = React.useState(new Date().toISOString().split("T")[0]),
    g = r.filter((me) => me.status === "upcoming").length,
    y = r.filter((me) => me.status === "ongoing").length,
    I = r.find((me) => me.status === "ongoing") || r[0],
    E = I ? t.filter((c) => c.eventId === I.id).length : 0,
    w = I ? e.filter((m) => m.eventId === I.id).length : 0,
    V = new Date(),
    z = V.toLocaleString("default", {
      month: "long",
    }),
    te = V.getFullYear(),
    pe = (() => {
      const me = [];
      for (let Re = -3; Re < 11; Re++) {
        const be = new Date();
        (be.setDate(V.getDate() + Re),
          me.push({
            dateString: be.toISOString().split("T")[0],
            dayName: be.toLocaleString("default", {
              weekday: "short",
            }),
            dayNum: be.getDate(),
            isToday: be.toDateString() === V.toDateString(),
          }));
      }
      return me;
    })(),
    Te = r.filter((me) => me.date === c),
    Ee = (me) => {
      switch (me) {
        case "instagram":
          return <Instagram className="w-4 h-4 text-pink-500" />;
        case "linkedin":
          return <Linkedin className="w-4 h-4 text-blue-500" />;
        case "facebook":
          return <Facebook className="w-4 h-4 text-indigo-500" />;
        default:
          return <Sparkles className="w-4 h-4 text-indigo-400" />;
      }
    };
  return (
    <div id="dashboard-view" className="flex-1 p-4 md:p-8 ">
      {
        <div
          id="dashboard-header"
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8"
        >
          {
            <div>
              {
                <h2
                  id="welcome-title"
                  className="text-3xl font-extrabold text-gray-900 tracking-tight bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
                >{`Hello, ${up?.name?.split(" ")[0] || "Anya"} 👋`}</h2>
              }
              {
                <p id="welcome-subtitle" className="text-gray-500 mt-1 text-sm">
                  Ready to capture moments and curate viral social posts? Here's
                  your event workspace.
                </p>
              }
            </div>
          }
          {
            <button 
              id="btn-create-event-dashboard"
              onClick={u}
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-rose-600 hover:to-amber-600 text-white font-medium px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-pink-500/15 transition-all cursor-pointer self-start"
            >
              {<Plus className="w-4 h-4" />}
              {<span>New Event</span>}
            </button>
          }
        </div>
      }
      {
        <div
          id="stats-grid"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8"
        >
          {
            <div
              id="stat-card-ongoing"
              onClick={() => s("events", "ongoing")}
              className="bg-white border border-pink-100/80 p-4 md:p-4 md:p-5 rounded-2xl flex flex-col gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              {
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  Active Events
                </span>
              }
              {
                <div className="flex items-baseline gap-2">
                  {
                    <span className="text-3xl font-bold text-emerald-600">
                      {y}
                    </span>
                  }
                  {<span className="text-xs text-gray-500">Live now</span>}
                </div>
              }
              {
                <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2">
                  {
                    <div
                      className="bg-emerald-500 h-1.5 rounded-full"
                      style={{
                        width: y > 0 ? "50%" : "0%",
                      }}
                    />
                  }
                </div>
              }
            </div>
          }
          {
            <div
              id="stat-card-upcoming"
              onClick={() => s("events", "upcoming")}
              className="bg-white border border-pink-100/80 p-4 md:p-4 md:p-5 rounded-2xl flex flex-col gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              {
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  Upcoming Events
                </span>
              }
              {
                <div className="flex items-baseline gap-2">
                  {
                    <span className="text-3xl font-bold text-pink-600">
                      {g}
                    </span>
                  }
                  {<span className="text-xs text-gray-500">Scheduled</span>}
                </div>
              }
              {
                <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2">
                  {
                    <div
                      className="bg-pink-500 h-1.5 rounded-full"
                      style={{
                        width: "70%",
                      }}
                    />
                  }
                </div>
              }
            </div>
          }
          {
            <div
              id="stat-card-media"
              className="bg-white border border-pink-100/80 p-4 md:p-5 rounded-2xl flex flex-col gap-2 shadow-sm hover:shadow-md transition-all"
            >
              {
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  Event Studio Media
                </span>
              }
              {
                <div className="flex items-baseline gap-2">
                  {
                    <span className="text-3xl font-bold text-rose-500">
                      {w}
                    </span>
                  }
                  {
                    <span className="text-xs text-gray-500">
                      Photos & Videos
                    </span>
                  }
                </div>
              }
              {
                <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2">
                  {
                    <div
                      className="bg-rose-500 h-1.5 rounded-full"
                      style={{
                        width: w > 0 ? "60%" : "0%",
                      }}
                    />
                  }
                </div>
              }
            </div>
          }
          {
            <div
              id="stat-card-drafts"
              className="bg-white border border-pink-100/80 p-4 md:p-5 rounded-2xl flex flex-col gap-2 shadow-sm hover:shadow-md transition-all"
            >
              {
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  AI Captions Drafted
                </span>
              }
              {
                <div className="flex items-baseline gap-2">
                  {
                    <span className="text-3xl font-bold text-amber-500">
                      {E}
                    </span>
                  }
                  {<span className="text-xs text-gray-500">Ready to post</span>}
                </div>
              }
              {
                <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2">
                  {
                    <div
                      className="bg-amber-500 h-1.5 rounded-full"
                      style={{
                        width: E > 0 ? "80%" : "0%",
                      }}
                    />
                  }
                </div>
              }
            </div>
          }
        </div>
      }
      {
        <div
          id="dashboard-layout-main"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {
            <div
              id="dashboard-col-left"
              className="lg:col-span-2 flex flex-col gap-8"
            >
              {I && (
                <div
                  id="active-event-prompts"
                  className="bg-white border border-pink-100 rounded-2xl p-6 relative  shadow-sm"
                >
                  {
                    <div className="absolute right-0 top-0 bg-pink-500/10 text-pink-600 font-mono text-[10px] px-3 py-1 rounded-bl-xl border-l border-b border-pink-100 uppercase font-bold tracking-wider">
                      Current Workspace
                    </div>
                  }
                  {
                    <div className="flex items-center gap-2 mb-4">
                      {
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-pink-500/10 text-pink-600 rounded border border-pink-500/20">
                          {I.status.toUpperCase()}
                        </span>
                      }
                      {
                        <h3 className="font-bold text-xl text-gray-800 truncate">
                          {I.name}
                        </h3>
                      }
                    </div>
                  }
                  {
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm text-gray-500 font-medium">
                      {
                        <div className="flex items-center gap-2">
                          {
                            <MapPin className="w-4 h-4 text-pink-500 shrink-0" />
                          }
                          {<span className="truncate">{I.location}</span>}
                        </div>
                      }
                      {
                        <div className="flex items-center gap-2">
                          {<Clock className="w-4 h-4 text-pink-500 shrink-0" />}
                          {<span>{I.time} today</span>}
                        </div>
                      }
                      {
                        <div className="flex items-center gap-2">
                          {<Calendar className="w-4 h-4 text-pink-500 shrink-0" />}
                          {<span className="text-xs font-mono">{I.date}</span>}
                        </div>
                      }
                    </div>
                  }
                  {
                    <div className="border-t border-pink-50 pt-5">
                      {
                        <div className="flex items-center justify-between mb-4">
                          {
                            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                              {<ListTodo className="w-4 h-4 text-pink-500" />}AI
                              Real-time Smart Prompts
                            </h4>
                          }
                          {
                            <span className="text-xs text-gray-400">
                              Capture prompts automatically generated
                            </span>
                          }
                        </div>
                      }
                      {
                        <div className="flex flex-col gap-3">
                          {I.smartPrompts && I.smartPrompts.length > 0 ? (
                            I.smartPrompts.map((me, Re) => (
                              <div key={Re} className="flex items-center justify-between p-3.5 bg-pink-50/20 hover:bg-pink-50/50 border border-pink-100/50 rounded-xl transition-all group">
                                {
                                  <div className="flex items-center gap-3">
                                    {
                                      <span className="w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-600 flex items-center justify-center text-xs font-mono font-bold">
                                        {Re + 1}
                                      </span>
                                    }
                                    {
                                      <p className="text-sm text-gray-700 font-medium">
                                        {me}
                                      </p>
                                    }
                                  </div>
                                }
                                {
                                  <button 
                                    onClick={() => a(I.id, me)}
                                    className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold opacity-90 group-hover:opacity-100 transition-all cursor-pointer"
                                  >
                                    {<Camera className="w-3.5 h-3.5" />}
                                    {
                                      <span className="hidden sm:inline">
                                        Capture
                                      </span>
                                    }
                                  </button>
                                }
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-gray-400 italic">
                              No smart capture prompts generated yet. Edit the
                              event to load custom instructions.
                            </p>
                          )}
                        </div>
                      }
                    </div>
                  }
                </div>
              )}
              {
                <div
                  id="weekly-calendar-card"
                  className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm"
                >
                  {
                    <div className="flex justify-between items-center mb-5">
                      {
                        <div>
                          {
                            <h4 className="font-bold text-lg text-gray-800">
                              Event Synchronizer
                            </h4>
                          }
                          {
                            <p className="text-xs text-gray-500 mt-0.5">
                              Click days to view schedule and active reminder
                              prompts
                            </p>
                          }
                        </div>
                      }
                      {
                        <span className="text-sm font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-lg border border-pink-100/50">
                          {z} {te}
                        </span>
                      }
                    </div>
                  }
                  {
                    <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 mb-6">
                      {pe.map((me) => {
                        const Re = r.some((k) => k.date === me.dateString),
                          be = c === me.dateString;
                        return (
                          <button key={me.dateString} 
                            onClick={() => p(me.dateString)}
                            className={`flex flex-col items-center justify-center py-2.5 rounded-xl border transition-all cursor-pointer ${be ? "bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 border-pink-500 text-white shadow-md shadow-pink-500/10" : me.isToday ? "bg-pink-50 border-pink-200 text-pink-600" : "bg-white border-pink-100/60 text-gray-500 hover:border-pink-300 hover:text-pink-600"}`}
                          >
                            {
                              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                                {me.dayName}
                              </span>
                            }
                            {
                              <span className="text-base font-extrabold mt-0.5">
                                {me.dayNum}
                              </span>
                            }
                            {Re && (
                              <span
                                className={`w-1.5 h-1.5 rounded-full mt-1 ${be ? "bg-white" : "bg-pink-500"}`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  }
                  {
                    <div className="bg-pink-50/10 border border-pink-100/50 rounded-xl p-4">
                      {
                        <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 font-mono">
                          Schedule for {c}
                        </h5>
                      }
                      {Te.length > 0 ? (
                        <div className="flex flex-col gap-3">
                          {Te.map((me) => (
                            <div key={me.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-pink-100/40 shadow-xs">
                              {
                                <div className="flex items-center gap-3">
                                  {
                                    <span
                                      className={`w-3 h-3 rounded-full ${me.type === "college" ? "bg-cyan-500" : me.type === "seminar" ? "bg-purple-500" : me.type === "wedding" ? "bg-pink-500" : "bg-indigo-500"}`}
                                    />
                                  }
                                  {
                                    <div>
                                      {
                                        <p className="text-sm font-semibold text-gray-800">
                                          {me.name}
                                        </p>
                                      }
                                      {
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                                          {
                                            <span className="flex items-center gap-0.5">
                                              {<Clock className="w-3 h-3" />}{" "}
                                              {me.time}
                                            </span>
                                          }
                                          {<span>•</span>}
                                          {
                                            <span className="flex items-center gap-0.5">
                                              {<MapPin className="w-3 h-3" />}{" "}
                                              {me.location}
                                            </span>
                                          }
                                        </div>
                                      }
                                    </div>
                                  }
                                </div>
                              }
                              {
                                <button 
                                  onClick={() => s("events")}
                                  className="text-gray-400 hover:text-pink-600 p-1 rounded transition-all cursor-pointer"
                                >
                                  {<ChevronRight className="w-5 h-5" />}
                                </button>
                              }
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic py-2">
                          No events scheduled for this day.
                        </p>
                      )}
                    </div>
                  }
                </div>
              }
            </div>
          }
          {
            <div id="dashboard-col-right" className="flex flex-col gap-8">
              {
                <div
                  id="dashboard-drafts"
                  className="bg-white border border-pink-100 rounded-2xl p-6 flex flex-col gap-4 shadow-sm"
                >
                  {
                    <div className="flex items-center justify-between">
                      {
                        <h4 className="font-bold text-lg text-gray-800">
                          AI Content Drafts
                        </h4>
                      }
                      {
                        <button 
                          onClick={() => s("captions")}
                          className="text-xs font-semibold text-pink-600 hover:text-pink-500 cursor-pointer"
                        >
                          View Studio
                        </button>
                      }
                    </div>
                  }
                  {
                    <div className="flex flex-col gap-3">
                      {e.length > 0 ? (
                        e.slice(0, 2).map((me) => {
                          const Re = r.find((be) => be.id === me.eventId);
                          return (
                            <div key={me.id} className="p-3.5 bg-pink-50/10 rounded-xl border border-pink-100/50 hover:border-pink-200 transition-all">
                              {
                                <div className="flex items-center justify-between mb-2">
                                  {
                                    <span className="text-[10px] text-gray-500 font-mono truncate max-w-[120px]">
                                      {(Re == null ? void 0 : Re.name) ||
                                        "General Event"}
                                    </span>
                                  }
                                  {
                                    <div className="flex items-center gap-1">
                                      {Ee(me.platform)}
                                      {
                                        <span className="text-[10px] text-gray-400 capitalize font-medium">
                                          {me.platform}
                                        </span>
                                      }
                                    </div>
                                  }
                                </div>
                              }
                              {
                                <p className="text-xs text-gray-700 line-clamp-3 italic">
                                  "{me.text}"
                                </p>
                              }
                              {
                                <div className="flex flex-wrap gap-1 mt-2.5">
                                  {(me.hashtags || []).slice(0, 3).map((be, k) => (
                                    <span key={k} className="text-[10px] text-pink-600 font-mono bg-pink-50 px-1.5 py-0.5 rounded border border-pink-100/40">
                                      {be}
                                    </span>
                                  ))}
                                </div>
                              }
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-6 border border-dashed border-pink-200 rounded-xl">
                          {
                            <p className="text-xs text-gray-400 italic mb-2">
                              No AI captions drafted yet
                            </p>
                          }
                          {
                            <button 
                              onClick={() => s("captions")}
                              className="text-xs bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 font-semibold px-3 py-1.5 rounded-lg border border-pink-100/50 cursor-pointer"
                            >
                              Generate AI Caption
                            </button>
                          }
                        </div>
                      )}
                    </div>
                  }
                </div>
              }
              {
                <div
                  id="hackathon-tips"
                  className="bg-gradient-to-br from-pink-500/5 via-rose-500/5 to-amber-500/5 border border-pink-100/60 rounded-2xl p-6 shadow-xs"
                >
                  {
                    <h4 className="font-bold text-pink-600 text-sm tracking-wider uppercase flex items-center gap-2 mb-3">
                      {<Sparkles className="w-4 h-4 text-pink-500" />}EventSync
                      Innovation Panel
                    </h4>
                  }
                  {
                    <div className="flex flex-col gap-3 text-xs text-gray-600">
                      {
                        <div className="flex gap-2.5">
                          {<span className="text-lg">📈</span>}
                          {
                            <div>
                              {
                                <p className="font-bold text-gray-800">
                                  Before → During → After Workflow
                                </p>
                              }
                              {
                                <p className="text-gray-500 mt-0.5 leading-relaxed">
                                  Our smart notifications proactively guide
                                  users to ensure key moments aren't forgotten.
                                </p>
                              }
                            </div>
                          }
                        </div>
                      }
                      {
                        <div className="flex gap-2.5 border-t border-pink-100/60 pt-3">
                          {<span className="text-lg">⚡</span>}
                          {
                            <div>
                              {
                                <p className="font-bold text-gray-800">
                                  AI Contextual Captioning
                                </p>
                              }
                              {
                                <p className="text-gray-400 mt-0.5 leading-relaxed">
                                  Captions aren't generic: they use Gemini
                                  vision to read image aesthetics and align with
                                  specific brand tones.
                                </p>
                              }
                            </div>
                          }
                        </div>
                      }
                      {
                        <div className="flex gap-2.5 border-t border-pink-100/60 pt-3">
                          {<span className="text-lg">💼</span>}
                          {
                            <div>
                              {
                                <p className="font-bold text-gray-800">
                                  SaaS Business Scaling
                                </p>
                              }
                              {
                                <p className="text-gray-400 mt-0.5 leading-relaxed">
                                  Perfect for agency team workspaces, colleges
                                  co-ordinating events: r, and branding
                                  consultants.
                                </p>
                              }
                            </div>
                          }
                        </div>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          }
        </div>
      }
    </div>
  );
}
export default DashboardTab;
