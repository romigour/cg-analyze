import {Injectable, signal} from '@angular/core';
import {from, Observable, shareReplay, switchMap} from 'rxjs';
import {invoke} from "@tauri-apps/api/core";
import {toObservable} from "@angular/core/rxjs-interop";
import {ResultGame} from "../models/result-game";

const initialSearchParams = {
    status: 'All',
    searchTerm: '',
};

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    protected readonly searchParams = signal({...initialSearchParams});

    public readonly resultGame$ = toObservable(this.searchParams).pipe(
        switchMap(({status, searchTerm}) => this.search(status, searchTerm)),
        shareReplay(1),
    );

    search(status: string, searchTerm: string): Observable<Array<ResultGame>> {
        return from(invoke<Array<ResultGame>>("search", {status, searchTerm}));
    }

    public updateParams(curr: Partial<{ status: string; searchTerm: string }>): void {
        this.searchParams.update((prev) => ({...prev, ...curr}));
    }

    public clearParams(): void {
        this.searchParams.set({...initialSearchParams});
    }
}
