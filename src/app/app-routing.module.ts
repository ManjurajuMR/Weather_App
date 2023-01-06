import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentFavouriteComponent } from './content-favourite/content-favourite.component';
import { ContentHomeComponent } from './content-home/content-home.component';
import { ContentRecentSearchComponent } from './content-recent-search/content-recent-search.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home", component:ContentHomeComponent},
  {path:"favourite", component:ContentFavouriteComponent},
  {path:"recent", component:ContentRecentSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
