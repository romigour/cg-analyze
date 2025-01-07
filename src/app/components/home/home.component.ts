import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GridComponent} from "../grid/grid.component";
import {SearchComponent} from "../search/search.component";
import {TopbarComponent} from "../topbar/topbar.component";
import {invoke} from "@tauri-apps/api/core";

@Component({
    selector: 'cg-home',
    standalone: true,
    imports: [
        FormsModule,
        SearchComponent,
        GridComponent,
        TopbarComponent,
    ],
    template: `
        <cg-topbar></cg-topbar>
       <cg-search></cg-search>
       <cg-grid></cg-grid>
        
        {{greetingMessage}}
    `,
    styles: `
    `
})
export class HomeComponent {

    greetingMessage = "";

    greet(name: string): void {

        // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
        invoke<string>("greet", {name}).then((text) => {
            this.greetingMessage = text;
        });
    }

    constructor() {
        this.greet('Romain');
    }
}
