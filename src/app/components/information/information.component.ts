import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Card} from "primeng/card";
import { InformationService } from '../../services/information.service';
import { tap } from 'rxjs';
import { CodingameService } from '../../services/codingame.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'cg-information',
    imports: [
        FormsModule,
        Card,
    ],
    standalone: true,
    template: `
        <p-card styleClass="h-full" header="Informations">
            <div class="flex gap-4 pt-4">
                <div class="form-field">
                    <label for="pseudo">Pseudo</label>
                    <p>Romain</p>
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
export class InformationComponent {
    readonly #codingameService = inject(CodingameService);
    readonly #informationService = inject(InformationService);

    readonly updateCg$ = this.#codingameService.update$$.pipe(tap(() => this.#informationService.getInformation()));

    constructor() {
        this.updateCg$.pipe(takeUntilDestroyed()).subscribe()
    }
}
