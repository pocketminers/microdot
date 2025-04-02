import { pathsToModuleNameMapper } from "ts-jest";

import tsconfig from "./tsconfig.json" assert { type: "json" };

export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "__coverage__/",
    coverageProvider: "v8",
    maxWorkers: 5,
    testEnvironment: "node",
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "/docs/", "/__coverage__/"],
    roots: [
        "<rootDir>src",
        "<rootDir>/__tests__"
    ],
    moduleDirectories: ["node_modules"],
    moduleFileExtensions: [
        "js",
        "ts",
        "json",
        "node"
    ],
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: "<rootDir>/" }),
    transform: {
        "^.+\\.(ts)$": [ "ts-jest", {
            tsconfig: "<rootDir>/tsconfig.json"
        }],
    },
    extensionsToTreatAsEsm: [".ts"],
    transformIgnorePatterns: [
        "/node_modules/"
    ],
    detectOpenHandles: true,
    verbose: true,
    testTimeout: 30000,
};
