import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistsListComponent } from './artists-list/artists-list.component';
import { EditArtistComponent } from './edit-artist/edit-artist.component';
import { CreateArtistComponent } from './create-artist/create-artist.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

const ROUTES: Routes = [
  {
    path: '', component: ArtistsListComponent
  },
  {
    path: 'detail/:id', component: ArtistDetailComponent
  },
  {
    path: 'create-artist', component: CreateArtistComponent
  },
  {
    path: 'edit/:id', component: EditArtistComponent
  }
];

@NgModule({
  declarations: [ArtistDetailComponent, ArtistsListComponent, EditArtistComponent, CreateArtistComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ArtistsModule { }
