---
slug: github-tech-resume
title: Custom LaTeX Resume Template with Build Automation and Modular Design
repo: justin-napolitano/tech-resume
githubUrl: 'https://github.com/justin-napolitano/tech-resume'
generatedAt: '2025-11-23T09:46:37.514217Z'
source: github-auto
summary: >-
  Description of a LaTeX resume template built as a custom class with XeLaTeX
  support, Python build automation, and modular project organization.
tags:
  - latex
  - resume-template
  - xelatex
  - python-build
  - build-automation
  - modular-design
seoPrimaryKeyword: latex resume template
seoSecondaryKeywords:
  - xelatex
  - build automation
  - python build script
  - modular project organization
seoOptimized: true
topicFamily: latex
topicFamilyConfidence: 0.95
topicFamilyNotes: >-
  The blog focuses on a custom LaTeX resume template with modular design and
  build automation, explicitly mentioning a LaTeX class, XeLaTeX, and build
  scripts. The 'latex' family description and tags align closely with resume
  templates and LaTeX document automation. While build automation is part of the
  post, it primarily supports the LaTeX resume project, so 'latex' is the best
  fit.
id: github-tech-resume
githubContentSha: 9be7eaec7fb09c8905c910fc00955d688ebf4d3f
---

# Technical Overview of the my-resume LaTeX Template

This project delivers a LaTeX-based resume template implemented as a custom class (`my-resume.cls`). The primary motivation is to provide a customizable and maintainable resume format that leverages LaTeX's typesetting capabilities, specifically using XeLaTeX for enhanced font and graphics support.

## Motivation and Problem Statement

Creating professional resumes often involves balancing aesthetics with maintainability. Existing templates can be rigid or overly complex. This project addresses the need for a modular, flexible template that can be easily adapted while producing clean, professional output.

## Architecture and Implementation

### LaTeX Class

At the core is `my-resume.cls`, a custom LaTeX class built on top of the `scrartcl` class from the KOMA-Script bundle. It introduces options for single-sided or double-sided layouts, affecting the placement of a highlight bar. The class loads essential packages such as `tikz` for graphics, `tcolorbox` for enhanced box styling, and icon packages (`fontawesome`, `academicons`) for visual embellishments.

The class uses boolean options to toggle layout modes, influencing page style and highlight bar positioning. This design choice enables consistent styling across the document while allowing user control.

### Build Automation

The repository includes a Python script (`python-build.py`) that automates dependency installation and build steps. It runs shell commands to clean previous builds (`make clean`) and generate HTML output (`make html`), suggesting the presence of a Makefile that orchestrates LaTeX compilation and possibly other tasks.

The script captures and prints subprocess output for transparency during builds. It also appears to include timestamping and git commands for committing and pushing changes, indicating an integrated deployment or versioning workflow.

### Project Organization

Content is modularized into sections stored in the `sections` directory, facilitating incremental editing and reuse. Image assets like headshots and illustrative pictures are included for visual customization.

The repository contains multiple example PDFs and PNGs demonstrating different page styles and layout options, serving as practical references.

## Practical Considerations

- The template requires XeLaTeX due to its font and graphics dependencies.
- Users should install Python dependencies from `requirements.txt` to enable the build script.
- The build pipeline relies on standard tools (`make`, `xelatex`, `git`) to streamline compilation and version control.

## Summary

This project exemplifies a pragmatic approach to resume creation using LaTeX, balancing customization with automation. The custom class abstracts layout complexity, while the Python build script integrates dependency management and build orchestration. The modular structure supports maintainability and scalability.

Returning to this project, one should first ensure the build environment is configured with XeLaTeX, Python packages, and make utilities. Understanding the class options and build script flow will expedite modifications and extensions.


