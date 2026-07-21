import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

function profileFromUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.user_metadata?.full_name || user.email.split("@")[0],
    email: user.email,
    role: "User",
    image: user.user_metadata?.avatar_url || null,
  };
}

window.supabaseAuth = {
  login: (email, password) =>
    supabase.auth.signInWithPassword({ email, password }).then(({ error }) => {
      if (error) throw error;
    }),
  signup: (email, password) =>
    supabase.auth.signUp({ email, password }).then(({ error }) => {
      if (error) throw error;
    }),
  googleLogin: () => supabase.auth.signInWithOAuth({ provider: "google" }),
  logout: () => supabase.auth.signOut(),
  updateProfile: (name, image) =>
    supabase.auth.updateUser({ data: { full_name: name, avatar_url: image } }),
  onAuthStateChanged: (callback) => {
    supabase.auth.getSession().then(({ data }) => {
      callback(profileFromUser(data.session?.user));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(profileFromUser(session?.user));
    });
    return () => sub.subscription.unsubscribe();
  },
};