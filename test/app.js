'use strict';

const assert = require('yeoman-assert');
const generateFullProject = require('./utils').generateFullProject;

describe('app:configuration', function() {
    before(function () {
        return generateFullProject().toPromise();
    });

    it('generate base files', function() {
        assert.file([
            '.gitignore',
            '.gitattributes',
            '.editorconfig',
            'package.json',
            'tsconfig.json',
            'tslint.json',
            'protractor.conf.js',
            'config/helpers.js',
            'config/protractor.conf.js'
        ]);
    });

    it('gulpfile.js should not generated if not selected', function () {
        assert.noFile('gulpfile.js');
    });

    it('generate generic source files', function() {
        assert.file([
            'src/index.html',
            'src/styles/main.css',

            'src/environments/environment.ts',
            'src/environments/environment.prod.ts',

            'src/app/app.module.ts',
            'src/app/app-routing.module.ts',
            'src/app/app.component.ts',
            'src/app/app.component.html',
            'src/app/app.component.e2e.ts',
            'src/app/app.component.spec.ts',

            'src/app/home/home.module.ts',
            'src/app/home/home.component.ts',
            'src/app/home/home.component.html',
            'src/app/home/home.component.e2e.ts',
            'src/app/home/home.component.spec.ts',

            'src/app/about/about.module.ts',
            'src/app/about/about.component.ts',
            'src/app/about/about.component.html',
            'src/app/about/about.component.e2e.ts',
            'src/app/about/about.component.spec.ts'
        ]);
    });
});

describe('app:gulpfile', function () {
    before(function () {
        return generateFullProject().withPrompts({ gulp: true }).toPromise();
    });

    it('generate gulpfile.js if gulp is selected', function () {
        assert.file('gulpfile.js');
    });
});
