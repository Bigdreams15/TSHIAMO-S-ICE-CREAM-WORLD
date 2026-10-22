# TSHIAMO’S ICE CREAM WORLD

A responsive, no-build website made with HTML, CSS and plain JavaScript. It has a sample menu, category filters and search, product details, and a browser-saved shopping bag. No framework, package installation, or API key is needed.

## Run the website

1. Open this folder in Visual Studio Code.
2. Open `index.html` in a browser. For a more reliable local preview, install the **Live Server** extension in VS Code, right-click `index.html`, and choose **Open with Live Server**.
3. The shopping bag is saved in the same browser using local storage. It is only a local preview; it is not an online ordering system.

## Before accepting real customers

- Replace the clearly marked phone, email, address, and hours in `index.html` with verified business details. The site deliberately does not invent them.
- Product names, descriptions, images, and ZAR prices in `app.js` are sample menu content. Confirm everything with the business before publishing.
- Product photos are loaded from Unsplash, and the fonts are loaded from Google Fonts; an internet connection is needed for those assets.
- The contact form, newsletter, and order enquiry are front-end demonstrations only. They do not transmit or store submitted details. Connect a trusted form/order service before collecting customer information.
- No order is placed and no payment is taken. Connect a secure backend and payment provider before enabling commercial checkout. Do not put secret keys in browser code.

## Publish with GitHub Pages

This is a static site and does not need a server-side runtime. After adding the files to your GitHub repository, open the repository on GitHub and:

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the `main` branch and the `/ (root)` folder, then click **Save**.
4. Wait for the Pages deployment to finish. The site address appears in **Settings → Pages**.

## Save and push changes safely

Install Git for Windows if `git` is not recognized in the VS Code terminal. From this project folder, check the connection before adding or pushing anything:

```powershell
git status
git remote -v
```

The local project folder and the GitHub repository are currently empty and not connected. If `git status` says **not a git repository**, initialize this folder once:

```powershell
git init -b main
```

If `git status` already shows a branch, do not initialize again. Check `git remote -v`; if it shows no `origin`, connect the existing, empty GitHub repository:

```powershell
git remote add origin https://github.com/Bigdreams15/TSHIAMO-S-ICE-CREAM-WORLD.git
```

Then save and publish your changes:

```powershell
git add index.html styles.css app.js README.md
git commit -m "Build Tshiamo's Ice Cream World website"
git push -u origin main
```

Because the GitHub repository is currently empty, this first push will publish your new local `main` branch. If Git says the current branch is not `main`, check `git branch --show-current` and use that branch name instead. If the remote is no longer empty when you do this, stop and review `git status` and `git log --oneline --all` before pushing; do not force-push.

These commands do not include passwords or access tokens. If GitHub prompts you to authenticate, follow its official browser-based sign-in flow; never paste a password or token into chat or website source files.
