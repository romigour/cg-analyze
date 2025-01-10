import {Injectable, signal} from '@angular/core';
import { from, Observable, shareReplay, Subject, switchMap, tap } from 'rxjs';
import {invoke} from "@tauri-apps/api/core";
import {toObservable} from "@angular/core/rxjs-interop";
import {Battle} from "../models/battle";

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

    loadHistory(sessionHandle: string): Observable<string> {
        return from(invoke<string>("load_history", {sessionHandle})).pipe(tap(() => this.update$$.next()));
    }
}
