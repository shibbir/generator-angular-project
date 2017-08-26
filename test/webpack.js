'use strict';

const assert = require('yeoman-assert');
const generateFullProject = require('./utils').generateFullProject;

describe('app:webpack', function() {
    before(function () {
        return generateFullProject().withPrompts({ moduleLoader: 'webpack' }).toPromise();
    });

    it('reference webpack dependencies in package.json', function() {
        assert.fileContent('package.json', /"css-loader": "\^0.28.5"/);
        assert.fileContent('package.json', /"extract-text-webpack-plugin": "\^3.0.0"/);
        assert.fileContent('package.json', /"file-loader": "\^0.11.2"/);
        assert.fileContent('package.json', /"html-loader": "\^0.5.1"/);
        assert.fileContent('package.json', /"html-webpack-plugin": "\^2.30.1"/);
        assert.fileContent('package.json', /"null-loader": "\^0.1.1"/);
        assert.fileContent('package.json', /"raw-loader": "\^0.5.1"/);
        assert.fileContent('package.json', /"style-loader": "\^0.18.2"/);
        assert.fileContent('package.json', /"awesome-typescript-loader": "\^3.2.3"/);
        assert.fileContent('package.json', /"webpack": "\^3.5.5"/);
        assert.fileContent('package.json', /"webpack-dev-server": "\^2.7.1"/);
        assert.fileContent('package.json', /"webpack-merge": "\^4.1.0"/);
    });

    it('generate webpack related files', function() {
        assert.file([
            'karma.conf.js',
            'config/karma.conf.js',
            'config/karma-test-shim.js',

            'webpack.config.js',
            'config/webpack.common.js',
            'config/webpack.dev.js',
            'config/webpack.prod.js',
            'config/webpack.test.js',

            'src/polyfills.ts',
            'src/vendor.ts',
            'src/main.ts'
        ]);
    });
});
