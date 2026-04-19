import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import autoprefixer from 'autoprefixer';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

// eslint-disable-next-line
import packageJson from './package.json' with { type: 'json' };
// eslint-disable-next-line
import tsConfig from './tsconfig.json' with { type: 'json' };

export default [
  {
    // Pass 1: JS/CSS Bundle
    input: 'src/index.ts',
    output: [
      { file: packageJson.main, format: 'cjs', sourcemap: true },
      { file: packageJson.module, format: 'esm', sourcemap: true },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
      }),
      postcss({
        extract: 'css/supernova-ui.min.css',
        plugins: [autoprefixer()],
        minimize: true,
      }),
      terser(),
    ],
  },
  {
    // Pass 2: Type Bundling
    // CHANGE THIS: Point directly to src/index.ts
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [
      dts({
        // This ensures the plugin respects your path aliases (@components, etc.)
        compilerOptions: {
          baseUrl: 'src',
          paths: tsConfig.compilerOptions.paths,
        },
      }),
    ],
    // ignore styles
    external: [/\.scss$/, /\.css$/],
  },
];
