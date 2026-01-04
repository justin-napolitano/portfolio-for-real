---
slug: github-googleapi
id: github-googleapi
title: Python Google API Integration for Sheets and Drive
repo: justin-napolitano/GoogleAPI
githubUrl: 'https://github.com/justin-napolitano/GoogleAPI'
generatedAt: '2025-11-24T21:35:01.568Z'
source: github-auto
summary: >-
  Integrate Google Sheets and Drive with Python for streamlined data
  manipulation and access.
tags:
  - google-api-python-client
  - google-auth
  - pandas
  - python
seoPrimaryKeyword: google api python integration
seoSecondaryKeywords:
  - google sheets api
  - google drive api
  - python google api
  - pandas integration
  - oauth 2.0 credentials
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

GoogleAPI provides Python integrations for Google Sheets and Google Drive, facilitating access and manipulation of Google Sheets data and Drive files. It aims to simplify workflows involving Google Sheets and pandas, with upcoming features to export pandas DataFrames directly to Google Sheets.

## Features

- Access and manipulate Google Sheets via the Sheets API
- Access Google Drive metadata and create folders
- Pythonic interface to Google APIs
- Planned DataFrame to Google Sheet export functionality

## Tech Stack

- Python 3
- Google API Client Libraries (`google-api-python-client`, `google-auth`, `google-auth-oauthlib`)

## Getting Started

### Prerequisites

- Python 3.x installed
- Google Cloud project with Sheets and Drive APIs enabled
- OAuth 2.0 credentials JSON file (`credentials.json`) downloaded from Google Cloud Console

### Installation

```bash
pip install --upgrade google-api-python-client google-auth google-auth-oauthlib
```

### Usage

1. Place your `credentials.json` file in the project directory.
2. Import and instantiate the `GoogleAPI` class:

```python
from GoogleServices import GoogleAPI

google_api = GoogleAPI()
```

3. Use `google_api.SheetsApp` and `google_api.DriveApp` to interact with Sheets and Drive respectively.

## Project Structure

```
GoogleAPI/
├── GoogleServices.py   # Main API wrapper classes for Sheets and Drive
├── SheetsApp.py        # Sheets and Drive app classes with API calls
└── LICENSE             # License file
```

- `GoogleServices.py` contains the `GoogleAPI` class that initializes credentials and app instances.
- `SheetsApp.py` defines `SheetsApp` and `DriveApp` classes with methods for Google Sheets and Drive API calls.

## Future Work / Roadmap

- Implement `df.togooglesheet()` functionality to export pandas DataFrames directly to Google Sheets.
- Expand Drive API capabilities beyond metadata reading, including file uploads and downloads.
- Add comprehensive error handling and logging.
- Provide examples and documentation for common use cases.


