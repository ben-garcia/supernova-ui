module.exports = {
  // Run type-check on changes to TypeScript files
  '**/*.ts?(x)': () => 'yarn type-check',
  // Run ESLint on changes to JavaScript/TypeScript files
  '**/*.(ts|js)?(x)': filenames => `yarn lint ${filenames.join(' ')}`,
  // Run Stylelint on changes to SCSS files
  '**/*.scss': filenames => `yarn lint:scss ${filenames.join(' ')}`,
  // Run prettier on changes to js, ts, tsx, json, md
  '**/*.(js|ts|tsx|json|md)': filenames => `yarn format ${filenames.join(' ')}`,
  // Run jest on changes to ts, tsx
  '**/*.test.(ts|tsx)': filenames =>
    `yarn test --passWithNoTests ${filenames.join(' ')}`,
};
