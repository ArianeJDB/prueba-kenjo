import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistsListComponent } from './artists-list/artists-list.component';
import { CreateListComponent } from './create-list/create-list.component';
import { EditArtistComponent } from './edit-artist/edit-artist.component';

const ROUTES: Routes = [
  {
    path: '', component: ArtistsListComponent
  },
  {
    path: 'detail/:id', component: ArtistDetailComponent
  },
  {
    path: 'create-artist', component: CreateListComponent
  },
  {
    path: 'edit/:id', component: EditArtistComponent
  }
];

@NgModule({
  declarations: [ArtistDetailComponent, ArtistsListComponent, CreateListComponent, EditArtistComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ArtistsModule { }
