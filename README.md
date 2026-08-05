# Tool Calibration Register

A shared workshop site for tracking calibrated tools across four sections:
1st Fix, 2nd Fix, Stair Parts, and CNC.

Two pages:
- **`index.html`** — the full register: table, tabs, status colours, admin tools (add/remove/edit, calibrator name management), history, and flexible Excel export.
- **`log-calibration.html`** — a quick single-tool form for logging a calibration on the spot, without opening the full table.

Both pages read shared settings from **`config.js`** — that's the only file you need to edit for setup.

## One-time setup (required before this works)

These pages are static — GitHub Pages can host them, but they have no server of
their own, so they need a small free shared database so everyone sees the
same, live-updating data.

1. **Create a free Firebase project**
   - Go to https://console.firebase.google.com and sign in with a Google account.
   - Click **Add project**, give it a name (e.g. `tool-calibration-register`), and finish creation (Google Analytics is optional — you can turn it off).

2. **Create a Realtime Database**
   - In the left menu, go to **Build → Realtime Database → Create Database**.
   - Pick a region close to you.
   - Start in **locked mode** — you'll paste in proper rules next.
   - Once created, copy the **Database URL** shown at the top of the page. It looks like:
     `https://tool-calibration-register-xxxxx-default-rtdb.europe-west1.firebasedatabase.app`

3. **Set the database rules**
   - Go to the **Rules** tab and replace the contents with the block below,
     swapping in your own long random token (30+ random characters — a
     password generator works well):

     ```json
     {
       "rules": {
         "toolCalibrationRegister": {
           "$token": {
             ".read": "$token === 'PASTE-YOUR-LONG-RANDOM-TOKEN-HERE'",
             ".write": "$token === 'PASTE-YOUR-LONG-RANDOM-TOKEN-HERE'"
           }
         }
       }
     }
     ```
   - Click **Publish**.
   - This token is the *only* thing standing between the public internet and
     your data — like the admin password, it's a front-end-level gate, not
     real authentication. Anyone who has the token (or digs it out of the
     page source, which is public on GitHub Pages) can read and write the
     register. Keep the token itself out of anywhere public other than this
     file, and treat this as appropriate for internal, low-sensitivity data
     — not anything confidential.

4. **Fill in `config.js`**
   - Open `config.js`, find these two lines near the top:

     ```js
     const FIREBASE_DB_URL = "https://YOUR-PROJECT-ID-default-rtdb.YOUR-REGION.firebasedatabase.app";
     const DATA_PATH_TOKEN = "REPLACE-WITH-A-LONG-RANDOM-TOKEN";
     ```
   - Replace both values with your real Database URL and the token you put in the rules above.
   - Save, commit, and push. Both pages read from this one file, so you only
     need to do this once. The red banner on each page will disappear once
     it can reach the database.

## Hosting on GitHub Pages

1. Push this repo to GitHub as a **public** repository (GitHub Pages on the free
   plan only works with public repos — private repos need GitHub Pro or higher).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Branch: `main`, folder: `/ (root)`. Save.
5. After a minute or two, your site will be live at:
   `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`
   and the quick-log form at:
   `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/log-calibration.html`

## Admin access

Both pages share the same admin password (set in `config.js` as
`ADMIN_PASSWORD`). This is a front-end-only gate, visible to anyone who views
the page source — fine as a light deterrent for an internal tool, not real
security. Logging in on one page doesn't carry over to the other — it's a
separate login each time you load a page.

## Notes

- Removing a tool from the full register also deletes its calibration history.
- The 5-day "due soon" banner on the register only appears while someone has
  the page open — it can't send emails on its own.
- The quick-log form only lets you log calibrations for tools that already
  exist in the register — add new tools from the full register first.

