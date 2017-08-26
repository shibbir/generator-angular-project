import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';<% if (ngPackages.ngForms) { %>
import { FormsModule } from '@angular/forms';<% } %><% if (ngPackages.ngHttp) { %>
import { HttpModule, JsonpModule } from '@angular/http';<% } %>

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';<% if (webpack) { %>

<% if (bootstrap || foundation) { %>
<% if (bootstrap) { %>import 'bootstrap/dist/css/bootstrap.css';<% } %><% if (foundation) { %>import 'foundation-sites/dist/css/foundation.css';<% } %><% } %>
import '../styles/main.css';<% } %>

@NgModule({
    imports: [
        BrowserModule,<% if (ngPackages.ngForms) { %>
        FormsModule,<% } %><% if (ngPackages.ngHttp) { %>
        HttpModule,
        JsonpModule,<% } %>
        AppRoutingModule,
        HomeModule,
        AboutModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule {}
