// __mocks__/fileMock.js
module.exports = 'test-file-stub';// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }] // Important for JSX
  ],
};