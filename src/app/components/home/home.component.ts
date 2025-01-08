import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GridComponent} from "../grid/grid.component";
import {SearchComponent} from "../search/search.component";
import {InformationComponent} from "../information/information.component";

@Component({
    selector: 'cg-home',
    standalone: true,
    imports: [
        FormsModule,
        SearchComponent,
        GridComponent,
        InformationComponent,
    ],
    template: `
        <div class="flex flex-col h-full gap-4">
            <h1>CG Analyze</h1>
            <div class="grid grid-cols-2 gap-4">
                <cg-search></cg-search>
                <cg-information></cg-information>
            </div>
            <cg-grid></cg-grid>
        </div>
    `,
    styles: `
    `
})
export class HomeComponent {
}
