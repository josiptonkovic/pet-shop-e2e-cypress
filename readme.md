# Cypress Test Suite Repository


This repository contains an automated test suite for [PetShop](https://pet-shop.buckhill.com.hr/). The tests are written using [Cypress](https://www.cypress.io/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

### Prerequisites

Before running the tests, you'll need to have the following installed on your machine:

- [Node.js](https://nodejs.org/) (and npm)
- [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress.html)

### Installing

1. Clone the repository to your local machine:

```bash
git clone git@github.com:josiptonkovic/pet-shop-e2e-cypress.git
```

2. Navigate to the project directory:

```
cd pet-shop-e2e-cypress
```

3. Install the required dependencies by running
```
npm install
```
or the install script
```
./install.sh
```

### Running the tests

The tests can be ran in headless and headed mode.  
To run the tests in headless mode run:
```
npm run cy:run
```
To run the tests in headed mode run
```
npm run cy:open
```
Alternatively the tests can be run with the following script (default headless):
```
./run_cypress.sh
```
The script accepts arguments for running in Chrome or Firefox, e.g.:
```
./run_cypress.sh chrome
```

### Writing Tests

The tests are located in the cypress/e2e directory. You can create new test files or modify existing ones to suit your testing needs. This suite uses TypeScript for writing tests.
