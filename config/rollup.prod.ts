import uglify from "@lopatnov/rollup-plugin-uglify";
import { RollupOptions } from "rollup";
import filesize from "rollup-plugin-filesize";
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import packageMode from "../package.json" assert { type: 'json' };
import baseConfig from "./rollup.base";

// banner
const banner =
    `${'/*!\n' + ' * '}${name}.js v${version}\n` +
    ` * (c) 2023-${new Date().getFullYear()} ${author}\n` +
    ` * Released under the ${license} License.\n` +
    ` */`;

const external = [
    "react",
    "react-dom",
    "**/node_modules/**",
];

const globals = {
    react: "React",
};

const { author, license, name, version } = packageMode;
const config: RollupOptions = [
    {
        ...baseConfig,
        output: [
            {
                file: `lib/${name}.js`,
                format: 'umd',
                sourcemap: true,
                banner,
                globals,
                name
            },
            {
                file: `lib/${name}.cjs.js`,
                format: 'cjs',
                banner
            },
            {
                file: `lib/${name}.esm.js`,
                format: 'es',
                banner
            }
        ],
        plugins: [
            ...baseConfig.plugins,
            filesize(),
            peerDepsExternal()
        ],
        external
    },
    {
        ...baseConfig,
        output: [
            {
                file: `lib/${name}.min.js`,
                format: 'umd',
                banner,
                globals,
                name
            }
        ],
        plugins: [
            ...baseConfig.plugins,
            filesize(),
            uglify({
                compress: {
                    drop_console: true
                }
            })
        ],
        external
    }
];

export default config;
