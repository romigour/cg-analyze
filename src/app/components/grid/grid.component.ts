import {Component, computed, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TableModule} from "primeng/table";
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap, tap } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { CodingameService } from '../../services/codingame.service';

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
                    <th>Joueur</th>
                </tr>
            </ng-template>
            <ng-template #body let-battles>
                <tr>
                    <td>{{ battles.gameId }}</td>
                    <td>{{ battles.players[0].nickname }}</td>
                </tr>
            </ng-template>
        </p-table>
    `,
    styles: `
    `
})
export class GridComponent {
    readonly #codingameService = inject(CodingameService);
    readonly #searchService = inject(SearchService);
    readonly #battlesState = toSignal(
        this.#searchService.battles$
            .pipe(
                map((battles) => (
                    {loading: false, battles: battles})),
            ),
        {initialValue: {loading: false, battles: []}},
    );

    readonly updateCg$ = this.#codingameService.update$$.pipe(tap(() => this.#searchService.updateParams({})));

    protected readonly loading = computed(() => this.#battlesState().loading);
    protected readonly battles = computed(() => this.#battlesState().battles);

    constructor() {
        this.updateCg$.pipe(takeUntilDestroyed()).subscribe();
    }
}
