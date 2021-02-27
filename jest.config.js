module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.storybook'],
  moduleNameMapper: {
    '\\.scss': '<rootDir>/src/__mocks__/styles.ts',
    '\\.svg': '<rootDir>/src/__mocks__/svg.ts',
  },
};
