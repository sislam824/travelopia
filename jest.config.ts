// jest.config.js
module.exports = {
  preset: "ts-jest", // Use ts-jest for TypeScript support
  testEnvironment: "jest-environment-jsdom", // Specify the JSDOM environment
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy", // Handle CSS imports
  },
};
