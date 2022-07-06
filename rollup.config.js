import autoprefixer from 'autoprefixer';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const packageJson = require('./package.json');

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
      // Automatically externalize peerDependencies in a rollup bundle.
      peerDepsExternal(),
      // Locate modules using the Node resolution algorithm,
      // for using third party modules in node_modules
      resolve(),
      // A Rollup plugin to convert CommonJS modules to ES6,
      // so they can be included in a Rollup bundle
      commonjs(),
      // A Rollup plugin for seamless integration between Rollup and Typescript.
      typescript({ tsconfig: './tsconfig.json' }),
      // Seamless integration between Rollup and PostCSS.
      postcss({
        extract: 'css/supernova-ui.min.css',
        plugins: [autoprefixer()],
        minimize: true,
      }),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    // create single d.ts
    plugins: [dts()],
    // ignore styles
    external: [/\.scss$/],
  },
];
