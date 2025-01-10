import {Injectable} from '@angular/core';
import {from, Observable, tap} from 'rxjs';
import {invoke} from "@tauri-apps/api/core";
import {Information} from "../models/information";

@Injectable({
    providedIn: 'root'
})
export class InformationService {

    getInformation(): Observable<Information> {
        return from(invoke<Information>("get_information")).pipe(tap(console.log));
    }
}
