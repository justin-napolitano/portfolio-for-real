---
slug: github-hugo-rss-mysql-update
id: github-hugo-rss-mysql-update
title: Automate RSS Feed Updates to MySQL with Python
repo: justin-napolitano/hugo-rss-mysql-update
githubUrl: 'https://github.com/justin-napolitano/hugo-rss-mysql-update'
generatedAt: '2025-11-24T21:35:07.873Z'
source: github-auto
summary: >-
  This project automates scraping RSS feeds from a Hugo blog and updates a MySQL
  database with new posts using Python.
tags:
  - python
  - mysql
  - rss
  - hugo
  - automation
  - feedparser
  - dotenv
seoPrimaryKeyword: hugo rss mysql update
seoSecondaryKeywords:
  - rss feed automation
  - python mysql integration
  - hugo blog updates
  - feedparser usage
  - environment variable management
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

A Python project to automate the process of scraping RSS feeds from a Hugo blog and updating a MySQL database with new posts. This repository builds on previous work to integrate RSS feed parsing with a MySQL backend for persistent storage and further automation.

---

## Features

- Parses RSS feeds to extract post metadata
- Converts publication dates to epoch timestamps
- Reads and writes last run timestamps to avoid duplicate processing
- Connects to a MySQL database using environment-configured credentials
- Designed to integrate with Hugo-generated RSS feeds

---

## Tech Stack

- Python 3
- feedparser library for RSS parsing
- mysql-connector-python for MySQL database connectivity
- dotenv for environment variable management

---

## Getting Started

### Prerequisites

- Python 3 installed
- MySQL server accessible with a database created
- Virtual environment recommended

### Installation

```bash
# Clone the repository
git clone https://github.com/justin-napolitano/hugo-rss-mysql-update.git
cd hugo-rss-mysql-update

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install feedparser mysql-connector-python python-dotenv
```

### Configuration

Create a `.env` file in the root directory with the following variables:

```
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=your_mysql_host
DB_NAME=your_database_name
```

### Running

- To test database connection:

```bash
python db-connector.py
```

- To run the RSS scraper and update logic (assuming script completion):

```bash
python rss-scraper.py
```

---

## Project Structure

```
.
├── db-connector.py      # MySQL connection handler using environment variables
├── rss-scraper.py       # RSS feed parser and logic to process new posts
├── last_run.txt         # Stores epoch timestamp of last script run
├── readme.md            # Project background and notes
├── index.md             # Project blog post in markdown
└── images/              # Image assets for documentation
```

---

## Future Work / Roadmap

- Complete and refine the RSS scraping script to fully parse and insert/update posts in MySQL
- Add error handling and logging for robustness
- Implement unit and integration tests
- Expand support for multiple RSS feeds
- Add configuration options for feed URLs and database tables
- Automate script execution via cron or CI/CD pipeline


