import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballApiService {
  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  // getTeams(leagueCode: string): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/api/leagues/teams/`, { params: { leagueCode } });
  // }

  getTeams(leagueCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/leagues/teams/${leagueCode}`); // leagueCode es parte de la URL
  }

  // getPlayers(leagueCode: string, teamId?: string): Observable<any> {
  //   let params = new HttpParams().set('leagueCode', leagueCode);
  //   if (teamId) params = params.set('team', teamId);
  //   return this.http.get(`${this.baseUrl}/api/leagues/players/`, { params });
  // }

  getPlayers(leagueCode: string, teamId?: string): Observable<any> {
    let url = `${this.baseUrl}/api/leagues/players/${leagueCode}`;
    if (teamId) {
      url += `/${teamId}`;
    }
    return this.http.get(url);
  }
}

