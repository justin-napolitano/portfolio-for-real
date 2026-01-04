---
slug: github-mysql-utility-class
id: github-mysql-utility-class
title: MySQL Utility Class for Python Database Management
repo: justin-napolitano/mysql-utility-class
githubUrl: 'https://github.com/justin-napolitano/mysql-utility-class'
generatedAt: '2025-11-24T21:35:40.316Z'
source: github-auto
summary: >-
  A Python utility class for managing MySQL connections and basic operations
  like creating and dropping databases.
tags:
  - mysql
  - python
  - mysql-connector-python
  - python-dotenv
seoPrimaryKeyword: mysql utility class python
seoSecondaryKeywords:
  - manage mysql connections
  - create drop databases python
  - python database utility
  - mysql connection lifecycle
  - environment variables mysql
seoOptimized: true
topicFamily: devtools
topicFamilyConfidence: 0.9
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

A lightweight Python utility class to manage MySQL database connections and basic database operations. This package simplifies connecting to a MySQL server, creating and dropping databases programmatically using environment variables for configuration.

## Features

- Connect to a MySQL server using credentials from environment variables
- Create new databases
- Drop existing databases
- Manage connection lifecycle with connect and disconnect methods

## Tech Stack

- Python 3.x
- mysql-connector-python
- python-dotenv (assumed for environment variable loading)

## Getting Started

### Prerequisites

- Python 3.x installed
- MySQL server accessible
- Environment variables set for `DB_USER`, `DB_PASSWORD`, `DB_HOST`, and `DB_NAME` (optional, depending on usage)

### Installation

Clone the repository:

```bash
git clone https://github.com/justin-napolitano/mysql-utility-class.git
cd mysql-utility-class
```

Install dependencies (recommended to use a virtual environment):

```bash
pip install mysql-connector-python python-dotenv
```

### Usage

```python
from mysql_utility_class import MySQLConnector

connector = MySQLConnector()
connector.connect()

# Create a database
connector.create_database('test_db')

# Drop a database
connector.drop_database('test_db')

connector.disconnect()
```

## Project Structure

```
mysql-utility-class/
├── __init__.py          # Package initializer
├── MySQLConnector.py    # Main utility class for MySQL operations
```

- `MySQLConnector.py` contains the `MySQLConnector` class responsible for managing MySQL connections and database operations.
- `__init__.py` exposes the `MySQLConnector` class for easier imports.

## Future Work / Roadmap

- Add support for executing arbitrary SQL queries
- Implement connection pooling for better performance
- Add error handling improvements and logging instead of print statements
- Support for managing tables and records
- Provide configuration options to connect directly to a specific database
- Add unit tests and CI integration
- Improve documentation with usage examples and troubleshooting guide


