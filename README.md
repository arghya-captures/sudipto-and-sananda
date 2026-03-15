# Wedding Gallery

This is a simple, responsive static gallery you can host with GitHub Pages.

Files:
- `index.html` — main gallery page
- `styles.css` — site styles
- `script.js` — lightbox/modal logic
- `images/` — place your photos here


## Quick preview locally

```bash
cd /Users/arghya/Documents/Wedding
# Whenever you add/remove images, run:
python3 generate_images_json.py
# Then preview:
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

## Deploy to GitHub Pages

1. Create a repository on GitHub (or use the `gh` CLI):

```bash
git init
git add .
git commit -m "Add wedding gallery"
git branch -M main
# replace with your repo URL
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. In the repository's GitHub settings, go to **Pages** and set the source to the `main` branch and the `/ (root)` folder. Save.

Alternative: use `gh repo create --public --source=. --remote=origin --push` if you have the GitHub CLI.

## How to add your photos
- Put image files (jpg, png, webp, svg, gif) into the `images/` folder.
- Run `python3 generate_images_json.py` to update `images.json` (required for the gallery to show new images).
- No need to edit HTML or JS!

**Note:** Filenames are used directly in the gallery; keep them short and URL-safe. For many photos, consider generating thumbnails (smaller images) to speed up load.
# sudipto-and-sananda
