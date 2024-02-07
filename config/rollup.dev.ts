import { RollupOptions } from "rollup";
import livereload from 'rollup-plugin-livereload';
import serve from "rollup-plugin-serve";
import packageMode from "../package.json" assert { type: 'json' };
import baseConfig from "./rollup.base";

const { name } = packageMode;
const config: RollupOptions = {
    ...baseConfig,
    input: './src/index.tsx',
    plugins: [
        ...baseConfig.plugins,
        livereload(),
        serve({
            port: 8080,
            contentBase: ['dist']
        })
    ],
    output: [
        {
            file: `dist/lib/${name}.js`,
            format: 'iife',
            sourcemap: 'inline',
            inlineDynamicImports: true
        }
        /*{
            file: `lib/${name}.js`,
            format: 'umd',
            sourcemap: true,
            name
        },
        {
            file: `lib/${name}.cjs.js`,
            format: 'cjs',
            sourcemap: 'inline',
            name
        }*/
    ]
};

export default config;
