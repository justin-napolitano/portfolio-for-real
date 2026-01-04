---
slug: github-blog-jnapolitano-io
id: github-blog-jnapolitano-io
title: Building a Personal Blog with Gatsby and Jupyter Notebooks
repo: justin-napolitano/blog.jnapolitano.io
githubUrl: 'https://github.com/justin-napolitano/blog.jnapolitano.io'
generatedAt: '2025-11-24T21:34:05.986Z'
source: github-auto
summary: >-
  Explore how to create a personal blogging platform using Gatsby, featuring
  Jupyter Notebook integration and automated deployment.
tags:
  - gatsby
  - jupyter
  - static site generation
  - react
  - python
  - blogging
  - npm
  - emotion
  - mdx
seoPrimaryKeyword: gatsby blogging platform
seoSecondaryKeywords:
  - jupyter notebook integration
  - static site generation
  - build automation
  - responsive design
  - gatsby plugins
seoOptimized: true
topicFamily: static
topicFamilyConfidence: 0.9
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

blog.jnapolitano.io is a personal blogging platform built with Gatsby, leveraging the official Gatsby blog theme to present well-researched publications. It integrates Jupyter Notebook rendering to support advanced content formats.

---

## Features

- Static site generation using Gatsby for fast performance.
- Official Gatsby blog theme for streamlined content management.
- Support for Markdown and MDX posts, including embedded Jupyter Notebooks via `gatsby-transformer-ipynb`.
- Responsive iframe embedding for notebooks and other external content.
- Site metadata configuration with author and social links.
- Automated build and deployment pipeline using Python scripts.

---

## Tech Stack

- **Framework:** Gatsby (React-based static site generator)
- **Languages:** JavaScript (React), Python (build automation), HTML
- **Styling:** Emotion, Styled Components, Theme UI
- **Plugins:**
  - `gatsby-theme-blog`
  - `gatsby-transformer-ipynb` for Jupyter Notebook integration
  - `gatsby-transformer-remark` with responsive iframe support
  - `gatsby-plugin-manifest` for PWA features
- **Build tooling:** Node.js, npm

---

## Getting Started

### Prerequisites

- Node.js (v14 or newer recommended)
- npm (bundled with Node.js)
- Python 3.x (for build automation scripts)

### Installation

Clone the repository:

```bash
git clone https://github.com/justin-napolitano/blog.jnapolitano.io.git
cd blog.jnapolitano.io
```

Install dependencies:

```bash
npm install
```

### Running the Development Server

Start the Gatsby development server:

```bash
npm run develop
```

Open your browser and navigate to [http://localhost:8000](http://localhost:8000) to view the site.

### Building for Production

To create a production build:

```bash
npm run build
```

Alternatively, use the included Python script `python-build.py` to automate cleaning, building, committing, and pushing the build.

---

## Project Structure

- `content/` — Markdown and MDX posts, including Jupyter Notebook content.
- `src/` — Source code for React components and theme customization.
- `static/` — Static assets such as images and favicons.
- `gatsby-config.js` — Gatsby site configuration including plugins and site metadata.
- `package.json` and `package-lock.json` — Node.js dependencies and scripts.
- `python-build.py` — Python script automating build and deployment tasks.
- `README.md` — Project documentation.

---

## Future Work / Roadmap

- Enhance build automation with error handling and logging.
- Expand support for additional content types and interactive elements.
- Improve responsive design and accessibility.
- Integrate continuous deployment pipelines.
- Refine theme customization and styling options.


