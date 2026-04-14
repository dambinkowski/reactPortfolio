## React Portfolio

This repository now includes a static GitHub Pages portfolio layer on top of the project folders.

### Structure

- `index.html` is the landing page.
- `styles.css` contains the shared portfolio styles.
- Each `projectX/index.html` file is a project detail page.
- `.nojekyll` keeps GitHub Pages from altering the static site behavior.

### Publish With GitHub Pages

1. Push this repository to GitHub.
2. Open the repository settings.
3. Under Pages, set the source to deploy from the `main` branch and the repository root.
4. GitHub Pages will serve `index.html` automatically.

### Local Preview

Open `index.html` directly in a browser, or run a simple static file server such as:

```bash
npx http-server -c-1
```

### Adding More Projects Later

- Add a new project folder.
- Create or update that folder's `index.html` page.
- Add a new card on the landing page that links to it.
