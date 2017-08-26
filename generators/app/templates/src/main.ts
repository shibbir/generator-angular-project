import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

<% if (webpack) { %>import { AppModule } from './app/app.module';<% } %><% if (systemjs) { %>import { AppModule } from './app.module';<% } %>
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
