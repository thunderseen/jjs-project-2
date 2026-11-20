# Jayed Jaman Seen — Portfolio

A static portfolio site built with HTML, CSS, and vanilla JavaScript. No build step, package manager, server, or database is required.

## Host on GitHub Pages

1. Create a GitHub repository and add this folder's contents to its `main` branch.
2. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. Push to `main` (or manually run **Deploy portfolio to GitHub Pages** from the **Actions** tab). The workflow publishes the site and shows its URL in the deployment details.

The workflow deploys the repository root as-is; keep `index.html`, `style.css`, `app.js`, `portfolio-config.js`, `assets/`, and `demos/` in their current locations. If your default branch is not `main`, update the branch in `.github/workflows/deploy.yml`.

## Updating portfolio content

Edit `portfolio-config.js` and push the changes to `main` to publish them. The built-in admin panel can export an updated config file for you to replace this file with. The panel and its PIN run entirely in the browser, so they are not a secure private administration system; anything committed here is public.

This is a static site: it does not provide server-side processing, persistent admin edits, or a backend for forms. External fonts and animation libraries load from third-party CDNs and require an internet connection.

## Custom domain

Set up the domain in **Settings → Pages** after choosing a domain provider. GitHub Pages then provides the DNS records and HTTPS status for that domain; no domain is configured by this project.
