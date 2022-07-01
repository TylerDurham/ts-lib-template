// rollup.config.js
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";
import ignore from "rollup-plugin-ignore"
import json from '@rollup/plugin-json';

const config = [
    {
        input: 'build/index.js',
        output: {
            file: './lib/index.js',
            format: 'cjs',
            sourcemap: true,
        },
        plugins: [ignore(["ansi-colors"]), resolve(), typescript(), json()]
    },
    {
        input: 'build/index.d.ts',
        output: {
            file: './lib/index.d.ts',
            format: 'es'
        },
        plugins: [dts()]
    }
];

export default config;