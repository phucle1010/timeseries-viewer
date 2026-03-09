/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.(ts|tsx|js|jsx)", "**/*.(spec|test).(ts|tsx|js|jsx)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^nuqs$": "<rootDir>/src/test/mocks/nuqs.ts",
    "^nuqs/server$": "<rootDir>/src/test/mocks/nuqs.ts",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: false,
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },
  collectCoverageFrom: [
    "lib/helpers/**/*.{js,jsx,ts,tsx}",
    "lib/api/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!<rootDir>/out/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.{js,ts}",
    "!<rootDir>/coverage/**",
  ],
  coverageReporters: ["text", "lcov", "html"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transformIgnorePatterns: [
    "/node_modules/(?!(nuqs|lucide-react)/)",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
