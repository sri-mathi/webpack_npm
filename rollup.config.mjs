import { readFileSync } from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import inject from '@rollup/plugin-inject';
import dts from 'rollup-plugin-dts'; 
import copy from 'rollup-plugin-copy';
import image from '@rollup/plugin-image';

const pkg = JSON.parse(readFileSync("./package.json", "utf8"));
export default [ 
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      inject({
        process: "process/browser", 
      }),
      // Simple image plugin that inlines SVGs as data URIs
      image(),
      json(),
      resolve({
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.svg'],
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({ 
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "./dist/types" 
      }),
      // Copy original SVGs as fallback
      copy({
        targets: [
          { src: 'src/assets/*.svg', dest: 'dist/assets' },
          { src: 'src/assets/*.svg', dest: 'dist' }
        ],
        flatten: true
      }),
    ],
    onwarn(warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY' && /d3/.test(warning.message)) return;
      warn(warning);
    },
    external: ["react", "react-dom", "util"],
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
]