import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { AlbumbsProxyService } from './albumbs-proxy.service';
import { Albums } from './models/albums.model';
import { AlbumsDTO } from './models/albums-dto.model';


@Injectable({
  providedIn: 'root'
})
export class AlbumbsService {

  constructor(private proxy: AlbumbsProxyService) { }

  getAlbums(): Observable<Albums[]> {
    return this.proxy.getAlbumsList().pipe(
      map((albumsDTO: AlbumsDTO[]) => {
        let albums: Albums[] = [];
        albumsDTO.map((albumDTO: AlbumsDTO) => {
          const album: Albums = {
            title: albumDTO.title,
            artistId: albumDTO.artistId,
            coverUrl: albumDTO.coverUrl,
            year: albumDTO.year,
            genre: albumDTO.genre
          };
          albums = [...albums, album];
        });
        return albums;
      })
    );
  }
}

