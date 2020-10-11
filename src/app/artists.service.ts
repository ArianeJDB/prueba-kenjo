import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { ArtistsProxyService } from './artists-proxy.service';
import { Artists } from './models/artists.model';
import { ArtistsDTO } from './models/artists-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  constructor(private proxy: ArtistsProxyService) { }

  getAlbums(): Observable<Artists[]> {
    return this.proxy.getArtistsList().pipe(
      map((artistsDTO: ArtistsDTO[]) => {
        let artists: Artists[] = [];
        artistsDTO.map((artistDTO: ArtistsDTO) => {
          const artist: Artists = {
            _id: artistDTO._id,
            name: artistDTO.name,
            photoUrl: artistDTO.photoUrl,
            birthdate: artistDTO.birthdate,
            deathDate: artistDTO.deathDate,
          };
          artists = [...artists, artist];
        });
        return artists;
      })
    );
  }
  getArtistById(id): Observable<Artists> {
    return this.proxy.getArtistById(id).pipe(
      map((artist: Artists) => {
        const newArtist: Artists = artist;
        return newArtist;
      })
    );
  }
  createNewArtist(payload): Observable<Artists> {
    return this.proxy.createNewArtist(payload).pipe(
      map((artist: Artists) => {
        const artistList: Artists = artist;
        return artistList;
      })
    );
  }

  editArtist(id, payload): Observable<Artists> {
    return this.proxy.editArtist(id, payload).pipe(
      map((artist: Artists) => {
        const artistUpdated: Artists = artist;
        return artistUpdated;
      })
    );
  }

  deleteAlbum(id): Observable<Artists> {
    return this.proxy.deleteArtist(id).pipe(
      map((artist: Artists) => {
        const artistDeleted: Artists = artist;
        return artistDeleted;
      })
    );
  }
}
