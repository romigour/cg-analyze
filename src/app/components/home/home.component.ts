import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GridComponent} from "../grid/grid.component";
import {SearchComponent} from "../search/search.component";

@Component({
    selector: 'cg-home',
    standalone: true,
    imports: [
        FormsModule,
        SearchComponent,
        GridComponent,
    ],
    template: `
       <cg-search></cg-search>
       <cg-grid></cg-grid> a
    `,
    styles: `
    `
})
export class HomeComponent {

}
