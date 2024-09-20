import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballApiService } from '../football-api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../filter.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-team-list',
  standalone: true,
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
  imports: [FormsModule, CommonModule, FilterPipe, RouterModule]
})
export class TeamListComponent implements OnInit {
  teams: any[] = [];
  leagueCode: string = '';
  filter: string = '';

  constructor(private apiService: FootballApiService, private route: ActivatedRoute, private router: Router) {}

  viewTeam(teamId: number) {
    this.router.navigate(['/teams', teamId]);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // this.leagueCode = params['leagueCode'];
      this.leagueCode = params.get('leagueCode') || '';
      if (this.leagueCode) {
        this.apiService.getTeams(this.leagueCode).subscribe(data => {
          this.teams = data;
        });
      }
    });
  }
}

