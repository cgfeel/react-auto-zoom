import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import eslint from "@rollup/plugin-eslint";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

const babelConfig = {
    exclude: 'node_modules/**',
    ignore: ["node_modules/**"],
    plugins: [
        // 解决多个地方使用相同代码导致打包重复的问题
        ["@babel/plugin-transform-runtime"]
    ],
    presets: [
        [
            "@babel/preset-env",
            {
                "modules": false,
                "useBuiltIns": "usage",
                "corejs": "3.34.0",
                "target": {
                    "ie": 10
                }
            }
        ],
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript"
    ]
};

export default {
    input: 'components/index.ts',
    plugins: [
        alias({
            resolve: ['.js']
        }),
        babel(babelConfig),
        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            include: 'node_modules/**'
        }),
        eslint({
            include: ['components/**/*.ts'],
        }),
        nodeResolve({
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        }),
        postcss({
            extensions: [".css"],
            minimize: true,
            // modules: true,   // 库不需要重命名样式
            namedExports: true,
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            preventAssignment: true
        }),
        typescript()
    ]
};
