module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleDirectories: ['node_modules', 'src'],
    roots: ['<rootDir>/src/', '<rootDir>/tests/'],
    testEnvironment: 'jsdom',
    moduleNameMapper: { '\\.(css|less)$': 'identity-obj-proxy' },
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(test).[jt]s?(x)'],
};
