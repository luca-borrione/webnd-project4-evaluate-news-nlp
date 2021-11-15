module.exports = {
  automock: false,
  coveragePathIgnorePatterns: ['<rootDir>/src/js/utils/index.js'],
  modulePathIgnorePatterns: ['<rootDir>/.history/', '<rootDir>/dist/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  snapshotResolver: '<rootDir>/snapshotResolver.js',
  watchPathIgnorePatterns: ['<rootDir>/node_modules'],
};
