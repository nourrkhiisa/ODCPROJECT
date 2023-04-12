module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules", "src"],
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)", // <-- Add this line
  ],
};
