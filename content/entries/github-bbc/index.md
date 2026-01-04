---
slug: github-bbc
id: github-bbc
title: Personal Notebook and Blogging Platform with Hugo
repo: justin-napolitano/bbc
githubUrl: 'https://github.com/justin-napolitano/bbc'
generatedAt: '2025-11-24T21:34:02.727Z'
source: github-auto
summary: >-
  Explore a minimalist blogging platform built with Hugo, featuring dark mode,
  multilingual support, and various integrations.
tags:
  - hugo
  - anubis theme
  - static site generator
  - google analytics
  - disqus
  - css
  - javascript
  - multilingual support
  - anubis
  - blogging
  - responsive design
seoPrimaryKeyword: hugo blogging platform
seoSecondaryKeywords:
  - minimalist blog
  - dark mode support
  - comment system integration
  - SEO optimization
  - personal notebook
  - project roadmap
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

A personal notebook and blogging platform built with Hugo and the Anubis theme. It offers a minimalist and responsive design tailored for capturing ideas, reflections, and personal articles efficiently.

---

## Features

- Minimalist, responsive design using the Anubis Hugo theme
- Dark mode support with automatic and manual toggling
- Pagination and archive support for posts
- Taxonomies: categories, tags, and series
- Social icons and RSS feed integration
- Multiple comment system support: Disqus, Isso, Utteranc.es
- Google Analytics integration
- Custom CSS and JavaScript support
- Multilingual support with translations
- Copy code button for code blocks
- Related posts display (Read Next section)
- Math typesetting support via KaTeX
- Hidden posts accessible only by direct link
- Webmentions and SEO optimizations

## Tech Stack

- Hugo (extended version) static site generator
- Anubis Hugo theme
- HTML, CSS, JavaScript
- Google Analytics for tracking
- Optional comment systems: Disqus, Isso, Utteranc.es

## Getting Started

### Prerequisites

- Install [Hugo extended version](https://gohugo.io/getting-started/installing/)
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/justin-napolitano/bbc.git
cd bbc
```

Add the Anubis theme as a git submodule:

```bash
git submodule add https://github.com/mitrichius/hugo-theme-anubis.git themes/anubis
```

### Running the site locally

```bash
hugo server -D
```

Visit `http://localhost:1313` in your browser to view the site.

### Building for production

```bash
hugo
```

The generated static site will be located in the `public/` directory.

## Project Structure

```
bbc/
├── archetypes/          # Content archetypes for new posts
├── assets/              # Asset files like CSS and JS
├── config.yaml          # Site configuration file
├── content/             # Markdown content files (posts, pages)
├── layouts/             # Hugo layout templates
├── public/              # Generated static site output
├── resources/           # Hugo resource files
├── static/              # Static files served as-is
├── themes/              # Hugo themes (Anubis as submodule)
├── README.md            # Project documentation
```

## Future Work / Roadmap

- Enhance multilingual support and translations
- Integrate additional comment system options
- Improve SEO and webmention features
- Add more customizable theme options
- Automate deployment workflows
- Expand documentation with usage examples and contribution guidelines

---

