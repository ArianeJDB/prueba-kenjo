import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlbumsService } from 'src/app/albums.service';
import { ArtistsService } from 'src/app/artists.service';
import { Albums } from 'src/app/models/albums.model';
import { Artists } from 'src/app/models/artists.model';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit, OnDestroy {

  albums$: Observable<Albums[]>;
  albums: Albums[];
  sub: Subscription;
  artistData: Artists;
  artistName: string;
  
  constructor(
    private service: AlbumsService,
    private router: Router,
    private artistService: ArtistsService

  ) { }

  ngOnInit(): void {
    this.albums$ = this.service.getAlbums();
    this.sub = this.albums$.subscribe(
      (response) => {
        this.albums = response;
        localStorage.setItem('albums', JSON.stringify(response));
      },
      (error) => console.log(error)
    );

  }
  goToDetail(id): any {
    this.router.navigate(['albums/detail/' + id]);
  }
  // getArtistName() {
  //   this.albumSelected.forEach(album => {
  //     if (album.artistId) {
  //       console.log('??', album.artistId)
  //       this.artistService.getArtistById(album.artistId).subscribe(
  //         (response) => {
  //           this.artistName = response.name;
  //         },
  //         (error) => console.log(error));
  //     }
  //   });
  // }
  ngOnDestroy() {
    this.sub.unsubscribe();
  } 
}
