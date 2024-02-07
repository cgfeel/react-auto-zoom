module.exports = {
    // extends: ['airbnb-base', 'plugin:flowtype/recommended', 'prettier'],
    // 定义文件继承的子规范
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        "prettier"
    ],
    // plugins: ['flowtype'],
    plugins: ['@typescript-eslint'], // 定义了该eslint文件所依赖的插件
    env: {
      browser: true,
      node: true,
      es6: true,
      commonjs: true,
      jest: true
    },
    // parser: '@babel/eslint-parser',
    parser:  '@typescript-eslint/parser', // 定义ESLint的解析器
    settings: {
        "react": {
            "pragma": "React",
            "version": "detect"
        }
    },
    parserOptions: {
        "ecmaVersion": 2019,
        "sourceType": 'module',
        "ecmaFeatures": {
            jsx: true
        }
      /* requireConfigFile: false,
      babelOptions: {
        babelrc: false,
        configFile: false,
        // your babel options
        presets: ["@babel/preset-env"],
      }, */
    },
    rules: {
      'class-methods-use-this': 'off',
      'comma-dangle': 'off',
      'global-require': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'max-len': 'off',
      'no-underscore-dangle': 'off',
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off"
    }
  };
