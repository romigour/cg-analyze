import {Injectable, signal} from '@angular/core';
import { from, Observable, shareReplay, Subject, switchMap, tap } from 'rxjs';
import {invoke} from "@tauri-apps/api/core";
import {toObservable} from "@angular/core/rxjs-interop";
import {Battle} from "../models/battle";

@Injectable({
    providedIn: 'root'
})
export class InformationService {

    getInformation(): Observable<any> {
        return from(invoke<any>("get_information")).pipe(tap(console.log));
    }
}
