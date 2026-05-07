AST-Based Static Analysis Script
This script analyzes Cypress and Selenium test suites using Abstract Syntax Tree (AST) parsing. It extracts conformance, complexity, locator fragility, and the hard_coded test smell from JavaScript test files.
AST parsing was preferred over text-matching approaches because it resolves tokens according to their syntactic roles, avoiding false positives from method names, comments, or string literals that would otherwise be misclassified by pattern-based tools.

Note: This script covers Group 1 (Conformance), Group 2 (Complexity and Locator Fragility), and the hard_coded smell from Group 3. The remaining test smells are detected by ESLint — see ../eslint-config/README.md.


Metrics Extracted
Group 1 — Conformance
MetricDescriptiontest_case_countNumber of it() blocks found in the fileassertion_conformityProportion of test cases containing at least one assertioninteraction_conformityProportion of test cases containing at least four GUI interactions
Group 2 — Complexity and Locator Fragility
MetricDescriptionavg_assertionsAverage number of assertions per test casefragile_locator_rateProportion of locators classified as fragile (line-weighted)loc_classCount of class-based CSS selectorscss_outroCount of unclassified CSS selectorsxpath_relativoCount of relative XPath expressions (Selenium only)
Group 3 — Test Smell (AST)
MetricDescriptionhard_codedTest cases containing hard-coded values such as localhost URLs, email addresses, phone numbers, or credential strings

Requirements

Python ≥ 3.9
pip


Setup
bash# 1. Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate         # Windows

# 2. Install dependencies
pip install tree-sitter==0.21.3 tree-sitter-javascript==0.21.3 pandas openpyxl
pip install --upgrade tree-sitter tree-sitter-javascript

Configuration
Open analyze.js and set the paths to the files you want to analyze:
pythonCYPRESS_FILE  = "cypress/e2e/section-name.cy.js"
SELENIUM_FILE = "selenium/e2e/section-name.js"

Running
bashpython3 analyze.py
Output is printed to the terminal for each framework, organized by metric group.

Locator Classification
Cypress selectors
CategoryExamplesFragile?id#element, [id="x"]Noatributo_data[data-cy="x"]Notexto:contains("text")Noclass.btn, *[class^="..."]Yescss_estruturaldiv > span:nth-child(2)Yescss_outroUnclassified CSSYes
Selenium locators (By strategy)
CategoryExamplesFragile?idBy.id("x")NonameBy.name("x")Nolink_textBy.linkText("x")NoclassBy.className("x")Yesxpath_relativoBy.xpath("//div[@class]")Yesxpath_absolutoBy.xpath("/html/body/...")Yescss_estruturalBy.cssSelector("div > span")Yescss_outroUnclassified CSSYes

Output Format
Results are printed to stdout per framework. Example:
============================================================
  ANALYSIS — CYPRESS
============================================================

 GROUP 1 — CONFORMANCE
  test_case_count        : 12
  assertion_conformity   : 100.0%  (12/12)
  interaction_conformity : 83.3%  (10/12)

 GROUP 2 — COMPLEXITY
  avg_assertions         : 1.42

 LOCATOR FRAGILITY
  total_locators         : 38
    class                  18  (47.4%) ← fragile
    id                     14  (36.8%)
    css_outro               6  (15.8%) ← fragile
  fragile_locator_rate   : 0.631  (63.1%)

 TEST SMELLS (AST)
  smell_hard_coded       : 2
    → login with credentials
    → submit payment form

Notes

beforeEach() blocks are parsed separately and excluded from per-test interaction and assertion counts to avoid inflating individual test metrics.
The hard_coded smell uses heuristic pattern matching for password-like strings inside type() / sendKeys() calls. Manual verification is recommended for flagged cases.
Results for each pair should be recorded in ../../data/code-analysis-results.csv.