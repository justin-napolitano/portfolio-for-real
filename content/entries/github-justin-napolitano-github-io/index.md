---
slug: github-justin-napolitano-github-io
id: github-justin-napolitano-github-io
title: Personal Website Source Code with Python and Sphinx
repo: justin-napolitano/justin-napolitano.github.io
githubUrl: 'https://github.com/justin-napolitano/justin-napolitano.github.io'
generatedAt: '2025-11-24T21:35:22.312Z'
source: github-auto
summary: >-
  Explore the source code for a personal website built with Python and Sphinx,
  featuring static site generation and documentation management.
tags:
  - python
  - sphinx
  - static site generation
  - documentation
  - makefile
  - docker
  - github pages
seoPrimaryKeyword: personal website source code
seoSecondaryKeywords:
  - sphinx documentation tools
  - static site tools
  - build automation
  - GitHub Pages deployment
  - portfolio showcase
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

This repository hosts the source code and content for my personal website, built primarily with Python and Sphinx documentation tools. It serves as a portfolio and project showcase platform.

## Features

- Static website generation using Sphinx
- Documentation and blog content management
- Integration with modern static site tools

## Tech Stack

- Python
- Sphinx documentation generator
- Makefile and batch scripts for build automation
- Docker (assumed for some project components based on content)

## Getting Started

### Prerequisites

- Python 3.x
- Sphinx (`pip install sphinx`)
- Make (or use `make.bat` on Windows)

### Installation and Build

Clone the repository:

```bash
git clone https://github.com/justin-napolitano/justin-napolitano.github.io.git
cd justin-napolitano.github.io
```

Build the documentation:

```bash
make html
```

On Windows, use:

```bat
make.bat html
```

The built site will be available in the `docs` directory.

## Project Structure

```
justin-napolitano.github.io/
├── content/          # Content files such as blog posts
├── docs/             # Built documentation output
├── source/           # Sphinx source files and configuration
├── Makefile          # Makefile for building the site
├── make.bat          # Windows batch file for build automation
├── README.md         # This file
```

## Future Work / Roadmap

- Expand content with more blog posts and projects
- Improve site styling and responsiveness
- Automate deployment to GitHub Pages
- Add more interactivity or dynamic content if needed

---

This site is a work in progress and serves as a personal portfolio and documentation hub.

