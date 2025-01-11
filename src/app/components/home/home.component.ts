import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GridComponent} from "../grid/grid.component";
import {InformationComponent} from "../information/information.component";
import {FilterComponent} from "../filter/filter.component";
import {SearchComponent} from "../search/search.component";
import {NoticeComponent} from "../notice/notice.component";

@Component({
    selector: 'cg-home',
    standalone: true,
    imports: [
        FormsModule,
        SearchComponent,
        GridComponent,
        InformationComponent,
        FilterComponent,
        NoticeComponent,
    ],
    template: `
        <div class="flex flex-col h-full gap-4">
            <h1>CG Analyze</h1>
            <div class="grid grid-cols-2 gap-4">
                <cg-search></cg-search>
                <cg-notice></cg-notice>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <cg-filter></cg-filter>
                <cg-information></cg-information>
            </div>
            <cg-grid></cg-grid>
        </div>
    `,
    styles: `
        .loader-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--p-surface-500);
            opacity: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999; /* Pour être au-dessus de tous les autres éléments */
        }
    `
})
export class HomeComponent {
}
