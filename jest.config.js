const { defaults: tsjPreset } = require("ts-jest/jest-preset")

module.exports = {
	...tsjPreset,
	preset: "jest-expo",
	globals: {
		"ts-jest": {
			babelConfig: true,
		}
	},
	transformIgnorePatterns: [
		"<rootDir>/node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"],
	testPathIgnorePatterns: ["<rootDir/node_modules/", "@react-native", "/e2e"],
	setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect", '<rootDir>/jest.setup.js'],
	collectCoverage: true,
	coverageReporters: ["html"],
}
