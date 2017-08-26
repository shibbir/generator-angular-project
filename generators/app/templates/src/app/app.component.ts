import { Component, OnInit } from '@angular/core';<% if(foundation) { %>

declare let $: any;<% } %>

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
    ngOnInit() {
        console.log('Application Initialized!');<% if(foundation) { %>
        $(document).foundation();<% } %>
    }
}
