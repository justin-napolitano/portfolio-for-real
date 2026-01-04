---
slug: github-sup-court-postgres
id: github-sup-court-postgres
title: PostgreSQL Database Management for US Supreme Court Data
repo: justin-napolitano/sup-court-postgres
githubUrl: 'https://github.com/justin-napolitano/sup-court-postgres'
generatedAt: '2025-11-24T21:36:30.226Z'
source: github-auto
summary: >-
  Set up and manage a PostgreSQL database for US Supreme Court data using Java,
  Docker, and Maven with automated schema creation.
tags:
  - postgresql
  - java
  - docker
  - maven
  - database management
  - adminer
  - sql schema
seoPrimaryKeyword: postgresql database management
seoSecondaryKeywords:
  - java database setup
  - docker compose postgres
  - supreme court data
  - sql schema files
  - maven project structure
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

A Java-based project to set up and manage a PostgreSQL database for US Supreme Court data. This repository includes SQL schema files, Java code for database creation and table setup, and Docker configurations for running PostgreSQL and Adminer.

---

## Features

- Automated creation of PostgreSQL database and tables using Java and Maven
- SQL schema files for key Supreme Court related tables (CallNumbers, Contributors, Items, Resources, Subjects)
- Docker Compose setup for PostgreSQL and Adminer for easy local development and management
- Java utility class to execute SQL files and perform basic database operations

---

## Tech Stack

- Java 11
- Maven for build and dependency management
- PostgreSQL as the relational database
- Docker and Docker Compose for containerized database and Adminer
- Adminer for web-based database management

---

## Getting Started

### Prerequisites

- Java 11 or higher installed
- Maven installed
- Docker and Docker Compose installed

### Setup

1. Clone the repository

```bash
git clone https://github.com/justin-napolitano/sup-court-postgres.git
cd sup-court-postgres
```

2. Start PostgreSQL and Adminer containers

```bash
docker-compose up -d
```

3. Build the Java project

```bash
mvn clean package
```

4. Run the Java application to create the database and tables

```bash
mvn exec:java -Dexec.mainClass="com.createdb.Main"
```

---

## Project Structure

```
├── docker-compose.yml          # Docker Compose config for PostgreSQL and Adminer
├── pom.xml                    # Maven project descriptor
├── readme.md                  # This README file
├── index.md                   # Notes and initial thoughts
├── sql/                       # SQL schema files for table creation
│   ├── CallNumbers.sql
│   ├── Contributors.sql
│   ├── Items.sql
│   ├── Resources.sql
│   ├── Subjects.sql
│   └── Users.sql (assumed for future use)
├── src/                       # Java source code
│   └── main/java/com/createdb/
│       ├── DatabaseClient.java # Utility for executing SQL and DB operations
│       └── Main.java           # Main entry point for DB setup
└── target/                    # Maven build output
```

---

## Future Work / Roadmap

- Implement web server (e.g., Flask) to serve data from the PostgreSQL database
- Develop frontend UI for browsing and querying Supreme Court data
- Add orchestration and scaling features for production deployment
- Expand database schema to include additional entities and relationships
- Integrate machine learning workflows for data analysis
- Improve error handling and logging in Java code


---

This project is a foundational step towards building an open-source graph of US Jurisprudence accessible via the web.


