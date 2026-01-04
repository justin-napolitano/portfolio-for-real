---
slug: github-supreme-court-voting-behavior
title: Analyzing Supreme Court Voting Behavior with Machine Learning
repo: justin-napolitano/Supreme-Court-Voting-Behavior
githubUrl: 'https://github.com/justin-napolitano/Supreme-Court-Voting-Behavior'
generatedAt: '2025-11-23T09:44:43.791688Z'
source: github-auto
summary: >-
  Technical overview of a project combining political science theory and machine
  learning to model and predict US Supreme Court justice votes.
tags:
  - supreme-court
  - judicial-politics
  - machine-learning
  - political-science
  - python
  - data-analysis
seoPrimaryKeyword: Supreme Court voting behavior
seoSecondaryKeywords:
  - machine learning
  - judicial decision-making
  - political science models
seoOptimized: true
topicFamily: datascience
topicFamilyConfidence: 0.95
topicFamilyNotes: >-
  The post is a technical and research overview involving data analysis, machine
  learning modeling, and computational political science, aligning closely with
  the datascience family focused on data analysis projects, notebooks, ETL
  pipelines, and scientific data workflows.
id: github-supreme-court-voting-behavior
githubContentSha: d315dec1779bbdfd8cceb468f0ede0b1f89a57d7
---

# Supreme Court Voting Behavior: Technical Overview

This repository documents an independent research project analyzing the voting behavior of the United States Supreme Court justices. The work began as a senior thesis under academic supervision and has evolved into an open-source effort combining political science theory with machine learning techniques.

## Motivation

Understanding how Supreme Court justices decide cases is a central question in judicial politics and legal studies. The project aims to evaluate competing models of judicial decision-making, primarily the Legal Model and the Attitudinal Model, by applying them to real-world case studies and empirical data.

## Problem Statement

The core problem is to explain and predict how justices vote on cases. Traditional legal theory posits that decisions are guided by precedent, statutory and constitutional text, and legislative intent (the Legal Model). Contrastingly, the Attitudinal Model suggests that justices vote according to their ideological preferences and attitudes.

This project tests these models through detailed case analyses and machine learning prediction of justice votes.

## Project Components

### Theoretical Framework

The repository includes extensive documentation on the Legal and Attitudinal Models. It references key theorists such as Ronald Dworkin and Justices Scalia, Black, and Rehnquist. The Legal Model chapters discuss the role of precedent, textual interpretation, and judicial philosophy. The Attitudinal Model chapters focus on ideological scoring of justices based on their voting history.

### Case Studies

A significant portion of the work is dedicated to the Masterpiece Cakeshop, Ltd. v. Colorado Civil Rights Commission case (2018). The project examines the facts, legal arguments, and voting outcomes, comparing expectations derived from ideological scores with the actual 7-2 decision.

### Machine Learning Analysis

The repository contains Python scripts implementing machine learning models to predict justice votes using the Segal and Spaeth dataset. Two main approaches are included:

- Justice-centric models focusing on individual justice voting patterns.
- Case-centric models analyzing case features and citations.

The ML code utilizes TensorFlow, scikit-learn, and data visualization libraries. Preliminary results suggest approximately 80% accuracy in vote prediction.

## Implementation Details

- Data preprocessing includes dropping irrelevant features and handling missing values.
- Models are trained and validated using standard train-test splits.
- SHAP values are initialized for model interpretability.
- The project employs Jupyter Book for documentation, enabling structured presentation of chapters, bibliographies, and code.

## Practical Considerations

- The literature review and documentation are works in progress and require expansion.
- Machine learning scripts need further documentation and modularization.
- The data and environment setup require careful configuration, including virtual environments and package management.

## Conclusion

This repository serves as a technical and research reference for analyzing Supreme Court voting behavior. It bridges political science theory with computational methods, providing a foundation for future enhancements in judicial behavior modeling.

The approach is empirical and grounded in data, avoiding normative or motivational language. It is intended for developers and researchers seeking to understand or extend computational political science projects related to judicial decision-making.

---

For further details, refer to the documentation in the `book/` directory and the source code in `book/ml/`.

Contact Justin Napolitano at contribute@court-behavior.io for collaboration or questions.

