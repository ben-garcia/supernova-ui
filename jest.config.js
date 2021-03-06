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
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.scss': '<rootDir>/src/__mocks__/styles.ts',
    '\\.svg': '<rootDir>/src/__mocks__/svg.ts',
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.storybook'],
};
