ESLint Test Smell Detection
This directory contains the ESLint configuration used to detect test smells in Cypress and Selenium JavaScript test suites. It complements the AST-based script (see ../ast-analysis/README.md), which handles conformance, locator fragility, and the hard_coded smell.
ESLint is applied here because rule-based lint checks are well-suited for detecting structural anti-patterns such as unsafe command chaining, fixed waits, and oversized test functions — patterns that are reliably identified through syntactic rules without requiring full AST traversal.

Test Smells Detected
MetricRuleFrameworkfixed_waitcypress/no-unnecessary-waitingCypressunsafe_chaincypress/unsafe-to-chain-commandCypressno_only_testno-only-tests/no-only-testsBothno_unused_varno-unused-varsBothmax_lines_per_functionmax-lines-per-function (threshold: 50)Seleniummax_statementsmax-statements (threshold: 20)Selenium

await_loop is detected via no-await-in-loop in the Selenium configuration.


Requirements

Node.js ≥ 18
npm ≥ 9


Setup
Run the following inside the folder containing the test suite you want to analyze:
bash# 1. Install ESLint and required plugins
npm install --save-dev eslint eslint-plugin-cypress@3 eslint-plugin-no-only-tests
npm install --save-dev eslint-plugin-chai-expect
npm install --save-dev eslint-plugin-security

# 2. Copy the eslint.config.js file from this directory into the test suite folder

Configuration File
The eslint.config.js in this directory defines two rule sets:

Cypress (cypress/**/*.js, cypress/**/*.cy.js): detects Cypress-specific smells using eslint-plugin-cypress and eslint-plugin-no-only-tests.
Selenium (selenium/**/*.js): detects structural complexity smells using core ESLint rules and eslint-plugin-no-only-tests.


Running
bash# Analyze a Cypress test file
npx eslint cypress/e2e/section-name.cy.js

# Analyze a Selenium test file
npx eslint selenium/e2e/section-name.js



Interpreting Results
Each warning or error in the ESLint output corresponds to one occurrence of a test smell. To compute the metrics reported in the paper:

fixed_wait: count of cypress/no-unnecessary-waiting errors
unsafe_chain: count of cypress/unsafe-to-chain-command errors
no_only_test: count of no-only-tests/no-only-tests errors
no_unused_var: count of no-unused-vars warnings
max_lines_per_function: count of max-lines-per-function warnings
max_statements: count of max-statements warnings

Results for each pair should be recorded in ../../data/code-analysis-results.csv.

Notes

The configuration uses ESLint's flat config format (eslint.config.js), compatible with ESLint v9+.
Selenium suites use Mocha as the test runner. Global functions (describe, it, before, after, beforeEach, afterEach) are declared in the languageOptions.globals block to prevent false no-undef warnings.
Rules are set to "error" for smells that are always problematic (e.g., unsafe_chain, no_only_test) and "warn" for smells that require contextual judgment (e.g., no_unused_vars, max_lines_per_function).