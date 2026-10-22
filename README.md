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

## Deploy on Render

The `render.yaml` file describes a Render static site. It builds the site into a clean `dist` folder, so Git files and project documentation are not included in the published website. There are no runtime requirements, secrets, or payment credentials to configure.

1. Sign in to [Render](https://dashboard.render.com/) using your GitHub account and authorize access to this repository.
2. In the Render dashboard, choose **New → Blueprint**.
3. Select the `Bigdreams15/TSHIAMO-S-ICE-CREAM-WORLD` repository and its `main` branch.
4. Review the service described by `render.yaml`, then choose **Apply** to create the static site.
5. When its first deployment succeeds, open the `.onrender.com` URL shown on the Render service page. Future pushes to `main` automatically trigger a redeploy.

GitHub Pages remains enabled separately; deploying to Render does not change or turn it off. Render and GitHub Pages will have separate website addresses.

## Save and push changes

Open the VS Code terminal in this project folder. Check which files changed:

```powershell
git status
```

This folder is already connected to the `main` branch of the GitHub repository. Save the Render configuration and updated instructions, then publish them:

```powershell
git add render.yaml README.md
git commit -m "Prepare static site for Render deployment"
git push
```

These commands do not include passwords or access tokens. If GitHub asks you to sign in, follow its official browser-based sign-in flow; never paste a password or token into chat or website source files.
