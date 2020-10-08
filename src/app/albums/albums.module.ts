import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumsListComponent } from './albums-list/albums-list.component';
import { HttpClientModule } from '@angular/common/http';

const ROUTES: Routes = [
  {
    path: '', component: AlbumsListComponent
  },
  {
    path: 'detail/:id', component: AlbumDetailComponent
  },
  {
    path: 'create-album', component: CreateAlbumComponent
  },
  {
    path: 'edit/:id', component: EditAlbumComponent
  }
];

@NgModule({
  declarations: [
    CreateAlbumComponent,
    EditAlbumComponent,
    AlbumDetailComponent,
    AlbumsListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class AlbumsModule { }
