import {Injectable, signal} from '@angular/core';
import {from, Observable, shareReplay, switchMap, tap} from 'rxjs';
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
export class CgApiService {
    protected readonly searchParams = signal({...initialSearchParams});

    public readonly battles$ = toObservable(this.searchParams).pipe(
        switchMap(({searchTerm, page, size}) => this.search()),
        shareReplay(1),
    );

    loadHistory(sessionHandle: string): Observable<string> {
        return from(invoke<string>("load_history", {sessionHandle}));
    }

    search(): Observable<Array<Battle>> {
        return from(invoke<any>("search")).pipe(tap(console.log));
    }

    public updateParams(curr: Partial<{ searchTerm: string; page: number; size: number; }>): void {
        this.searchParams.update((prev) => ({...prev, ...curr}));
    }

    public clearParams(): void {
        this.searchParams.set({...initialSearchParams});
    }
}