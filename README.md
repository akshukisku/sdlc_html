# SDLC HTML Project

A multi-page website built with **HTML5** and **Tailwind CSS v4**. This project uses the Tailwind CSS CLI to compile source CSS into a generated stylesheet.

## 📁 Project Structure

```text
sdlc_html/
├── images/                 # Website images and logos
│   ├── navlogo.png
│   ├── banner-img.png
│   └── about-img.png
│
├── pages/                  # Additional HTML pages
│   ├── about.html
│   ├── services.html
│   ├── contact.html
│   └── blog.html
│
├── src/
│   └── input.css           # Tailwind CSS source file
│
├── dist/
│   └── output.css          # Generated CSS (not committed to Git)
│
├── index.html              # Homepage
├── package.json            # Project configuration and scripts
├── package-lock.json       # Dependency lock file
├── .gitignore              # Git ignored files
└── README.md               # Project documentation
```

> **Note:** `node_modules/` is created automatically after installing dependencies. The `dist/` directory is generated when you run the Tailwind CSS build command.

## 🛠️ Technologies Used

- HTML5
- Tailwind CSS v4
- Node.js and npm
- Tailwind CSS CLI

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd sdlc_html
```

Replace `<YOUR_REPOSITORY_URL>` with your GitHub repository URL.

### 2. Install dependencies

```bash
npm install
```

If the Tailwind CSS CLI is not already installed, install it with:

```bash
npm install -D tailwindcss @tailwindcss/cli
```

### 3. Configure Tailwind CSS

Open `src/input.css` and add:

```css
@import "tailwindcss";

/* Scan the HTML files for Tailwind classes */
@source "../index.html";
@source "../pages";
```

The `@source` directives explicitly register the root homepage and the additional HTML pages.

### 4. Build the CSS

Run this command from the project root:

```bash
npm run build
```

The build script should be configured in `package.json` as follows:

```json
{
  "scripts": {
    "build": "npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch"
  }
}
```

This command:

- Reads Tailwind CSS from `src/input.css`.
- Scans the registered HTML files for utility classes.
- Generates `dist/output.css`.
- Watches for changes and recompiles automatically.

Keep the terminal running while developing.

## 🔗 Linking the Compiled CSS

Because the HTML files are in different directories, use the correct relative path to the generated CSS file.

### Homepage — `index.html`

Add this inside the `<head>` section:

```html
<link rel="stylesheet" href="./dist/output.css" />
```

### Other pages — `pages/about.html`

Use `../` to move up one directory:

```html
<link rel="stylesheet" href="../dist/output.css" />
```

Use the same path in `services.html`, `contact.html`, and `blog.html` because they are also inside the `pages/` directory.

## 🖼️ Linking Images

### In `index.html`

```html
<img src="./images/banner-img.png" alt="Website banner" />
```

### In `pages/about.html`

```html
<img src="../images/about-img.png" alt="About us" />
```

## 💻 Example HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SDLC HTML Project</title>
    <link rel="stylesheet" href="./dist/output.css" />
  </head>
  <body class="bg-gray-100 text-gray-900">
    <main class="mx-auto max-w-5xl p-8">
      <h1 class="text-4xl font-bold text-blue-600">
        Welcome to My Website
      </h1>
      <p class="mt-4 text-lg">
        Built with HTML and Tailwind CSS v4.
      </p>
    </main>
  </body>
</html>
```

## 🙈 Git Ignore Configuration

Add the following to `.gitignore`:

```gitignore
node_modules/
dist/
.DS_Store
.env
```

### Why ignore `dist/`?

The `dist/` directory contains generated CSS. Ignoring it keeps generated build output out of version control.

After cloning the repository, run:

```bash
npm install
npm run build
```

This regenerates `dist/output.css` locally.

**Important:** If you deploy this project, configure your hosting service to run the build command before serving the website. Otherwise, the linked CSS file may be missing.

## 📌 Useful Git & npm Commands

### npm Commands

| Command | Purpose |
|---|---|
| `npm install` | Install project dependencies |
| `npm run build` | Compile Tailwind CSS and watch for changes |

### Git Branch Commands

| Command | Purpose |
|---|---|
| `git status` | Check modified and untracked files |
| `git branch` | List local branches and identify the current branch |
| `git branch -a` | List local and remote branches |
| `git switch main` | Switch to the main branch |
| `git pull origin main` | Pull the latest changes from the main branch |
| `git switch -c feature/your-feature` | Create and switch to your own branch |
| `git branch` | Verify your current branch |

### Commit and Push Commands

| Command | Purpose |
|---|---|
| `git status` | Review changes before committing |
| `git add .` | Stage changes |
| `git commit -m "Update README"` | Commit staged changes |
| `git push -u origin feature/your-feature` | Push your branch to GitHub |
| `git push` | Push subsequent commits to the configured remote branch |
| `git log --oneline -5` | View the latest five commits |

### Recommended Git Workflow

Follow these steps before pushing your code to GitHub.

**1. Check your current branch**

```bash
git branch
git status
```

**2. Switch to the main branch and update it**

```bash
git switch main
git pull origin main
```

**3. Create your own branch**

```bash
git switch -c feature/your-feature
```

Replace `your-feature` with a descriptive name, such as `feature/homepage` or `docs/update-readme`.

**4. Stage and commit your changes**

```bash
git add .
git commit -m "Add project documentation"
```

**5. Push your branch to GitHub**

```bash
git push -u origin feature/your-feature
```

**6. Verify your branch and working tree**

```bash
git branch
git status
```

After pushing, open your GitHub repository and create a Pull Request if you want to merge your branch into `main`.

> **Important:** If your repository uses `master` instead of `main`, replace `main` with `master`. Always check your repository's branch names before running branch-specific commands.
