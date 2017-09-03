const helpers = require('./helpers');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

const screenshotReporter = new HtmlScreenshotReporter({
    dest: 'target/chrome',
    filename: 'htmlReport.html',
    showQuickLinks: true,
    reportOnlyFailedSpecs: false,
    captureOnlyFailedSpecs: true,
    reportTitle: "E2E Report"
});

const consoleReporter = new SpecReporter({
    spec: {
        displayStacktrace: true
    }
});

exports.config = {
    baseUrl: 'http://localhost:3030/',

    specs: [
        helpers.root('src/**/*.e2e.ts')
    ],

    exclude: [],

    framework: 'jasmine',

    jasmineNodeOpts: {
        showColors: true,
        isVerbose: false,
        includeStackTrace: false,
        print: function() {}
    },

    directConnect: true,

    capabilities: {
        browserName: 'chrome'
    },

    beforeLaunch: function() {
        return new Promise(function(resolve) {
            screenshotReporter.beforeLaunch(resolve);
        });
    },

    onPrepare: function() {
        browser.ignoreSynchronization = false;

        jasmine.getEnv().addReporter(screenshotReporter);
        jasmine.getEnv().addReporter(consoleReporter);
    },

    afterLaunch: function(exitCode) {
        return new Promise(function(resolve) {
            screenshotReporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },

    useAllAngular2AppRoots: true
};
