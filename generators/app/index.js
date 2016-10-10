'use strict';

let generators = require('yeoman-generator');
let yosay = require('yosay');
let path = require('path');
let _ = require('lodash');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
    },

    initializing: function() {
        this.log(yosay('Hello, and welcome to angular2-typescript generator!'));
        this.argument('appname', { type: String, required: false });
        this.appname = _.kebabCase(this.appname || path.basename(process.cwd()));

        this.sourceRoot(path.join(__dirname, 'templates'));

        this.angularPackages = [];
        this.webpack = null;
        this.systemjs = null;
        this.bootstrap = null;
        this.foundation = null;
        this.jquery = null;
        this.gulp = null;
    },

    prompting: function() {
        let done = this.async();

        let prompts = [
            {
                type    : 'list',
                name    : 'css',
                message : 'Which CSS framework would you like to use?',
                choices : [{
                    value   : 'none',
                    name    : 'None',
                    checked : true
                }, {
                    value   : 'bootstrap',
                    name    : 'Bootstrap',
                    checked : false
                }, {
                    value   : 'foundation',
                    name    : 'Foundation',
                    checked : false
                }]
            },
            {
                type    : 'list',
                name    : 'moduleLoader',
                message : 'Which module loader would you like to use?',
                choices: [{
                    value   : 'webpack',
                    name    : 'Webpack',
                    checked : true
                }, {
                    value   : 'systemjs',
                    name    : 'SystemJS',
                    checked : false
                }]
            },
            {
                when: function (response) {
                    if(response.moduleLoader === 'webpack') {
                        return true;
                    }
                    return false;
                },
                type    : 'confirm',
                name    : 'gulp',
                message : 'Would you like to use Gulp?'
            },
            {
                type    : 'checkbox',
                name    : 'angularPackages',
                message : 'Which additional angular packages would you like to include?',
                choices: [{
                    value   : '@angular/forms',
                    name    : '@angular/forms',
                    checked : false
                }, {
                    value   : '@angular/http',
                    name    : '@angular/http',
                    checked : false
                }]
            }
        ];

        this.prompt(prompts).then(function(answers) {
            if(answers.css === 'bootstrap') {
                this.jquery = true;
                this.bootstrap = true;
            } else if(answers.css === 'foundation') {
                this.jquery = true;
                this.foundation = true;
            }

            if(answers.moduleLoader === 'webpack') {
                this.webpack = true;

                if(answers.gulp) {
                    this.gulp = true;
                }
            } else if(answers.moduleLoader === 'systemjs') {
                this.systemjs = true;
                this.gulp = true;
            }

            answers.angularPackages.forEach(p => this.angularPackages[p] = p);

            done();
        }.bind(this));
    },

    configuring: function() {
        this.template('root/gitignore', '.gitignore');
        this.template('root/gitattributes', '.gitattributes');
        this.template('root/.editorconfig', '.editorconfig');
        this.template('root/tsconfig.json', 'tsconfig.json');
        this.template('root/_tslint.json', 'tslint.json');
        this.template('root/_package.json', 'package.json');
    },

    default: function() {
        this.composeWith('license', null, {
            local: require.resolve('generator-license/app')
        });

        this.composeWith('readme', null, {
            local: require.resolve('../readme')
        });
    },

    writing: function() {
        if(this.systemjs) {
            this.template('systemjs/systemjs.config.js', 'src/systemjs.config.js');
            this.template('systemjs/gulpfile.js', 'gulpfile.js');
            this.template('src/main.ts', 'src/app/main.ts');
        }

        if(this.webpack) {
            this.template('webpack/config/helpers.js', 'config/helpers.js');
            this.template('webpack/karma.conf.js', 'karma.conf.js');
            this.template('webpack/config/karma-test-shim.js', 'config/karma-test-shim.js');

            this.template('webpack/webpack.config.js', 'webpack.config.js');
            this.template('webpack/config/webpack.common.js', 'config/webpack.common.js');
            this.template('webpack/config/webpack.dev.js', 'config/webpack.dev.js');
            this.template('webpack/config/webpack.prod.js', 'config/webpack.prod.js');
            this.template('webpack/config/webpack.test.js', 'config/webpack.test.js');

            this.template('webpack/polyfills.ts', 'src/polyfills.ts');
            this.template('webpack/vendor.ts', 'src/vendor.ts');
            this.template('src/main.ts', 'src/main.ts');

            if(this.gulp) {
                this.template('webpack/gulpfile.js', 'gulpfile.js');
            }
        }

        this.template('src/index.html', 'src/index.html');
        this.template('src/css/main.css', 'src/css/main.css');

        this.template('src/app/app.component.ts', 'src/app/app.component.ts');
        this.template('src/app/app.module.ts', 'src/app/app.module.ts');
        this.template('src/app/app.routing.ts', 'src/app/app.routing.ts');
        this.template('src/app/app.component.html', 'src/app/app.component.html');
        this.template('src/app/app.component.spec.ts', 'src/app/app.component.spec.ts');

        this.template('src/app/home/home.component.ts', 'src/app/home/home.component.ts');
        this.template('src/app/home/home.component.html', 'src/app/home/home.component.html');
        this.template('src/app/home/home.component.spec.ts', 'src/app/home/home.component.spec.ts');

        this.template('src/app/about/about.component.ts', 'src/app/about/about.component.ts');
        this.template('src/app/about/about.component.html', 'src/app/about/about.component.html');
        this.template('src/app/about/about.component.spec.ts', 'src/app/about/about.component.spec.ts');
    },

    install: function() {
        this.installDependencies({
            skipMessage: this.options['skip-install-message'],
            skipInstall: this.options['skip-install'],
            bower: false,
            npm: true
        });
    }
});
