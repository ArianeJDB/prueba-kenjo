import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlbumsDTO } from './models/albums-dto.model';
import { Albums } from './models/albums.model';
@Injectable({
  providedIn: 'root'
})
export class AlbumsProxyService {

  constructor(private httpClient: HttpClient) { }
  config = 'http://localhost:3000/';


getAlbumsList(): Observable<Albums[]> {
  return this.httpClient.get<Albums[]>(this.config + 'albums/all');
}

createNewAlbum(payload): Observable<Albums> {
  return this.httpClient.post<Albums>(this.config + 'album', payload);
}

editAlbum(id, payload): Observable<Albums> {
  return this.httpClient.put<Albums>(this.config + 'album/' + id, payload)
}

deleteAlbum(id): Observable<Albums> {
  return this.httpClient.delete<Albums>(this.config + 'album/' + id)
}
}
