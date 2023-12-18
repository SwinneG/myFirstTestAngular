import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowListComponent } from './shows/show-list/show-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'shows', pathMatch:'full' },
  { path: 'shows', component: ShowListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
