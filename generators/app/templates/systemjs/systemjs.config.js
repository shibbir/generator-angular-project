(function(global) {
    let paths = {
        'npm:': 'node_modules/'
    };

    let map = {
        'app': 'app',
        'environments': 'environments',
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',<% if (ngPackages.ngHttp) { %>
        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',<% } %>
        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',<% if (ngPackages.ngForms) { %>
        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',<% } %>
        'rxjs': 'npm:rxjs'
    };

    let packages = {
        app: {
            defaultExtension: 'js',
            meta: {
                './*.js': {
                    loader: 'systemjs-angular-loader.js'
                }
            }
        },
        environments: { defaultExtension: 'js' },
        rxjs: { defaultExtension: 'js' }
    };

    System.config({ paths, map, packages });
})(this);
