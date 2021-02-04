module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.svg$": "<rootDir>/misc/svgTransform.js"
  }
};