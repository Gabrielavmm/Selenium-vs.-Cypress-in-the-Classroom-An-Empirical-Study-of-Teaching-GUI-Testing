const pluginCypress = require("eslint-plugin-cypress/flat");
const noOnlyTests = require("eslint-plugin-no-only-tests");


module.exports = [
 {
   files: ["cypress/**/*.js", "cypress/**/*.cy.js"],
   plugins: {
     cypress: pluginCypress,
     "no-only-tests": noOnlyTests
   },
   rules: {
    
     "cypress/no-unnecessary-waiting": "error",
     "cypress/unsafe-to-chain-command": "error",


     "cypress/no-force": "warn",
     "cypress/no-assigning-return-values": "error",
     "cypress/no-async-tests": "error",


   
     "cypress/no-pause": "warn",
     "no-console": "warn",


     "no-only-tests/no-only-tests": "error",

     "no-unused-vars": "warn",
     "no-empty": "warn"
   }
 },


 {
   files: ["selenium/**/*.js"],
   plugins: {
     "no-only-tests": noOnlyTests
   },
   languageOptions: {
     globals: {
       require: true,
       describe: true,
       it: true,
       before: true,
       after: true,
       beforeEach: true,
       afterEach: true
     }
   },
   rules: {
     "no-only-tests/no-only-tests": "error",
     "no-await-in-loop": "warn",
     "no-console": "warn",
     "no-empty": "warn",
     "no-unused-vars": "warn",


     "max-nested-callbacks": ["warn", 3],
     "complexity": ["warn", 10],
     "max-lines-per-function": ["warn", 50],
     "max-statements": ["warn", 20]
   }
 }
];
