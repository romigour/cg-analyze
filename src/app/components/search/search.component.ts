import {Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Subject, switchMap, tap} from 'rxjs';
import {CgApiService} from '../../services/cg-api.service';
import {Card} from "primeng/card";
import {FloatLabel} from "primeng/floatlabel";
import {Button} from "primeng/button";

@Component({
    selector: 'cg-search',
    imports: [
        FormsModule,
        InputText,
        Card,
        FloatLabel,
        Button
    ],
    standalone: true,
    template: `
        <p-card styleClass="h-full" header="Recherche">
            <div class="flex gap-4 pt-4">
                <p-floatlabel variant="on" class="w-full">
                    <input class="w-full" pInputText id="sessionHandle" [(ngModel)]="sessionHandle"
                           autocomplete="off"/>
                    <label for="sessionHandle">Test Session Handle</label>
                </p-floatlabel>
                <p-button label="Charger" icon="pi pi-search" iconPos="left"
                          [loading]="loading()" (click)="loadHistory$$.next()"/>
            </div>
        </p-card>
    `,
    styles: `
    `
})
export class SearchComponent {
    // public sessionHandle = signal('7083325461e3689408098a523504154a30867fe7');
    public sessionHandle = signal('6848817770ddc0518280ded68f453b0159ab6310');
    protected readonly loadHistory$$ = new Subject<void>();

    protected readonly loading = signal(false);
    readonly #cgApiService = inject(CgApiService);

    constructor() {
        this.loadHistory$$.pipe(
            tap(() => this.loading.set(true)),
            switchMap(() => this.#cgApiService.loadHistory(this.sessionHandle())
                .pipe(tap(() => this.#cgApiService.updateParams({})), tap(() => this.loading.set(false)))),
            takeUntilDestroyed(),
        ).subscribe();
    }
}
