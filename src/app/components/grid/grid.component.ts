import {Component, computed, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TableModule} from "primeng/table";
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {map, tap} from 'rxjs';
import {SearchService} from '../../services/search.service';
import {CodingameService} from '../../services/codingame.service';

@Component({
    selector: 'cg-grid',
    standalone: true,
    imports: [
        FormsModule,
        TableModule
    ],
    template: `
        <p-table [value]="resultGame()" [scrollable]="true"
                 [tableStyle]="{ 'min-width': '50rem', 'text-align': 'center' }"
                 [loading]="loading()">
            <ng-template #header>
                <tr>
                    <th>#</th>
                    <th style="text-align: center">Statut</th>
                    <th style="text-align: center">Position</th>
                    <th style="text-align: center">Pseudo</th>
                    <th style="text-align: center">Classement</th>
                    <th style="text-align: center">Elo</th>
                    <th style="text-align: center">Ecart score</th>
                    <th width="80px" style="text-align: center">Actions</th>
                </tr>
            </ng-template>
            <ng-template #body let-result>
                <tr>
                    <td>{{ result.idxGame }}</td>
                    <td style="text-align: center">
                        <div class="w-full flex justify-center">
                            @if (result.status === 'Win') {
                                <img class="cursor-pointer" src="assets/icons/valid.png" width="16"
                                     height="16" priority>
                            } @else if (result.status === 'Timeout') {
                                <img class="cursor-pointer" src="assets/icons/timeout.png" width="16" height="16"
                                     priority>
                            } @else if (result.status === 'Warning') {
                                <img class="cursor-pointer" src="assets/icons/warning.png" width="16" height="16"
                                     priority>
                            } @else {
                                <img class="cursor-pointer" src="assets/icons/lost.png" width="16" height="16" priority>
                            }
                        </div>
                    </td>
                    <td>
                        <div class="flex justify-center w-full">
                            @if (result.position === 1) {
                                <img class="cursor-pointer" src="assets/icons/win.png" width="16" height="16" priority>
                            } @else {
                                {{ result.position }}
                            }
                        </div>
                    </td>
                    <td>
                        <div class="flex flex-col">
                            @for (opposant of result.opposants; track $index) {
                                <div>{{ opposant.pseudo }}</div>
                            }
                        </div>
                    </td>
                    <td style="text-align: center">
                        <div class="flex flex-col">
                            @for (opposant of result.opposants; track $index) {
                                <div>{{ opposant.rank }}</div>
                            }
                        </div>
                    </td>
                    <td style="text-align: center">
                        <div class="flex flex-col">
                            @for (opposant of result.opposants; track $index) {
                                <div>
                                    {{ opposant.score }}
                                </div>
                            }
                        </div>
                    </td>
                    <td style="text-align: center">{{ result.ecartScore }}</td>
                    <td>
                        <div class="flex justify-center w-full">
                            <img class="cursor-pointer" src="assets/icons/open_link.png" width="16" height="16"
                                 (click)="openReplay(result.idGame)" priority>
                        </div>
                    </td>
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
    readonly updateCg$ = this.#codingameService.update$$.pipe(tap(() => this.#searchService.updateParams({})));
    readonly #resultGame = toSignal(
        this.#searchService.resultGame$
            .pipe(
                map((battles) => (
                    {loading: false, battles: battles})),
            ),
        {initialValue: {loading: false, battles: []}},
    );
    protected readonly loading = computed(() => this.#resultGame().loading);
    protected readonly resultGame = computed(() => this.#resultGame().battles);

    constructor() {
        this.updateCg$.pipe(takeUntilDestroyed()).subscribe();
    }

    openReplay(idGame: string) {
        window.open('https://www.codingame.com/replay/' + idGame, "_blank");
    }
}
