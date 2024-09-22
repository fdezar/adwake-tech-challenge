import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FootballApiService } from '../football-api.service';

@Component({
  selector: 'app-league-selector',
  standalone: true,
  templateUrl: './league-selector.component.html',
  styleUrls: ['./league-selector.component.css'],
  imports: [FormsModule]
})
export class LeagueSelectorComponent {
  leagueCode: string = '';

  constructor(private router: Router, private apiService: FootballApiService) {}

  fetchTeams() {
    if (this.leagueCode) {
      this.router.navigate(['teams', this.leagueCode]);
    }
  }

  importLeague() {
    if (this.leagueCode) {
      this.apiService.importLeague(this.leagueCode).subscribe(
        response => {
          console.log('Import successful:', response);
        },
        error => {
          console.error('Error importing league:', error);
        }
      );
    }
  }
}

