/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

process.env.TZ = 'UTC'

const tapReporter = [
  'jest-tap-reporter',
  {
    logLevel: 'ERROR',
    showInternalStackTraces: true,
    filePath: 'test-output/unit/jestTestLogs.tap'
  }
]

const jestConfig = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src-web/**/*.{js,jsx}'
  ],
  coverageDirectory: './test-output/unit/coverage',
  coverageReporters: [
    'json-summary',
    'json',
    'html',
    'lcov',
    'text',
    'text-summary'
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  testURL: 'http://localhost/',
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      branches: 48,
      functions: 48,
      lines: 55,
      statements: 55,
    },
  },
  testMatch: [
    '<rootDir>/tests/jest/*/*.test.js?(x)',
    '<rootDir>/tests/jest/*/*/*.test.js?(x)',
    '<rootDir>/tests/jest/*/*/*/*.test.js?(x)',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.+\\.(hbs)$': 'jest-handlebars',
    '.+\\.(handlebars)$': 'jest-handlebars',
    '.+\\.(yaml)$': 'jest-yaml-transform',
  },
  globalSetup: '<rootDir>/tests/jest/config/properties-to-json.js',
  setupFiles: [
    '<rootDir>/tests/jest/config/setup.js',
  ],
  moduleNameMapper: {
    '\\.(css|scss|svg|png)$': '<rootDir>/tests/jest/config/styleMock.js',
    'monaco-editor': '<rootDir>/node_modules/react-monaco-editor'
  }
}

jestConfig.reporters = process.env.TRAVIS ? [ 'default', tapReporter ] : [ 'default']

module.exports = jestConfig
