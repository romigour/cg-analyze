import {Injectable, signal} from '@angular/core';
import {from, Observable, shareReplay, switchMap, tap} from 'rxjs';
import {invoke} from "@tauri-apps/api/core";
import {toObservable} from "@angular/core/rxjs-interop";
import {ResultGame} from "../models/result-game";

const initialSearchParams = {
    searchTerm: '',
    page: 0,
    size: 10,
};

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    protected readonly searchParams = signal({...initialSearchParams});

    public readonly resultGame$ = toObservable(this.searchParams).pipe(
        switchMap(({searchTerm, page, size}) => this.search()),
        shareReplay(1),
    );

    search(): Observable<Array<ResultGame>> {
        return from(invoke<any>("search")).pipe(tap((result) => console.log('search ', result)));
    }

    public updateParams(curr: Partial<{ searchTerm: string; page: number; size: number; }>): void {
        this.searchParams.update((prev) => ({...prev, ...curr}));
    }

    public clearParams(): void {
        this.searchParams.set({...initialSearchParams});
    }
}
