module.exports = {
  // Run type-check on changes to TypeScript files
  '**/*.ts?(x)': () => 'npm run type-check',
  // Run ESLint on changes to JavaScript/TypeScript files
  '**/*.(ts|js)?(x)': filenames => `npm run lint ${filenames.join(' ')}`,
  // Run Stylelint on changes to SCSS files
  '**/*.scss': filenames => `npm run lint:scss ${filenames.join(' ')}`,
  // Run prettier on changes to js, ts, tsx, json, md
  '**/*.(js|ts|tsx|json|md)': filenames =>
    `npm run format ${filenames.join(' ')}`,
  // Run jest on changes to ts, tsx
  '**/*.test.(ts|tsx)': filenames =>
    `npm run test --passWithNoTests ${filenames.join(' ')}`,
};
