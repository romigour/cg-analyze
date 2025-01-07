import {Component, inject, signal, Signal} from '@angular/core';
import {Button} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {switchMap} from 'rxjs';
import {CgApiService} from '../../services/cg-api.service';

@Component({
  selector: 'cg-search',
  imports: [
    FormsModule,
    InputText
  ],
  templateUrl: './search.component.html',
  standalone: true,
  styleUrl: './search.component.css'
})
export class SearchComponent {
    private readonly cgApiService = inject(CgApiService);

    public value = signal('7083325461e3689408098a523504154a30867fe7');

    private loadMatchUser = toObservable(this.value).pipe(switchMap((value) => this.cgApiService.search(value)))

  constructor() {
     // this.loadMatchUser.pipe(takeUntilDestroyed()).subscribe();
  }
}
