---
slug: github-cost-of-living-projections
id: github-cost-of-living-projections
title: Cost of Living Projections with Monte Carlo Simulations
repo: justin-napolitano/cost-of-living-projections
githubUrl: 'https://github.com/justin-napolitano/cost-of-living-projections'
generatedAt: '2025-11-24T21:34:18.276Z'
source: github-auto
summary: >-
  Explore Monte Carlo simulations for projecting living expenses and CO2
  shipping costs in major US cities with Jupyter notebooks.
tags:
  - python
  - cost-of-living
seoPrimaryKeyword: cost of living projections
seoSecondaryKeywords:
  - monte carlo simulation
  - jupyter notebook tutorial
  - python data analysis
  - shipping cost projections
  - reproducible research
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

This repository contains Monte Carlo simulation models that project costs related to living expenses in major US cities and the annual economic cost of shipping carbon dioxide from Europe to US ports. It includes Jupyter notebooks, markdown reports, and supporting data files for reproducible analysis.

---

## Features

- Monte Carlo simulations for cost of living projections in Houston and New York City.
- Monte Carlo modeling of the annual cost of shipping supercritical CO2 across the Atlantic.
- Transparent, reproducible computational notebooks combining data analysis and domain-specific modeling.
- Markdown reports documenting methodology, findings, and revisions.

---

## Tech Stack

- Python 3 (Jupyter Notebooks)
- NumPy (for statistical sampling and distributions)
- Markdown for documentation

---

## Getting Started

### Prerequisites

Ensure Python 3 and Jupyter Notebook are installed. Recommended to use a virtual environment.

### Installation

```bash
# Clone the repository
$ git clone https://github.com/justin-napolitano/cost-of-living-projections.git
$ cd cost-of-living-projections

# (Optional) Create and activate a virtual environment
$ python3 -m venv venv
$ source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
$ pip install numpy jupyter
```

### Running the Notebooks

Launch Jupyter Notebook:

```bash
$ jupyter notebook
```

Open and run the following notebooks:
- `cost_of_living_monte_carlo.ipynb` — Monte Carlo models for Houston and NYC cost of living.
- `shipping_projections.ipynb` — Monte Carlo simulation of CO2 shipping costs.
- `carbon-storage-projects.ipynb` — Related analysis on carbon storage projects.
- `europe_ports.ipynb` — Data and analysis related to European ports.

---

## Project Structure

```
├── carbon-storage-projects.ipynb       # Analysis of carbon storage projects
├── cost_of_living_monte_carlo.ipynb     # Monte Carlo models for cost of living
├── cost_of_living_monte_carlo.md         # Markdown report on cost of living projections
├── cost_of_living_monte_carlo_files/     # Supporting files for cost of living notebooks
├── europe_ports.ipynb                     # Data and analysis related to European ports
├── histogram.png                         # Visualization image
├── nyc-housing.csv                       # NYC housing data
├── README.md                            # This file
├── shipping_carbon_feasibility.md       # Feasibility analysis of shipping carbon
├── shipping_carbon_feasibility_files/   # Supporting files for feasibility report
├── shipping_projections.ipynb           # Monte Carlo simulation of shipping costs
├── shipping_projections.md               # Markdown report on shipping projections
├── shipping_projections_files/           # Supporting files for shipping projections
```

---

## Future Work / Roadmap

- Update cost of living data, particularly for Houston, with more recent and granular data sources.
- Refine Monte Carlo models with improved input distributions based on newly scraped or acquired data.
- Extend shipping cost models to incorporate more detailed infrastructure and operational variables.
- Automate data scraping and preprocessing to maintain up-to-date projections.
- Enhance documentation and add more comprehensive tests for reproducibility.


