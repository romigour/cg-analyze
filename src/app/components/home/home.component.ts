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
    ],
    template: `
        <div class="flex flex-col h-full gap-4">
            <h1>CG Analyze</h1>
            <cg-search></cg-search>
            <cg-grid></cg-grid>
            {{greetingMessage}}
        </div>
    `,
    styles: `
    `
})
export class HomeComponent {

    greetingMessage = "";

    loadHistoryBattles(sessionHandle: string): void {

        // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
        invoke<string>("load_history_battles", {sessionHandle}).then((text) => {
            this.greetingMessage = text;
        });
    }

    constructor() {
        //this.loadHistoryBattles('Romain');
    }
}
