/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/components/$1",
        '\\.(css|less|scss)$': 'identity-obj-proxy'
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/__tests__/*.test.ts?(x)']
};
