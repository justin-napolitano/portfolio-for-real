---
slug: github-sup-court-postgres-post
id: github-sup-court-postgres-post
title: Java PostgreSQL Project Setup with Docker and Maven
repo: justin-napolitano/sup-court-postgres-post
githubUrl: 'https://github.com/justin-napolitano/sup-court-postgres-post'
generatedAt: '2025-11-24T21:36:31.174Z'
source: github-auto
summary: >-
  Learn how to set up a Java project with PostgreSQL using Docker and Maven,
  including installation and project structure.
tags:
  - java
  - postgresql
  - docker
  - maven
  - adminer
  - database management
  - sql scripts
seoPrimaryKeyword: java postgres docker setup
seoSecondaryKeywords:
  - postgresql docker compose
  - maven project structure
  - java database integration
  - adminer setup
  - sql database management
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

A Java project focused on setting up and interacting with a PostgreSQL database using Docker and Maven. This repository serves as a learning exercise for integrating Java applications with PostgreSQL databases and managing database schemas through SQL scripts.

## Features

- PostgreSQL database setup using Docker and Docker Compose
- Adminer web-based database management tool included
- Maven project structure for Java development
- SQL scripts for defining database tables

## Tech Stack

- Java
- Maven
- PostgreSQL
- Docker & Docker Compose
- Adminer (database management tool)

## Getting Started

### Prerequisites

- Java Development Kit (JDK) installed
- Maven installed
- Docker and Docker Compose installed

### Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/justin-napolitano/sup-court-postgres-post.git
cd sup-court-postgres-post
```

2. Start PostgreSQL and Adminer using Docker Compose:

```bash
docker-compose up -d
```

3. Verify that PostgreSQL is running on port 5432 and Adminer on port 8080.

4. Set up the Maven project and dependencies (including PostgreSQL JDBC driver) in `pom.xml`.

5. Use the provided SQL files in the `sql/` directory to create and manage database tables.

6. Build and run the Java application using Maven:

```bash
mvn clean install
mvn exec:java -Dexec.mainClass="com.createdb.Main"
```

## Project Structure

```
my-java-project/
├── src/
│   └── main/
│       └── java/
│           └── com/
│               └── createdb/
│                   ├── DatabaseClient.java  # Handles database connections and queries
│                   └── Main.java            # Entry point for the Java application
├── sql/                                     # SQL scripts to define tables
│   ├── CallNumbers.sql
│   ├── Contributors.sql
│   ├── Items.sql
│   ├── Resources.sql
│   └── Subjects.sql
├── pom.xml                                 # Maven project descriptor
├── docker-compose.yml                      # Docker Compose file for PostgreSQL and Adminer
└── index.md                                # Project notes and setup instructions
```

## Future Work / Roadmap

- Implement automated workflows for data ingestion and processing
- Expand Java application functionality to support analysis and reporting
- Integrate additional data sources and improve database schema
- Add unit and integration tests for database interactions
- Explore performance optimizations for large-scale data handling
- Provide detailed documentation and usage examples


