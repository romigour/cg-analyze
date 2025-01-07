import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GridComponent} from "../grid/grid.component";
import {SearchComponent} from "../search/search.component";
import {Button} from "primeng/button";
import {Menubar} from "primeng/menubar";
import {MenuItem} from "primeng/api";

@Component({
    selector: 'cg-topbar',
    standalone: true,
    imports: [
        FormsModule,
        Button,
        Menubar,
    ],
    template: `
        <div class="card">
        <p-menubar [model]="items" />
        </div>
        <p-button label="Toggle Dark Mode" (onClick)="toggleDarkMode()"/>
    `,
    styles: `
    `
})
export class TopbarComponent {
    items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ];

    toggleDarkMode() {
        const element = document.querySelector('html');
        element!.classList.toggle('my-app-dark');
    }
}
