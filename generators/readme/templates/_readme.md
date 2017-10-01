## <%= appname %>
> This project is generated with [generator-angular-project](https://github.com/shibbir/generator-angular-project) version <%= version %>.<% if (license === 'MIT') { %>

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)<% } %>

## Installation

You need to have latest version of [Yarn](https://yarnpkg.com/en/) installed on your machine before running the followings:

```bash
$ yarn start
```

## TypeScript Linting
```bash
$ yarn tslint
```

## Production Build
```bash
$ yarn build
```

## Running Unit Tests
```bash
$ yarn test
```

## Running End-to-End Tests
```bash
# make sure you have a running app
$ yarn e2e
```<% if (license) { %>

## License
<a href="https://opensource.org/licenses/<%= license %>"><%= license %> License</a><% } %>
