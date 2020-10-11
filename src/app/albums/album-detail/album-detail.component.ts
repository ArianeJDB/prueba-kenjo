import { Component, OnDestroy, OnInit } from '@angular/core';
import { Albums } from 'src/app/models/albums.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlbumsService } from 'src/app/albums.service';
import { Subscription } from 'rxjs';
import { NotificationBusService } from 'src/app/notification-bus.service';
import { ArtistsService } from 'src/app/artists.service';
import { Artists } from 'src/app/models/artists.model';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit, OnDestroy {
  albums: Albums[];
  albumSelected: Albums[];
  id: string;
  sub: Subscription;
  errorMsg: string;
  successMsg: string;
  artistName: string;
  artistId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: AlbumsService,
    private router: Router,
    private busService: NotificationBusService,
    private artistService: ArtistsService
  ) { }

  ngOnInit(): void {
    this.albums = JSON.parse(localStorage.getItem('albums'));
    this.id = this.activatedRoute.snapshot.params.id;
    this.filterAlbum();
    // this.getAlbumById(this.id)
    this.getArtistName();

  }

  filterAlbum() {
    this.albumSelected = this.albums.filter(album => album._id === this.id);
  }

  getAlbumById(id) {
    this.service.getAlbumById(id).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
  deleteAlbum(id) {
    try {
      this.service.deleteAlbum(id).subscribe(
        (response) => response,
        (error) => console.log(error)
      );
      this.successMsg = 'The album was deleted!';
      this.busService.showSuccess(this.successMsg, this.successMsg);
      this.router.navigate(['/albums']);
    } catch (error) {
      if (error.status === 500) {
        this.errorMsg = 'Oops! server error!';
        this.busService.showError(this.errorMsg, this.errorMsg);
      }
    }
  }

  goToEdit(id) {
    this.router.navigate(['albums/edit/' + id]);
  }

  getArtistName() {
    this.albumSelected.forEach(album => {
      if (album.artistId) {
        this.artistService.getArtistById(album.artistId).subscribe(
          (response) => {
            this.artistName = response.name;
            this.artistId = response._id;
          },
          (error) => console.log(error));
      }
    });
  }
  goToArtist() {
    this.router.navigate(['artists/detail/' + this.artistId]);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}





