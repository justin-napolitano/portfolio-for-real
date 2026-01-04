---
slug: github-google-image-crawler
id: github-google-image-crawler
title: Automate Image Downloads with Google Image Crawler
repo: justin-napolitano/Google-Image-Crawler
githubUrl: 'https://github.com/justin-napolitano/Google-Image-Crawler'
generatedAt: '2025-11-24T21:35:00.478Z'
source: github-auto
summary: >-
  Learn how to use Google-Image-Crawler, a Python tool for automated image
  scraping from Google Image Search results.
tags:
  - python
  - selenium
  - beautifulsoup
  - web scraping
  - image processing
seoPrimaryKeyword: google image crawler
seoSecondaryKeywords:
  - image scraping tool
  - selenium image downloader
  - python web scraper
  - automated image download
  - google search images
seoOptimized: true
topicFamily: automation
topicFamilyConfidence: 0.9
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

Google-Image-Crawler is a Python-based tool designed to automate the process of downloading images from Google Image Search results. It leverages Selenium and BeautifulSoup to scrape images based on user-defined keywords and save them locally.

## Features

- Automated image scraping from Google Image Search
- Supports keyword-based image queries
- Configurable download limits and output directories
- Uses Selenium WebDriver for dynamic page interaction
- Supports batch processing via JSON configuration

## Tech Stack

- Python 3
- Selenium WebDriver
- BeautifulSoup4
- urllib3

## Getting Started

### Prerequisites

- Python 3.x installed
- Google Chrome browser installed
- ChromeDriver executable compatible with your Chrome version (download from https://sites.google.com/chromium.org/driver/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/justin-napolitano/Google-Image-Crawler.git
cd Google-Image-Crawler
```

2. Install required Python packages:

```bash
pip install -r requirements.txt
```

_Note: If `requirements.txt` is not present, install dependencies manually:_

```bash
pip install selenium beautifulsoup4 urllib3
```

3. Place the `chromedriver.exe` in the project directory or update the path in `config.json`.

### Usage

- Modify `config.json` to set keywords, download limits, ChromeDriver path, and output directories.
- Run the crawler script (e.g., `seleniumCrawler.py` or `googlecrawler.py`) to start downloading images.

Example running seleniumCrawler.py:

```bash
python seleniumCrawler.py
```

## Project Structure

```
Google-Image-Crawler/
├── chromedriver.exe          # ChromeDriver executable for Selenium
├── config.json              # Configuration file with keywords and settings
├── googlecrawler.py         # Script using BeautifulSoup for scraping
├── seleniumCrawler.py       # Script using Selenium WebDriver for scraping
├── seleniumCrawler.txt      # Possibly notes or logs related to Selenium crawler
├── README.md                # This file
```

- `seleniumCrawler.py`: Uses Selenium to automate Chrome, scroll through image results, and download images.
- `googlecrawler.py`: Uses requests and BeautifulSoup to scrape image URLs and download images.
- `config.json`: Contains multiple records for batch image crawling with different keywords and settings.

## Future Work / Roadmap

- Improve error handling and logging for robustness.
- Add command-line interface to specify keywords and settings dynamically.
- Support more flexible output naming conventions.
- Implement parallel downloads to improve speed.
- Add support for other search engines or image sources.
- Package as a Python module for easier integration.
- Update scraping logic to handle changes in Google Image Search markup.

---

_Assumptions: The project requires manual setup of ChromeDriver and Python dependencies. The README assumes basic familiarity with Python and Selenium._

