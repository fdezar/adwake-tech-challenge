import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FootballApiService } from '../football-api.service';

@Component({
  selector: 'app-league-selector',
  standalone: true,
  templateUrl: './league-selector.component.html',
  styleUrls: ['./league-selector.component.css'],
  imports: [FormsModule, CommonModule]
})
export class LeagueSelectorComponent {
  leagueCode: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private apiService: FootballApiService) {}

  fetchTeams() {
    if (this.leagueCode) {
      this.router.navigate(['teams', this.leagueCode]);
    }
  }

  importLeague() {
    this.isLoading = true;
    if (this.leagueCode) {
      this.apiService.importLeague(this.leagueCode).subscribe(
        response => {
          console.log('Import successful:', response);
          this.isLoading = false;
        },
        error => {
          console.error('Error importing league:', error);
          this.isLoading = false;
        }
      );
    }
  }
}

