---
slug: github-good-resume
id: github-good-resume
title: LaTeX Resume Template for Data Science and Tech Roles
repo: justin-napolitano/good-resume
githubUrl: 'https://github.com/justin-napolitano/good-resume'
generatedAt: '2025-11-24T21:34:59.630Z'
source: github-auto
summary: >-
  A customizable LaTeX resume template with a build pipeline for generating
  professional PDFs, tailored for data science and technical positions.
tags:
  - latex
  - python
  - resume template
  - build automation
  - make
  - data science
seoPrimaryKeyword: latex resume template
seoSecondaryKeywords:
  - customizable resume
  - pdf resume generation
  - resume build pipeline
  - data science resume
  - technical resume template
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

A LaTeX-based resume template designed for data science and technical roles. This repository contains a customizable resume format with modular content sections and a build pipeline to generate PDF resumes.

---

## Features

- Clean, professional resume template using LaTeX
- Modular content stored in separate section files for easy editing
- Custom styling handled by a dedicated LaTeX style file (`TLCresume.sty`)
- Python build script automates dependency installation and resume compilation
- PDF output included for quick reference

---

## Tech Stack

- LaTeX (primary language for resume formatting)
- Python (build automation script)
- Make (build automation)

---

## Getting Started

### Prerequisites

- LaTeX distribution installed (e.g., TeX Live, MiKTeX)
- Python 3.x
- `make` utility

### Installation and Build

1. Clone the repository:

   ```bash
   git clone https://github.com/justin-napolitano/good-resume.git
   cd good-resume
   ```

2. (Optional) Install Python dependencies if any are added later:

   ```bash
   pip install -r requirements.txt
   ```

3. Build the resume PDF using the Makefile:

   ```bash
   make clean
   make html
   ```

4. The generated PDF will be available as `resume.pdf`.

---

## Project Structure

```
/_header.tex           # Header file included in main LaTeX document
/deployz/             # Deployment scripts or related files (assumed)
/python-build.py      # Python script to automate build and deployment
/README.md            # This file
/resume.pdf           # Compiled resume output
/resume.tex           # Main LaTeX resume source file
/sections/            # Folder containing modular content sections
/TLCresume.sty        # Custom LaTeX style file for formatting
```

- The main LaTeX document (`resume.tex`) imports styling from `TLCresume.sty` and content from the `sections/` folder.
- Contact information and metadata are defined in `resume.tex`.
- The build process is automated via `python-build.py` and `make` commands.

---

## Future Work / Roadmap

- Add detailed documentation for customizing sections and styles
- Enhance build script to support other output formats (e.g., HTML)
- Integrate CI/CD pipeline for automatic PDF generation on commits
- Expand deployment scripts for hosting updated resumes online
- Include sample data and examples for faster onboarding


