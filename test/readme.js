'use strict';

const assert = require('yeoman-assert');
const generateFullProject = require('./utils').generateFullProject;

describe('app:readme', function() {
    before(function() {
        return generateFullProject().toPromise();
    });

    it('generate readme.md file', function() {
        assert.file('README.md');
    });
});
