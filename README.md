# Mon's Graduation Gift 🎓

A beautiful, mobile-first graduation keepsake that works as a free static GitHub Pages site.

## Edit her name, the messages and photo paths

Open [content.js](content.js) in this repository, click the pencil icon, and replace `name: "Her Name"` with her name. You can also update `graduationYear`, the `chapters` text, `letter` paragraphs, and `signOff`. Choose **Commit changes** when finished.

## Add her actual photos

In the [assets](assets) folder, click **Add file → Upload files** and upload your photos. Then update each path in `content.js` with the exact filename. The existing placeholder illustrations remain until you replace their paths.

Photo keys:
- `baby`: baby picture.
- `school`: school picture.
- `universityOne` and `universityTwo`: university pictures.
- `graduation`: graduation portrait.
- `graduationDay`: **leave as `assets/graduation-day.jpg`**.

### On graduation day — the QR code does not change

Upload her new photo to `assets/graduation-day.jpg` (exact spelling/case) and commit. The waiting placeholder will automatically turn into her actual graduation-day photo at the **same URL**. You may need to refresh the browser to see a freshly uploaded photo. If replacing an existing image at the same filename, a hard refresh helps with caching.

## Publish with free GitHub Pages

In the repository go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, and click **Save**. The URL will be:

https://trybutter69.github.io/Mon-s-Grad/

Open that address on your phone to preview. Once it looks right and the address works, generate a QR code for **that exact URL** and print it on the acrylic gift. Do not change the repository name after printing unless you configure a redirect.

## Website files

- `index.html` — story layout and headings
- `styles.css` — responsive design, typography and animation
- `content.js` — all editable names, text and photo paths
- `script.js` — scroll effects, confetti and graduation-day photo reveal
- `assets/` — placeholders and your eventual photos

No paid server, database, custom domain, package installation or build step is required.

**Privacy note:** GitHub Pages and the source repository are public. Upload only photos and personal messages that she would be comfortable sharing publicly.