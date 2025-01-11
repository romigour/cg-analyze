import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Card} from "primeng/card";
import {InformationService} from '../../services/information.service';
import {switchMap} from 'rxjs';
import {CodingameService} from '../../services/codingame.service';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {NgClass} from "@angular/common";

@Component({
    selector: 'cg-information',
    imports: [
        FormsModule,
        Card,
        NgClass,
    ],
    standalone: true,
    template: `
        <p-card styleClass="h-full overflow-auto" header="Information">
            @if (information(); as information) {
                <div class="flex justify-between w-full">
                    <div class="form-field">
                        <label for="pseudo">Pseudo</label>
                        <p>{{ information.pseudo }}</p>
                    </div>
                    <div class="form-field">
                        <label for="pseudo">Total</label>
                        <p class="text-center">{{ information.totalGame }}</p>
                    </div>
                    <div class="form-field">
                        <label for="pseudo">Gagné</label>
                        <p class="text-center">{{ information.totalWin }}</p>
                    </div>
                    <div class="form-field">
                        <label for="pseudo">Egalité</label>
                        <p class="text-center">{{ information.totalDraw }}</p>
                    </div>
                    <div class="form-field">
                        <label for="pseudo">Perdu</label>
                        <p class="text-center">{{ information.totalLost }}</p>
                    </div>
                    <div class="form-field">
                        <label for="pseudo">Timeout</label>
                        <p class="text-center"
                           [ngClass]="{ warning: information.totalTimeout > 0 }">{{ information.totalTimeout }}</p>
                    </div>
                </div>
            }
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

        .warning {
            color: red;
        }
    `
})
export class InformationComponent {
    readonly #codingameService = inject(CodingameService);
    readonly #informationService = inject(InformationService);
    readonly information$ = this.#codingameService.update$$.pipe(switchMap(() => this.#informationService.getInformation()));

    protected information = toSignal(this.information$);

    constructor() {
        this.information$.pipe(takeUntilDestroyed()).subscribe();
    }
}
