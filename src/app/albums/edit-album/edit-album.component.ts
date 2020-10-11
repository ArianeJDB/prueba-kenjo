import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlbumsService } from 'src/app/albums.service';
import { Albums } from 'src/app/models/albums.model';
import { NotificationBusService } from 'src/app/notification-bus.service';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss']
})
export class EditAlbumComponent implements OnInit, OnDestroy {
  title: string;
  coverUrl: string;
  year: number;
  genre: string;
  artistId: string;
  id: string;
  albums: Albums[];
  albumToEdit: Albums[];
  albumUpdated: Albums;
  sub: Subscription;
  errorMsg: string;
  successMsg: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: AlbumsService,
    private busService: NotificationBusService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.albums = JSON.parse(localStorage.getItem('albums'));
    this.filterAlbum();
  }

  filterAlbum() {
    this.albumToEdit = this.albums.filter(album => album._id === this.id);
    this.getAlbumData();
  }

  getAlbumData() {
    this.albumToEdit.forEach(album => {
      this.id = album._id;
      this.title = album.title;
      this.coverUrl = album.coverUrl;
      this.year = album.year;
      this.genre = album.genre;
      this.artistId = album.artistId;
    });
  }

  editAlbum(payload: Albums) {
    try {
      this.service.editAlbum(this.id, payload).subscribe(
        (response) => this.albumUpdated = response,
        (error) => console.log(error)
      )
      this.successMsg = 'The album is updated!';
      this.busService.showSuccess(this.successMsg, this.successMsg);
      this.router.navigate(['/albums']);
    } catch (error) {
      if (error.status === 500) {
        this.errorMsg = 'Oops! server error!';
        this.busService.showError(this.errorMsg, this.errorMsg);
      } else if (error.status === 400) {
        this.errorMsg = 'Oops! you must fill all fields!';
        this.busService.showError(this.errorMsg, this.errorMsg);
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
