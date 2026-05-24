# Host REVA Survival at saisanithreddy.online (root domain)

Your site is static. Visiting `https://saisanithreddy.online` should serve `index.html` from this project at the **root** (not `/reva/`).

---

## Option 1 — GitHub Pages (recommended if code is on GitHub)

### Step 1: Push code to GitHub

```powershell
cd "d:\College notes and files\Projects\REVA_Survival"
git remote add origin https://github.com/YOUR_USERNAME/REVA-Survival.git
git push -u origin main
```

(Use `git remote set-url origin ...` if remote already exists.)

### Step 2: Enable GitHub Pages

1. Open your repo on GitHub → **Settings** → **Pages**
2. **Build and deployment** → Source: **Deploy from a branch**
3. Branch: **main** → Folder: **/ (root)** → **Save**
4. Under **Custom domain**, enter: `saisanithreddy.online` → **Save**
5. Wait until DNS check passes, then enable **Enforce HTTPS**

The `CNAME` file in this repo tells GitHub to use your domain.

### Step 3: DNS at your domain registrar

Where you bought `saisanithreddy.online` (GoDaddy, Namecheap, Cloudflare, etc.), set:

**For apex domain `saisanithreddy.online` (required):**

| Type | Name / Host | Value |
|------|-------------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**Optional — `www.saisanithreddy.online`:**

| Type | Name | Value |
|------|------|--------|
| CNAME | `www` | `YOUR_USERNAME.github.io` |

Remove old A/CNAME records that pointed to a previous host (old portfolio), or the domain will not show REVA.

DNS can take **15 minutes to 48 hours** to update.

---

## Option 2 — Netlify (drag & drop or Git)

1. [app.netlify.com](https://app.netlify.com) → **Add new site** → import Git repo **or** drag this folder.
2. **Site configuration** → **Domain management** → **Add a domain** → `saisanithreddy.online`
3. Netlify shows DNS records — add them at your registrar (often one A record or CNAME).
4. Enable HTTPS when offered.

No `CNAME` file needed for Netlify (you can delete it or leave it; GitHub Pages uses it).

---

## Option 3 — cPanel / Hostinger / shared hosting

1. Open **File Manager** → `public_html` (site root).
2. **Delete or backup** old `index.html` and folders if you had another site.
3. Upload **all** files from this project into `public_html`:
   - `index.html`, `*.html`, `styles.css`, `js/` folder, `CNAME` (optional on non-GitHub hosts)
4. Ensure `public_html/index.html` exists.
5. In hosting panel, set domain `saisanithreddy.online` to this account (usually already done).

---

## Checklist after deploy

- [ ] `https://saisanithreddy.online` opens the REVA home page
- [ ] Links work: Attendance, Cooked, Internals, etc.
- [ ] Browser padlock (HTTPS) works
- [ ] No 404 for `js/core.js` in DevTools → Network

---

## Important

- This project **replaces** whatever was at the root of `saisanithreddy.online` before.
- To keep an old portfolio **and** REVA, use a subfolder (`/reva/`) or subdomain (`reva.saisanithreddy.online`) instead — ask if you want that setup.
