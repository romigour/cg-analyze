import {Component} from '@angular/core';
import {Card} from "primeng/card";
import {Message} from "primeng/message";

@Component({
    selector: 'cg-notice',
    imports: [
        Card,
        Message
    ],
    standalone: true,
    template: `
        <p-card styleClass="h-full" header="Comment récupérer le test session handle ?">
            <p-message>
                <li>Ouvrez l'IDE du combat de bot concerné.</li>
                <li>Accédez à l'onglet Network dans les outils de développement de votre navigateur.</li>
                <li>Appliquez un filtre en recherchant "findLastBattlesByTestSessionHandle".</li>
                <li>Dans le payload de cet appel, le test session handle est une chaîne de 40 caractères.</li>
            </p-message>
        </p-card>
    `,
    styles: `
        li {
            font-size: 0.875rem;
        }
    `
})
export class NoticeComponent {
}
