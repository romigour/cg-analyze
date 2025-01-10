import {Injectable} from '@angular/core';
import {from, Observable, Subject, tap} from 'rxjs';
import {invoke} from "@tauri-apps/api/core";

const initialSearchParams = {
    searchTerm: '',
    page: 0,
    size: 10,
};

@Injectable({
    providedIn: 'root'
})
export class CodingameService {

    public readonly update$$ = new Subject<void>();

    loadHistory(sessionHandle: string): Observable<void> {
        return from(invoke<string>("load_history", {sessionHandle}).then(() => console.log('AloadHistory')))
            .pipe(tap(() => console.log('loadHistory')), tap(() => this.update$$.next()));
    }
}
