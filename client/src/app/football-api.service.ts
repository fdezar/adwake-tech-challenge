import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballApiService {
  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getTeams(leagueCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/leagues/teams/${leagueCode}`);
  }

  getPlayers(leagueCode: string, teamId?: string): Observable<any> {
    let params = new HttpParams();
    if (teamId) {
      params = params.set('teamId', teamId);
    }
    return this.http.get(`${this.baseUrl}/api/leagues/players/${leagueCode}`, { params });
  }
}

