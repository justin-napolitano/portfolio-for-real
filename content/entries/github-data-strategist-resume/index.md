---
slug: github-data-strategist-resume
id: github-data-strategist-resume
title: LaTeX Resume Builder with Custom Document Classes
repo: justin-napolitano/data-strategist-resume
githubUrl: 'https://github.com/justin-napolitano/data-strategist-resume'
generatedAt: '2025-11-24T21:34:32.303Z'
source: github-auto
summary: >-
  A LaTeX-based project for creating professional resumes and cover letters with
  custom classes and advanced features.
tags:
  - latex
  - resume
  - cover-letter
  - tikz
  - tcolorbox
  - fontawesome
  - academicons
seoPrimaryKeyword: latex resume builder
seoSecondaryKeywords:
  - custom latex classes
  - resume pdf generation
  - cover letter templates
  - tikz graphics in latex
  - latex document formatting
seoOptimized: true
topicFamily: latex
topicFamilyConfidence: 0.9
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

A LaTeX-based repository containing custom document classes and source files for creating professional resumes and cover letters. This project leverages tailored LaTeX classes to generate consistent, high-quality PDF outputs for resumes and related documents.

## Features

- Custom LaTeX classes (`my-resume.cls`, `bf-class.cls`, `cover-letter-class.cls`, `testing-class.cls`) designed to format resumes and cover letters.
- Support for single-sided and double-sided document layouts.
- Integration with TikZ and tcolorbox for advanced graphical elements.
- Use of fontawesome and academicons for iconography.
- Multiple sample documents including resumes, cover letters, and related PDFs.

## Tech Stack

- LaTeX (LaTeX2e)
- TikZ graphics library
- tcolorbox package
- fontawesome and academicons icon sets
- scrartcl document class (KOMA-Script)

## Getting Started

### Prerequisites

Ensure you have a LaTeX distribution installed (e.g., TeX Live, MiKTeX) with support for the required packages.

### Build Instructions

To compile the resume or cover letter PDFs, run the following commands in the project directory:

```bash
pdflatex resume.tex
pdflatex cover-letter.tex
pdflatex bf.tex
```

Repeat compilation if necessary to resolve references.

## Project Structure

- `*.cls` — Custom LaTeX class files defining document styles and formatting.
- `*.tex` — LaTeX source files for resumes and cover letters.
- `*.pdf` — Compiled PDF outputs.
- `*.log`, `*.aux`, `*.out` — Auxiliary files generated during compilation.
- `head_shot.jpeg`, `headshot_best.jpeg` — Image assets likely used in documents.
- `index.html` — Possibly a static webpage related to the project.
- `harris-stuff.txt` — Miscellaneous notes or references.
- `CNAME` — Custom domain configuration file for GitHub Pages.

## Future Work / Roadmap

- Add detailed documentation for each custom class and usage examples.
- Automate build process with a Makefile or build script.
- Expand icon and styling options for more resume variations.
- Integrate continuous integration to automatically build and deploy PDFs.
- Provide templates for other professional documents beyond resumes and cover letters.

---

*Note: This README is based on available files and inferred project purpose.*

