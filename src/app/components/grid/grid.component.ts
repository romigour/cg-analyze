import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TableModule} from "primeng/table";

@Component({
    selector: 'cg-grid',
    standalone: true,
    imports: [
        FormsModule,
        TableModule
    ],
    template: `
        <p-table [value]="test" [tableStyle]="{ 'min-width': '50rem' }">
            <ng-template #header>
                <tr>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Adresse</th>
                    <th>Age</th>
                </tr>
            </ng-template>
            <ng-template #body let-test>
                <tr>
                    <td>{{ test.nom }}</td>
                    <td>{{ test.prenom }}</td>
                    <td>{{ test.adresse }}</td>
                    <td>{{ test.age }}</td>
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
}
