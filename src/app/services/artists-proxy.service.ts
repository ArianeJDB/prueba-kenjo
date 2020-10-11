import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artists } from '../models/artists.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistsProxyService {

  constructor(private httpClient: HttpClient) { }
  config = 'http://localhost:3000/';

  getArtistsList(): Observable<Artists[]> {
    return this.httpClient.get<Artists[]>(this.config + 'artists/all');
  }
  getArtistById(id): Observable<Artists> {
    return this.httpClient.get<Artists>(this.config + 'artist/' + id);
  }
  createNewArtist(payload): Observable<Artists> {
    return this.httpClient.post<Artists>(this.config + 'artist', payload);
  }
  editArtist(id, payload): Observable<Artists> {
    return this.httpClient.put<Artists>(this.config + 'artist/' + id, payload);
  }
  deleteArtist(id): Observable<Artists> {
    return this.httpClient.delete<Artists>(this.config + 'artist/' + id);
  }
}
