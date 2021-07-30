module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: [
        '<rootDir>/.next/',
        '<rootDir>/node_modules/',
        '<rootDir>/src/store/',
    ],
    moduleDirectories: ['node_modules', 'src'],
    testEnvironment: 'jsdom',
    moduleNameMapper: { '\\.(css|less)$': 'identity-obj-proxy' },
};
