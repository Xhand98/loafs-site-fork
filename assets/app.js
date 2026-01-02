// assets/app.js
const SUPABASE_URL = "https://jjudpgcuknzpgxgizhpz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_HV6A4RvO8Sy6Css8sNWywA_RypjEtMf";

function getClient() {
  // supabase-js is loaded on each page via CDN and exposed as window.supabase
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
  );
}

async function fetchLeaderboardTop(limit = 50) {
  const client = getClient();
  const { data, error } = await client
    .from("leaderboard")
    .select("username,points,updated_at")
    .order("points", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

window.LoafsApp = {
  fetchLeaderboardTop,
  escapeHtml,
};
