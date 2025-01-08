import {Component, computed, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TableModule} from "primeng/table";
import {toSignal} from "@angular/core/rxjs-interop";
import {CgApiService} from "../../services/cg-api.service";
import {map} from "rxjs";

@Component({
    selector: 'cg-grid',
    standalone: true,
    imports: [
        FormsModule,
        TableModule
    ],
    template: `
        <p-table [value]="battles()" [tableStyle]="{ 'min-width': '50rem' }" [loading]="loading()">
            <ng-template #header>
                <tr>
                    <th>GameId</th>
                </tr>
            </ng-template>
            <ng-template #body let-battles>
                <tr>
                    <td>{{ battles.gameId }}</td>
                </tr>
            </ng-template>
        </p-table>
    `,
    styles: `
    `
})
export class GridComponent {
    readonly test = [
        {nom: 'Toto', prenom: 'Titi', adresse: '16 rue de la cote', age: '21'},
        {nom: 'Toto', prenom: 'Titi', adresse: '16 rue de la cote', age: '21'},
        {nom: 'Toto', prenom: 'Titi', adresse: '16 rue de la cote', age: '21'},
        {nom: 'Toto', prenom: 'Titi', adresse: '16 rue de la cote', age: '21'},
        {nom: 'Toto', prenom: 'Titi', adresse: '16 rue de la cote', age: '21'},
        {nom: 'Toto', prenom: 'Titi', adresse: '16 rue de la cote', age: '21'},
        {nom: 'Toto', prenom: 'Titi', adresse: '16 rue de la cote', age: '21'},
        {nom: 'Toto', prenom: 'Titi', adresse: '16 rue de la cote', age: '21'},
    ]
    readonly #cgApiService = inject(CgApiService);
    readonly #battlesState = toSignal(
        this.#cgApiService.battles$
            .pipe(
                map((battles) => (
                    {loading: false, battles: battles})),
            ),
        {initialValue: {loading: false, battles: []}},
    );

    protected readonly loading = computed(() => this.#battlesState().loading);
    protected readonly battles = computed(() => this.#battlesState().battles);
}
