import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { AlbumsProxyService } from './albums-proxy.service';
import { Albums } from './models/albums.model';
import { AlbumsDTO } from './models/albums-dto.model';


@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private proxy: AlbumsProxyService) { }

  getAlbums(): Observable<Albums[]> {
    return this.proxy.getAlbumsList().pipe(
      map((albumsDTO: AlbumsDTO[]) => {
        let albums: Albums[] = [];
        albumsDTO.map((albumDTO: AlbumsDTO) => {
          const album: Albums = {
            _id: albumDTO._id,
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

  createNewAlbum(payload): Observable<Albums> {
    return this.proxy.createNewAlbum(payload).pipe(
      map((albums: Albums) => {
        const albumsList: Albums = albums;
        return albumsList;
      })
    );
  }

}

