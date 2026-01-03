// Make these global so other pages can reuse them
window.SUPABASE_URL = "https://jjudpgcuknzpgxgizhpz.supabase.co";
window.SUPABASE_PUBLISHABLE_KEY = "sb_publishable_HV6A4RvO8Sy6Css8sNWywA_RypjEtMf";

const SUPABASE_URL = window.SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = window.SUPABASE_PUBLISHABLE_KEY;

function getClient() {
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m]));
}

async function fetchLeaderboardTop(limit = 50) {
  const client = getClient();
  const { data, error } = await client
    .from("leaderboard")
    .select("username, points")
    .order("points", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

window.LoafsApp = {
  fetchLeaderboardTop,
  escapeHtml
};
