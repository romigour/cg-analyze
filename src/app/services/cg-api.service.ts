import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CgApiService {

  private httpClient = inject(HttpClient);
  private readonly HOSTNAME = 'https://www.codingame.com/';

  constructor() {}

  search(value: string): Observable<any> {
    const body = ['71013009dcb6cdb2943f7e27053be4f21f50501b', null];

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(`http://localhost:4200/services/gamesPlayersRanking/findLastBattlesByTestSessionHandle`,
      body, { headers, withCredentials: true });
  }
}
