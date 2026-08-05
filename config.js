// ====== SHARED DATABASE CONFIG — fill these in after creating your Firebase project ======
// Used by both index.html (register) and log-calibration.html (quick log form).
// See README.md for exact setup steps.
const FIREBASE_DB_URL = "https://calibration-28cde-default-rtdb.europe-west1.firebasedatabase.app";
const DATA_PATH_TOKEN = "iOiXtIZk91rMH1c43h6atFnJgYFfiCwKpS627ehS";
// ===========================================================================================

const SECTIONS = ["1st Fix", "2nd Fix", "Stair Parts", "CNC"];
const TOOL_OPTIONS = ["Tape Measure", "Digital Calipers", "Roofing Square"];
const DEFAULT_CALIBRATORS = {
  "1st Fix": ["J. Hartley", "M. Ostrowski"],
  "2nd Fix": ["S. Cole", "M. Ostrowski"],
  "Stair Parts": ["R. Nguyen", "J. Hartley"],
  "CNC": ["S. Cole", "R. Nguyen", "M. Ostrowski"],
};
const ALERT_WINDOW_DAYS = 5;
const ADMIN_PASSWORD = "Staircraft123";
const NEEDS_SETUP = FIREBASE_DB_URL.includes("YOUR-PROJECT-ID") || DATA_PATH_TOKEN.includes("REPLACE-WITH");

function dbPath(key){
  return `${FIREBASE_DB_URL}/toolCalibrationRegister/${DATA_PATH_TOKEN}/${key}.json`;
}
async function dbGet(key){
  const res = await fetch(dbPath(key));
  if(!res.ok) throw new Error("Database read failed: " + res.status);
  return res.json();
}
async function dbSet(key, value){
  const res = await fetch(dbPath(key), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  });
  if(!res.ok) throw new Error("Database write failed: " + res.status);
  return res.json();
}
