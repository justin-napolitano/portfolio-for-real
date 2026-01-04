---
slug: github-sup-court-data-ingestion
id: github-sup-court-data-ingestion
title: Java Data Ingestion from Google Cloud to PostgreSQL
repo: justin-napolitano/sup-court-data-ingestion
githubUrl: 'https://github.com/justin-napolitano/sup-court-data-ingestion'
generatedAt: '2025-11-24T21:36:25.995Z'
source: github-auto
summary: >-
  A Java-based workflow for ingesting JSON data from Google Cloud Storage into
  PostgreSQL, with error handling for data integrity.
tags:
  - java
  - postgresql
  - data-ingestion
  - maven
seoPrimaryKeyword: java data ingestion workflow
seoSecondaryKeywords:
  - google cloud storage json
  - postgresql data insertion
  - maven project setup
  - error handling in java
  - data processing architecture
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

A Java-based data ingestion workflow designed to download JSON data from a Google Cloud Storage bucket, parse it, and insert it into a PostgreSQL database. It handles unique constraint violations gracefully to maintain data integrity.

---

## Features

- Connects to Google Cloud Storage to list and download JSON files.
- Parses JSON data and processes various entities such as Items, Resources, Contributors, Call Numbers, and Subjects.
- Inserts parsed data into PostgreSQL tables with error handling for unique constraint violations.
- Modular processors for different data components to maintain clean separation of concerns.

## Tech Stack

- Java 11
- Maven for build and dependency management
- PostgreSQL as the relational database
- Google Cloud Storage for data source
- JSON processing with org.json

## Getting Started

### Prerequisites

- Java 11 or higher installed
- Maven installed
- PostgreSQL running locally or accessible
- Google Cloud Storage bucket with JSON files
- Service account key JSON file for GCS authentication

### Installation

1. Clone the repository:

```bash
git clone https://github.com/justin-napolitano/sup-court-data-ingestion.git
cd sup-court-data-ingestion
```

2. Update the database connection parameters and Google Cloud credentials path in `DataIngestionMain.java`.

3. Build the project using Maven:

```bash
mvn clean package
```

### Running

Run the main class using Maven exec plugin:

```bash
mvn exec:java -Dexec.mainClass="com.data_ingestion.DataIngestionMain"
```

## Project Structure

```
sup-court-data-ingestion/
├── pom.xml
├── readme.md
├── resources/
│   └── secret.json  # Google Cloud service account key
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/data_ingestion/
│   │   │       ├── CallNumbersProcessor.java
│   │   │       ├── ContributorsProcessor.java
│   │   │       ├── DataIngestionClient.java
│   │   │       ├── DataIngestionMain.java
│   │   │       ├── GCSClient.java
│   │   │       ├── ItemsProcessor.java
│   │   │       ├── ResourcesProcessor.java
│   │   │       └── SubjectsProcessor.java
│   └── test/
│       └── java/
│           └── com/example/AppTest.java
└── target/  # Maven build output
```

## Future Work / Roadmap

- Add comprehensive unit and integration tests for processors and clients.
- Implement configuration management to externalize DB and GCS credentials.
- Enhance error handling and logging with a structured logging framework.
- Support incremental data ingestion and data update scenarios.
- Containerize the application for easier deployment.
- Add support for parallel processing to improve ingestion speed.

---

For any questions or contributions, please open an issue or submit a pull request.


