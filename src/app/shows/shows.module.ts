import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { ShowListComponent } from './show-list/show-list.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';

import { ShowsService } from './shows.service';
import { MatTabsModule } from '@angular/material/tabs'

import { ReactiveFormsModule } from '@angular/forms';
import { MainInfoComponent } from './main-info/main-info.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { NavTabsComponent } from './nav-tabs/nav-tabs.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { CastComponent } from './cast/cast.component'

const showsRoutes: Routes =  [
  { path: 'shows', component: ShowListComponent },
  { path: 'shows/:id/:title', component: ShowDetailComponent },
  { path: 'shows/:id/:title/episodes', component: EpisodesComponent },
  { path: 'shows/:id/:title/seasons', component: SeasonsComponent },
  { path: 'shows/:id/:title/cast', component: CastComponent },
];

@NgModule({
  declarations: [
    ShowListComponent,
    ShowDetailComponent,
    MainInfoComponent,
    EpisodesComponent,
    NavTabsComponent,
    SeasonsComponent,
    CastComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(showsRoutes),
    ReactiveFormsModule,
    MatTabsModule
  ],
  providers: [ShowsService]
})
export class ShowsModule { }
