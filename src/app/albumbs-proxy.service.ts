import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlbumsDTO } from './models/albums-dto.model';
import { Albums } from './models/albums.model';
@Injectable({
  providedIn: 'root'
})
export class AlbumbsProxyService {

  constructor(private httpClient: HttpClient) { }
  config = 'http://localhost:3000/'


getAlbumsList(): Observable<Albums[]> {
  return this.httpClient.get<Albums[]>(this.config + 'albums/all');
}
}

