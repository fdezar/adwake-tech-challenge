import { Routes } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { LeagueSelectorComponent } from './league-selector/league-selector.component';

export const routes: Routes = [
  { path: '', component: LeagueSelectorComponent },
  { path: 'teams/:leagueCode', component: TeamListComponent },
  { path: 'teams/:leagueCode/:teamId', component: TeamDetailsComponent },
];