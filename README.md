## TypeScript setup

https://github.com/RyanCavanaugh/learn-a
https://github.com/facebook/jest/blob/master/tsconfig.json + https://github.com/facebook/jest/blob/master/packages/babel-jest/tsconfig.json
https://medium.com/grand-parade/monorepo-setup-with-lerna-typescript-babel-7-and-other-part-1-ac60eeccba5f

## Jest setup

https://github.com/facebook/jest/blob/master/jest.config.js
https://jestjs.io/docs/en/configuration#projects-array-string-projectconfig

## Goals

- Unit tests run against source
- e2e tests run against compiled source
- Can only import from intended entry points
- Tree shaking must work in Webpack
- No commands ever run from the context of a package (other than installing dependencies)
- Share tooling dependencies (TypeScript, linting/ formatting, Jest)
- Minimal "getting started" process
