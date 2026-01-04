---
slug: github-data-link
id: github-data-link
title: Download Data from Nasdaq Data Link API with Python
repo: justin-napolitano/data-link
githubUrl: 'https://github.com/justin-napolitano/data-link'
generatedAt: '2025-11-24T21:34:31.155Z'
source: github-auto
summary: >-
  A straightforward tool for fetching data from the Nasdaq Data Link API using
  Python and Jupyter Notebooks.
tags:
  - python
  - jupyter
  - nasdaq
seoPrimaryKeyword: nasdaq data link api python
seoSecondaryKeywords:
  - data fetching with python
  - jupyter notebooks for data analysis
  - nasdaq api usage
  - financial data extraction
  - freight rail data analysis
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

Tool to download data from the Nasdaq Data Link API, implemented primarily in Jupyter Notebooks and Python scripts.

---

## Features

- Simple interface to read API keys and fetch data from Nasdaq Data Link.
- Example usage with financial and freight rail datasets.
- Modular codebase separating initialization, data fetching, and main execution.

## Tech Stack

- Python 3.9+
- Jupyter Notebook for exploratory data analysis and demonstration
- nasdaqdatalink Python package for API interaction

## Getting Started

### Prerequisites

- Python 3.9 or higher
- Install dependencies:

```bash
pip install nasdaqdatalink
```

### Setup

1. Obtain an API key from Nasdaq Data Link.
2. Save the key in a file named `.key` in the project root.

### Running the project

- Run the main script to fetch data for a sample ticker:

```bash
python main.py
```

- Alternatively, explore the Jupyter Notebooks for domain-specific analyses:
  - `Capital-Markets.ipynb`
  - `FreightRailEasyRead.ipynb`
  - `Rail-Freight-Energy-Usage.ipynb`

## Project Structure

```
├── Capital-Markets.ipynb          # Notebook for capital markets data analysis
├── FreightRailEasyRead.ipynb      # Notebook focused on freight rail data
├── Rail-Freight-Energy-Usage.ipynb # Notebook analyzing energy usage in rail freight
├── Untitled.ipynb                 # Example code for API key reading and data fetching
├── Untitled1.ipynb                # Additional exploratory notebook
├── data.py                       # Function to fetch data given a link and ticker
├── initialize.py                 # Function to read API key into link
├── main.py                       # Main execution script demonstrating usage
```

## Future Work / Roadmap

- Enhance error handling and input validation for API calls.
- Add support for more Nasdaq Data Link datasets and tickers.
- Develop a command-line interface for flexible data queries.
- Implement caching or local storage of fetched data for efficiency.
- Expand documentation and usage examples.

---

For questions or contributions, please open an issue or pull request on the GitHub repository.

---

Repository URL: [https://github.com/justin-napolitano/data-link](https://github.com/justin-napolitano/data-link)

---

---



