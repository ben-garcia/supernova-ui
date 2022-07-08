import autoprefixer from 'autoprefixer';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const packageJson = require('./package.json');
const tsConfig = require('./tsconfig.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      // Prevent bundling peerDependencies
      peerDepsExternal(),
      // Resolve third party dependencies in node_modules
      resolve(),
      // Convert commonjs modules into ES6
      commonjs(),
      // Transpile Typescript code to JS
      typescript({ tsconfig: './tsconfig.json' }),
      // Merge our scss files into a single css file
      postcss({
        extract: 'css/supernova-ui.min.css',
        plugins: [autoprefixer()],
        minimize: true,
      }),
      // Minify bundle
      terser(),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    // create single d.ts
    plugins: [
      dts({
        // use paths from tsconfig file
        compilerOptions: {
          baseUrl: tsConfig.compilerOptions.baseUrl,
          paths: tsConfig.compilerOptions.paths,
        },
      }),
    ],
    // ignore styles
    external: [/\.scss$/],
  },
];
