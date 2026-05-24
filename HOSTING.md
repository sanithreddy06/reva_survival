# Host REVA on a subdomain (keep main site at saisanithreddy.online)

| URL | What lives there |
|-----|------------------|
| `https://saisanithreddy.online` | Your **main** portfolio (unchanged) |
| `https://reva.saisanithreddy.online` | **REVA Survival Toolkit** (this repo) |

GitHub repo: `https://github.com/sanithreddy06/reva_survival`

---

## Why GitHub said “DNS check unsuccessful”

You likely set the **root domain** (`saisanithreddy.online`) on GitHub Pages. That requires **4 A records** at your registrar and must **not** conflict with where your main site already points.

For a **subdomain**, you only need **one CNAME** — simpler and it does not break your main site.

---

# Part 1 — Fix GitHub Pages (do this first)

### 1.1 Open Pages settings

1. Go to: **https://github.com/sanithreddy06/reva_survival**
2. Click **Settings** (repo settings, not your profile)
3. Left sidebar → **Pages**

### 1.2 Build settings

Under **Build and deployment**:

- **Source:** Deploy from a branch  
- **Branch:** `main`  
- **Folder:** `/ (root)`  
- Click **Save** if you changed anything  

Wait until the page shows a green deployment (1–3 minutes). You may see a temporary URL like:

`https://sanithreddy06.github.io/reva_survival/`

Open that link — REVA should load. If not, fix the repo before DNS.

### 1.3 Remove the wrong custom domain (if present)

Under **Custom domain**:

- If it shows `saisanithreddy.online` (root only, no subdomain), click **Remove** or clear it and save.  
- Root domain checks often fail if your main site already uses those DNS records.

### 1.4 Add the subdomain custom domain

1. In **Custom domain**, type exactly:  
   `reva.saisanithreddy.online`  
2. Click **Save**  
3. GitHub may show “DNS check in progress” or “unsuccessful” until Part 2 is done — that is normal.

### 1.5 CNAME file in the repo (already set)

This repo contains a file named `CNAME` with one line:

```
reva.saisanithreddy.online
```

After you push, GitHub uses it automatically. It must **match** what you typed in Pages settings (same spelling, no `https://`, no trailing `/`).

### 1.6 Enforce HTTPS (only after DNS is OK)

When the DNS check turns **green / verified**:

- Tick **Enforce HTTPS**

If the checkbox is greyed out, wait up to 24 hours after DNS propagates.

---

# Part 2 — DNS at your domain provider (fixes “unsuccessful”)

Log in where you manage **saisanithreddy.online** (GoDaddy, Namecheap, Cloudflare, Hostinger, Google Domains, etc.).

### 2.1 Do NOT change root records for your main site

Leave these alone (they keep your portfolio working):

- Records for `@` / `saisanithreddy.online`  
- Records for `www` if you use them  

You are only **adding** a record for **reva**.

### 2.2 Add ONE CNAME record for the subdomain

| Field | Value |
|--------|--------|
| **Type** | `CNAME` |
| **Name / Host / Subdomain** | `reva` |
| **Target / Points to / Value** | `sanithreddy06.github.io` |
| **TTL** | Automatic or `3600` (1 hour) |

Important:

- Target is `sanithreddy06.github.io` — **not** `github.com`, **not** `/reva_survival`, **not** your repo URL.  
- Some panels want only `reva` as the name; others want `reva.saisanithreddy.online` — both usually work.

### 2.3 Delete conflicting records for `reva`

If anything already exists for **reva**, remove it first:

- Old **A** record for `reva`  
- Old **CNAME** pointing somewhere else  

You cannot have both A and CNAME for the same host in most setups.

### 2.4 Cloudflare users (common fix)

If the domain uses **Cloudflare**:

1. DNS → find the `reva` CNAME  
2. Set proxy status to **DNS only** (grey cloud), **not** proxied (orange cloud)  
3. Orange cloud often causes GitHub “DNS check unsuccessful” until you turn it off  

After GitHub verifies, you can try enabling proxy again (HTTPS may need extra config).

### 2.5 Save and wait

- Save DNS changes  
- Propagation: **15 minutes – 4 hours** typical (up to 24–48 hours max)  

### 2.6 Verify DNS yourself (optional)

On Windows PowerShell:

```powershell
nslookup reva.saisanithreddy.online
```

You should see it alias or point toward GitHub (`github.io`). If it shows your old host or “can’t find”, wait longer or fix the CNAME.

Online tool: https://dnschecker.org — search `reva.saisanithreddy.online`, type **CNAME**.

---

# Part 3 — Confirm on GitHub

1. Repo → **Settings** → **Pages**  
2. **Custom domain** should show `reva.saisanithreddy.online`  
3. When DNS is correct, the warning disappears and you’ll see something like “Your site is live at …”  
4. Enable **Enforce HTTPS**  

Open: **https://reva.saisanithreddy.online**

---

# Troubleshooting

| Problem | Fix |
|--------|-----|
| DNS check still unsuccessful after 1 hour | Confirm CNAME `reva` → `sanithreddy06.github.io`; remove A record on `reva`; Cloudflare → grey cloud |
| Main site broke | You changed `@` records — revert them; only add `reva` CNAME |
| GitHub shows site but subdomain doesn’t | Wait for DNS; clear browser cache; try incognito |
| `github.io/reva_survival` works but subdomain doesn’t | DNS only issue — repeat Part 2 |
| Certificate / HTTPS not ready | Wait 24h after DNS verified, then Enforce HTTPS |
| Custom domain keeps resetting | Don’t edit `CNAME` file to a different domain without updating Pages settings |

---

# Part 4 — Optional: link from main portfolio

On your main site (`saisanithreddy.online`), add a button:

```html
<a href="https://reva.saisanithreddy.online">REVA Survival Toolkit</a>
```

---

# Quick checklist

- [ ] Pages: branch `main`, folder `/ (root)`  
- [ ] Pages custom domain: `reva.saisanithreddy.online` (not root domain)  
- [ ] Repo `CNAME` file matches subdomain  
- [ ] DNS: CNAME `reva` → `sanithreddy06.github.io`  
- [ ] No conflicting `reva` A record  
- [ ] Cloudflare: grey cloud on `reva` CNAME  
- [ ] `https://reva.saisanithreddy.online` loads REVA  
- [ ] `https://saisanithreddy.online` still shows main project  

---

## Want a different subdomain?

Examples: `survival.saisanithreddy.online`, `toolkit.saisanithreddy.online`

1. Change the `CNAME` file in this repo to that full hostname  
2. Use the same name in GitHub Pages → Custom domain  
3. DNS CNAME: that subdomain label → `sanithreddy06.github.io`  
4. Commit and push  
