## <%= appname %>
> This project is generated with [generator-angular-project](https://github.com/shibbir/generator-angular-project) version <%= version %>.<% if (license === 'MIT') { %>

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)<% } %>

## Installation

```bash
$ npm start
```

## TypeScript Linting
```bash
$ npm run tslint
```

## Production Build
```bash
$ npm run build
```

## Running Unit Tests
```bash
$ npm test
```

## Running End-to-End Tests
```bash
# make sure you have a running app
$ npm run e2e
```<% if (license) { %>

## License
<a href="https://opensource.org/licenses/<%= license %>"><%= license %> License</a><% } %>
