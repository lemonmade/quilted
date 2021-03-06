module.exports = {
  cacheDirectory: '<rootDir>/build/cache/jest',
  testRegex: '.*\\.test\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  coverageDirectory: './coverage/',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    '^@shopify/([a-zA-Z0-9_-]+)(/[a-zA-Z0-9_-]+)$': '<rootDir>/packages/$1/src/$2',
    '^@shopify/([a-zA-Z0-9_-]+)$': '<rootDir>/packages/$1',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
