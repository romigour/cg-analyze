import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SearchService} from "../../services/search.service";
import {FloatLabel} from "primeng/floatlabel";
import {Card} from "primeng/card";
import {SelectButton} from "primeng/selectbutton";
import {InputText} from "primeng/inputtext";

@Component({
    selector: 'cg-filter',
    imports: [
        FormsModule,
        FloatLabel,
        Card,
        SelectButton,
        InputText

    ],
    standalone: true,
    template: `
        <p-card styleClass="flex gap-4 w-full h-full" header="Filtre">
            <div class="flex gap-4 w-full justify-between">
                <div class="form-field">
                    <label>Statut</label>
                    <p-selectbutton [options]="filterStatus" [(ngModel)]="status" (ngModelChange)="applyStatus($event)"
                                    optionLabel="label" optionValue="value"
                                    aria-labelledby="basic"/>

                </div>
                <div class="form-field">
                    <label>Recherche par texte</label>
                    <p-floatlabel variant="on" styleClass="w-full">
                        <input #input class="w-full" pInputText id="searchTerm"
                               #inputModel="ngModel" [(ngModel)]="searchTerm" (ngModelChange)="applySearchTerm($event)"
                               autocomplete="off"/>
                        <label for="sessionHandle"></label>
                    </p-floatlabel>
                </div>
            </div>
        </p-card>
    `,
    styles: `
        .form-field {
            display: grid;
            row-gap: 0.25rem;

            label {
                color: var(--p-text-muted-color);
                font-size: 0.875rem;
            }

            p {
                margin-block: 0;

                &:empty:after {
                    content: '-';
                }
            }
        }
    `
})
export class FilterComponent {
    readonly #searchService = inject(SearchService);

    protected filterStatus: any[] = [
        {label: 'Tous', value: 'All'},
        {label: 'Gagné', value: 'Win'},
        {label: 'Egalité', value: 'Draw'},
        {label: 'Perdu', value: 'Lost'},
        {label: 'Timeout', value: 'Timeout'},
        {label: 'Warning', value: 'Warning'},
    ];

    protected status = 'All';
    protected searchTerm: string = '';

    public applyStatus(status: string): void {
        this.#searchService.updateParams({status});
    }

    public applySearchTerm(searchTerm: string): void {
        this.#searchService.updateParams({searchTerm});
    }
}
