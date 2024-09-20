import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-league-selector',
  standalone: true,
  templateUrl: './league-selector.component.html',
  styleUrls: ['./league-selector.component.css'],
  imports: [FormsModule]
})
export class LeagueSelectorComponent {
  leagueCode: string = '';

  constructor(private router: Router) {}

  fetchTeams() {
    if (this.leagueCode) {
      this.router.navigate(['teams'], { queryParams: { leagueCode: this.leagueCode } });
    }
  }
}

