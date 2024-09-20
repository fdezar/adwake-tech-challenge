import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FootballApiService } from '../football-api.service';

@Component({
  selector: 'app-team-details',
  standalone: true,
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css'],
  imports: [CommonModule]
})
export class TeamDetailsComponent implements OnInit {
  team: any;
  players: any[] = [];
  teamId: string = '';
  leagueCode: string = '';

  constructor(private apiService: FootballApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = params['id'];
    });
    this.route.queryParams.subscribe(params => {
      this.leagueCode = params['leagueCode'];
    });

    this.apiService.getPlayers(this.leagueCode, this.teamId).subscribe(data => {
      this.players = data;
    });
  }
}

