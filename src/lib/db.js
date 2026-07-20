import { supabase } from "./supabaseClient";

export const Ti = false;
export const sn = null;
export const oa = () => {};
export const b6 = async () => {};
export const E6 = async () => {};
export const ya = () => {};

export const EC = [{
    platform: "instagram",
    username: "eventsync.ai",
    isConnected: !0,
    profileUrl: "https://instagram.com/eventsync.ai",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
  }, {
    platform: "linkedin",
    username: "EventSync Corporate",
    isConnected: !1,
    profileUrl: "https://linkedin.com/company/eventsync",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
  }, {
    platform: "facebook",
    username: "EventSync Pages",
    isConnected: !0,
    profileUrl: "https://facebook.com/eventsync.ai",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
  }],
  defaultEvents = [{
    id: "event-1",
    name: "AI Hackathon Demo Day",
    date: new Date().toISOString().split("T")[0],
    time: "14:00",
    endTime: "18:00",
    location: "Tech Hub, Room 101",
    type: "college",
    description: "Annual university AI Hackathon final pitches and demo presentations. Showcase of Gemini and Firebase full-stack applications.",
    status: "ongoing",
    smartPrompts: ["Capture the energetic pitching team on stage", "Take a detailed macro shot of the prototype screen", "Record a 10-second reaction video of the judges smiling", "Snap a wide-angle photo of the entire audience cheering"],
    createdAt: new Date().toISOString()
  }, {
    id: "event-2",
    name: "Global Biotech Seminar",
    date: new Date(Date.now() + 864e5).toISOString().split("T")[0],
    time: "09:30",
    endTime: "12:00",
    location: "Grand Convention Center",
    type: "seminar",
    description: "Keynote sessions on modern genetic edits and biotech innovations. Attended by major international researchers.",
    status: "upcoming",
    smartPrompts: ["Take a portrait of the keynote speaker at the podium", "Capture networking interactions during the coffee break", "Snap the prominent research posters line-up"],
    createdAt: new Date().toISOString()
  }, {
    id: "event-3",
    name: "Fiona & David's Wedding",
    date: "2026-07-15",
    time: "17:00",
    location: "The Rose Garden Sanctuary",
    type: "wedding",
    description: "A beautiful outdoor wedding ceremony followed by a grand evening banquet under the stars.",
    status: "upcoming",
    smartPrompts: ["Capture Fiona walking down the flower-petal aisle", "Snapshot of the couple's first toast together", "Take a fun, candid photo of guests dancing", "Emotional reaction of parents during the vows"],
    createdAt: new Date().toISOString()
  }],
  saveToStorage = (r, e) => {
    try {
      localStorage.setItem(`eventsync_${r}`, JSON.stringify(e));
    } catch (err) {
      console.warn("Storage quota exceeded", err.message || err);
      if (r === "media" && Array.isArray(e) && e.length > 5) {
        try {
          localStorage.setItem(`eventsync_${r}`, JSON.stringify(e.slice(-5)));
        } catch (e2) {}
      }
    }
  },
  getFromStorage = (r, e) => {
    const t = localStorage.getItem(`eventsync_${r}`);
    return t ? JSON.parse(t) : e;
  },
  getEvents = async () => {
    let up = null;
    try {
      up = JSON.parse(localStorage.getItem("eventsync_user_profile"));
    } catch (e) {}
    if (!up) return [];
    try {
      const { data, error } = await supabase.from("events").select("*").eq("user_email", up.email);
      if (error) throw error;
      const t = data.map(row => ({ ...row.data, id: row.id, userEmail: row.user_email }));
      return saveToStorage("events", t), t;
    } catch (e) {
      console.warn("Supabase events error:", e);
    }
    return getFromStorage("events", defaultEvents).filter(ev => ev.userEmail === up.email);
  },
  saveEvent = async r => {
    let up = null;
    try {
      up = JSON.parse(localStorage.getItem("eventsync_user_profile"));
    } catch (e) {}
    const e = r.id || `evt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      t = {
        ...r,
        id: e,
        createdAt: r.createdAt || new Date().toISOString(),
        userEmail: up ? up.email : ""
      };
    try {
      await supabase.from("events").upsert({ id: e, user_email: t.userEmail, data: t });
    } catch (u) {
      console.warn("Supabase event write failed, using local storage:", u);
    }
    const s = await getEvents(),
      a = s.findIndex(u => u.id === t.id);
    return a !== -1 ? s[a] = t : s.push(t), saveToStorage("events", s), t;
  },
  TC = async r => {
    try {
      await supabase.from("events").delete().eq("id", r);
    } catch (s) {
      console.warn("Supabase event delete failed:", s);
    }
    const t = (await getEvents()).filter(s => s.id !== r);
    saveToStorage("events", t);
  },
  getMedia = async r => {
    let up = null;
    try {
      up = JSON.parse(localStorage.getItem("eventsync_user_profile"));
    } catch (e) {}
    if (!up) return [];
    try {
      let q = supabase.from("media").select("*").eq("user_email", up.email);
      const { data, error } = await q;
      if (error) throw error;
      let u = data.map(row => ({ ...row.data, id: row.id, userEmail: row.user_email }));
      if (r) u = u.filter(m => m.eventId === r);
      return saveToStorage("media", u), u;
    } catch (t) {
      console.warn("Supabase media load error:", t);
    }
    const e = getFromStorage("media", []);
    return (r ? e.filter(t => t.eventId === r) : e).filter(m => m.userEmail === up.email);
  },
  SC = async r => {
    let up = null;
    try {
      up = JSON.parse(localStorage.getItem("eventsync_user_profile"));
    } catch (e) {}
    const e = r.id || `med-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      t = {
        ...r,
        id: e,
        userEmail: up ? up.email : ""
      };
    try {
      await supabase.from("media").upsert({ id: e, user_email: t.userEmail, event_id: t.eventId || null, data: t });
    } catch (u) {
      console.warn("Supabase media write error:", u);
    }
    const s = getFromStorage("media", []),
      a = s.findIndex(u => u.id === t.id);
    return a !== -1 ? s[a] = t : s.push(t), saveToStorage("media", s), t;
  },
  NC = async r => {
    try {
      await supabase.from("media").delete().eq("id", r);
    } catch (s) {
      console.warn("Supabase media delete error:", s);
    }
    const t = getFromStorage("media", []).filter(s => s.id !== r);
    saveToStorage("media", t);
  },
  getCaptions = async () => {
    let up = null;
    try {
      up = JSON.parse(localStorage.getItem("eventsync_user_profile"));
    } catch (e) {}
    if (!up) return [];
    try {
      const { data, error } = await supabase.from("captions").select("*").eq("user_email", up.email);
      if (error) throw error;
      const u = data.map(row => ({ ...row.data, id: row.id, userEmail: row.user_email }));
      return saveToStorage("captions", u), u;
    } catch (t) {
      console.warn("Supabase captions load error:", t);
    }
    const e = getFromStorage("captions", []);
    return e.filter(m => m.userEmail === up.email);
  },
  RC = async r => {
    let up = null;
    try {
      up = JSON.parse(localStorage.getItem("eventsync_user_profile"));
    } catch (e) {}
    const e = r.id || `cap-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      t = {
        ...r,
        id: e,
        userEmail: up ? up.email : ""
      };
    try {
      await supabase.from("captions").upsert({ id: e, user_email: t.userEmail, data: t });
    } catch (u) {
      console.warn("Supabase caption write error:", u);
    }
    const s = getFromStorage("captions", []),
      a = s.findIndex(u => u.id === t.id);
    return a !== -1 ? s[a] = t : s.push(t), saveToStorage("captions", s), t;
  },
  getNotifications = () => getFromStorage("notifications", [{
    id: "notif-1",
    eventId: "event-1",
    eventName: "AI Hackathon Demo Day",
    title: "Smart Camera Prompt!",
    message: "👉 Capture the energetic pitching team on stage! Let's get a picture with the team pointing at the screen.",
    timestamp: new Date(Date.now() - 3e5).toISOString(),
    type: "prompt",
    isRead: !1,
    promptAction: "capture"
  }, {
    id: "notif-2",
    eventId: "event-2",
    eventName: "Global Biotech Seminar",
    title: "Upcoming Event Sync",
    message: "The Biotech Seminar starts tomorrow at 09:30. Ensure your templates are set for professional LinkedIn postings.",
    timestamp: new Date(Date.now() - 36e5).toISOString(),
    type: "info",
    isRead: !0
  }]),
  setNotifications = r => {
    saveToStorage("notifications", r);
  };