---
slug: github-lecture-julia-notebooks
id: github-lecture-julia-notebooks
title: Jupyter Notebooks for Quantitative Economics with Julia
repo: justin-napolitano/lecture-julia.notebooks
githubUrl: 'https://github.com/justin-napolitano/lecture-julia.notebooks'
generatedAt: '2025-11-24T21:35:25.040Z'
source: github-auto
summary: >-
  Explore Jupyter notebooks for quantitative economic modeling using Julia,
  featuring dynamic programming and time series analysis.
tags:
  - julia
  - jupyter
  - quantitative economics
  - dynamic programming
  - time series
  - Binder
  - QuantEcon
seoPrimaryKeyword: jupyter notebooks quantitative economics
seoSecondaryKeywords:
  - julia programming language
  - interactive notebooks
  - quantitative modeling
  - JupyterLab setup
  - cloud-based notebooks
seoOptimized: true
topicFamily: datascience
topicFamilyConfidence: 0.9
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/QuantEcon/lecture-julia.notebooks/main)

This repository contains Jupyter notebooks used for quantitative economic modeling lectures, leveraging the Julia programming language. It serves as a companion resource to the online lectures hosted at [julia.quantecon.org](https://julia.quantecon.org).

## Features

- Collection of interactive Jupyter notebooks covering quantitative economics topics
- Organized content on dynamic programming, continuous time models, multi-agent models, and time series
- Integration with Julia's package ecosystem for numerical computing and optimization
- Ready-to-run notebooks via Binder for immediate exploration without local setup

## Tech Stack

- Julia programming language
- Jupyter Notebook format for interactive content
- QuantEcon Julia packages and related Julia ecosystem libraries

## Getting Started

### Prerequisites

- Julia (version 1.6 or later recommended)
- Jupyter Notebook or JupyterLab

### Installation

Clone the repository:

```bash
git clone https://github.com/justin-napolitano/lecture-julia.notebooks.git
cd lecture-julia.notebooks
```

Install dependencies using Julia's package manager:

```julia
using Pkg
Pkg.activate(".")
Pkg.instantiate()
```

### Running Notebooks

Launch Jupyter Notebook or JupyterLab from the repository root:

```bash
jupyter notebook
```

or

```bash
jupyter lab
```

Open any notebook (`*.ipynb`) to start exploring.

Alternatively, use Binder to run notebooks in a cloud environment without local setup: click the Binder badge above.

## Project Structure

- `about_lectures.ipynb` — Overview and context for the lecture series
- `intro.ipynb` — Introduction to quantitative economics with Julia
- `status.ipynb`, `troubleshooting.ipynb`, `zreferences.ipynb` — Support and reference materials
- `continuous_time/` — Notebooks covering continuous time economic models
- `dynamic_programming/` and `dynamic_programming_squared/` — Dynamic programming methods and applications
- `getting_started_julia/` — Julia language fundamentals and setup
- `more_julia/` — Advanced Julia programming topics and packages
- `multi_agent_models/` — Models involving multiple interacting agents
- `problems/` — Exercises and problem sets
- `software_engineering/` — Tools and practices for software development in Julia
- `time_series_models/` — Time series analysis and modeling
- `tools_and_techniques/` — Supplementary computational techniques
- `Manifest.toml`, `Project.toml` — Julia package environment files
- `README.md` — This file

## Future Work / Roadmap

- Expand notebook coverage to include more advanced quantitative methods
- Update content to align with latest Julia language features and package versions
- Improve integration with online lecture materials and interactive platforms
- Add automated testing and continuous integration for notebooks
- Enhance documentation and examples for software engineering practices

---

This repository assumes familiarity with Julia and quantitative economics. For a full learning experience, consult the lectures at [julia.quantecon.org](https://julia.quantecon.org).

