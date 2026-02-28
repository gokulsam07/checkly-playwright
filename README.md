# Playwright Test Automation Framework

[![Playwright Tests](https://github.com/gokulsam07/checkly-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/gokulsam07/checkly-playwright/actions/workflows/playwright.yml)

This repository contains an automated testing framework built with Playwright for both UI and API testing of the Checkly application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Framework Architecture](#framework-architecture)
  - [Page Object Model (POM)](#page-object-model-pom)
  - [Custom Fixtures](#custom-fixtures)
- [Configuration Deep Dive](#configuration-deep-dive)
- [Running the Tests](#running-the-tests)
  - [UI Tests](#ui-tests)
  - [API Tests](#api-tests)
  - [All Tests](#all-tests)
- [Test Reports](#test-reports)
- [Debugging](#debugging)
- [CI/CD](#cicd)
- [Code Style and Linting](#code-style-and-linting)
- [Contributing](#contributing)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   [Node.js](https://nodejs.org/) (v18 or higher is recommended)
-   [npm](https://www.npmjs.com/) (which comes with Node.js)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/gokulsam07/checkly-playwright.git
    cd checkly-playwright
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    1. For local run, Create a `.env` file in the root of the project and add the necessary environment variables. Explore the fixtures to see which variables are expected. For example:

    ```
    # .env file
    API_KEY=your_checkly_api_key
    ACCOUNT_ID=your_checkly_account_id
    USER_EMAIL=your_email
    USER_PASSWORD=your_password
    ```
    2. For CI run, create a enviroment, add you secrets in Github secrets, use the same in CI workflow. 
## Project Structure

The project is organized into the following directories:

-   `.github/workflows`: Contains the CI/CD pipeline configuration for GitHub Actions.
-   `fixtures`: Contains custom fixtures for Playwright tests.
-   `pages`: Contains Page Object Models (POMs) for the UI tests.
-   `tests`: Contains the actual test files, separated into `api` and `ui` subdirectories.
-   `playwright.config.ts`: The main configuration file for Playwright.
-   `package.json`: Lists the project dependencies and scripts.

## Framework Architecture

### Page Object Model (POM)

This framework utilizes the Page Object Model (POM) design pattern to create a scalable and maintainable test suite. Each page in the application is represented by a corresponding class in the `pages` directory. These classes encapsulate the page's elements and the actions that can be performed on them.

### Custom Fixtures

Custom fixtures are used to set up and tear down the test environment. They can be found in the `fixtures` directory. This allows for a clean and reusable way to provide context to the tests. API and UI fixtures with auto login for each test is embedded using the respective fixtures.

## Configuration Deep Dive

The `playwright.config.ts` file is the heart of the Playwright configuration. It defines the test projects and their configurations.

-   **`api` project**: This project is configured for API testing. It sets the `baseURL` to the Checkly API endpoint and includes the necessary headers for API requests.
-   **`chrome` project**: This project is configured for UI testing. It uses the desktop Chrome browser and sets the `baseURL` to the Checkly application URL.

The global `use` object defines the default settings for all projects, such as video recording, headless mode, and screenshot settings.

## Running the Tests

This framework uses Playwright Test Runner to execute the tests. You can run the tests using the npm scripts defined in `package.json`.

### UI Tests

To run the UI tests against the Chrome browser, use the following command:

```bash
npm run ui
```

### API Tests

To run the API tests, use the following command:

```bash
npm run api
```

### All Tests

To run all tests (both UI and API), you can run the following command which will run all projects defined in the playwright config file:

```bash
npx playwright test
```

## Test Reports

After running the tests, a detailed HTML report will be generated in the `playwright-report` directory. You can view the report by opening the `index.html` file in your browser.

```bash
npx playwright show-report
```

## Debugging

Playwright provides several tools for debugging tests. One of the most useful is the Playwright Inspector. You can launch it by running your tests with the `--debug` flag.

```bash
npx playwright test --debug
```

This will open a browser window with the Playwright Inspector, which allows you to step through your tests, inspect the DOM, and see the test execution log.

## CI/CD

This project is configured with a GitHub Actions workflow defined in `.github/workflows/playwright.yml`. The workflow will automatically run the tests whenever there is a push to the `main` branch or a pull request is opened.

## Code Style and Linting

To maintain a consistent code style, it is recommended to use a linter and a code formatter. This project can be set up with ESLint for linting and Prettier for code formatting.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with a descriptive commit message.
4.  Push your changes to your fork.
5.  Create a pull request to the `main` branch of this repository.
