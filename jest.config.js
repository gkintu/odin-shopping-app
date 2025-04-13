// jest.config.js (Example)
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Optional setup file
  moduleNameMapper: {
    // Handle CSS imports
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
     // Handle static assets
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
     // Use babel-jest to transpile tests with the next/babel preset
     // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
     '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['@babel/preset-env', ['@babel/preset-react', {"runtime": "automatic"}]] }],
   },
   transformIgnorePatterns: [ // Often needed for node_modules
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};