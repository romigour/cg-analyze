import {Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {filter, map, merge, Subject, switchMap} from 'rxjs';
import {CodingameService} from '../../services/codingame.service';
import {Card} from "primeng/card";
import {FloatLabel} from "primeng/floatlabel";
import {Button} from "primeng/button";
import {SearchService} from '../../services/search.service';

@Component({
    selector: 'cg-search',
    imports: [
        FormsModule,
        InputText,
        Card,
        FloatLabel,
        Button,
    ],
    standalone: true,
    template: `
        <p-card styleClass="h-full" header="Recherche">
            <div class="flex gap-4 pt-4">
                <p-floatlabel variant="on" class="w-full">
                    <input #input class="w-full" pInputText id="sessionHandle" minlength="40" maxlength="40" required
                           #inputModel="ngModel" [(ngModel)]="sessionHandle" autocomplete="off"/>
                    <label for="sessionHandle">Test Session Handle</label>
                </p-floatlabel>
                <p-button label="Charger" icon="pi pi-search" iconPos="left"
                          [disabled]="inputModel.invalid"
                          [loading]="loading()" (click)="loadHistory$$.next()"/>
            </div>
        </p-card>
    `,
    styles: `
    `
})
export class SearchComponent {
    public sessionHandle = signal('6848817770ddc0518280ded68f453b0159ab6310'); // hypersonic
    // public sessionHandle = signal('3372496499d74e5b906d6cf10a15e9e6b81a4b70'); // fall challenge 2020
    // protected sessionHandle = signal(null);

    protected readonly loadHistory$$ = new Subject<void>();
    readonly #codingameService = inject(CodingameService);
    readonly #searchService = inject(SearchService);
    protected readonly loading = toSignal(merge(
        this.loadHistory$$.pipe(map(() => true)),
        this.#searchService.resultGame$.pipe(map(() => false)),
    ), {initialValue: false});

    constructor() {
        this.loadHistory$$.pipe(
            map(() => this.sessionHandle()),
            filter(Boolean),
            switchMap((sessionHandle) => this.#codingameService.loadHistory(sessionHandle)),
            takeUntilDestroyed(),
        ).subscribe();
    }
}
