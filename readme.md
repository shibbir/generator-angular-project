## Angular-Project generator
> Yeoman generator for scaffold out a front-end project with Angular and TypeScript

[![NPM](https://nodei.co/npm/generator-angular-project.png?compact=true)](https://nodei.co/npm/generator-angular-project/)

[![Build Status](https://travis-ci.org/shibbir/generator-angular-project.svg?branch=master)](https://travis-ci.org/shibbir/generator-angular-project)
[![CircleCI](https://circleci.com/gh/shibbir/generator-angular-project.svg?style=shield)](https://circleci.com/gh/shibbir/generator-angular-project)
[![Dependencies Status](https://david-dm.org/shibbir/generator-angular-project/status.svg)](https://david-dm.org/shibbir/generator-angular-project)
[![Coverage Status](https://coveralls.io/repos/github/shibbir/generator-angular-project/badge.svg?branch=master)](https://coveralls.io/github/shibbir/generator-angular-project?branch=master)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)

## Installation

You need to have latest version of [Node.js](https://nodejs.org/en/) installed on your machine before running the followings:

```bash
npm install -g yo generator-angular-project
```

Make a new directory, and cd into it:
```bash
mkdir my-new-project && cd $_
```

Run `yo angular-project`, optionally passing an app name:
```bash
yo angular-project [app-name]
```

That'll generate a project including:

- Configured `package.json` file
- [Gulp](http://gulpjs.com/) task runner integration
- Plain CSS, [Bootstrap](http://getbootstrap.com/) or [Foundation](http://foundation.zurb.com/) integration
- Either [Webpack](https://webpack.github.io/) or [SystemJS](https://github.com/systemjs/systemjs) integration
- [Karma](https://karma-runner.github.io/) unit test runner
- End-to-end tests with [Protractor](http://www.protractortest.org/)
- [Istanbul](https://gotwarlost.github.io/istanbul/) code coverage
- [TSLint](https://palantir.github.io/tslint/) linting for the TypeScript language
- [License](https://spdx.org/licenses/)

## Running Unit Tests
```bash
npm test

# Generate code coverage report
npm run coverage
```

## License
<a href="https://opensource.org/licenses/MIT">The MIT License</a> Copyright &copy; 2017 Shibbir Ahmed
