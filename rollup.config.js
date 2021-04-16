import sass from 'rollup-plugin-sass';
import typescript from 'rollup-plugin-typescript2';

// eslint-disable-next-line
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    // sass({ output: './dist/css/main.css', insert: true }),
    sass({ insert: true }),
    typescript(),
  ],
  external: ['react', 'react-dom'],
};
