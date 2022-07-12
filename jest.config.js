const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  // what files to include or exclude in the coverage report(regardless of test files)
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/*/stories.tsx',
    '!**/*/argTypes.ts',
    '!src/theme/**/*',
  ],
  // the minimun threadhold for jest to pass
  //
  // @see https://jestjs.io/docs/en/configuration.html#coveragethreshold-object
  /*
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
	*/
  moduleNameMapper: {
    '\\.scss': '__mocks__/styles.ts',
    '\\.svg': '__mocks__/svg.ts',
    // convert tsconfig paths to a format that works in jest
    ...pathsToModuleNameMapper(compilerOptions.paths),
  },
  modulePaths: ['<rootDir>/src'],
  // optional, you don't need it in case you use babel preset typescript
  // preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.storybook'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
};
