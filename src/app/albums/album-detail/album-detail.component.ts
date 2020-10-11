import { Component, OnDestroy, OnInit } from '@angular/core';
import { Albums } from 'src/app/models/albums.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlbumsService } from 'src/app/albums.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit, OnDestroy {
  albums: Albums[];
  albumSelected: Albums[];
  albumData: {};
  id: string;
  sub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: AlbumsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.albums = JSON.parse(localStorage.getItem('albums'));
    this.id = this.activatedRoute.snapshot.params.id;
    this.filterAlbum()
  }

  filterAlbum() {
    this.albumSelected = this.albums.filter(album => album._id === this.id);
  }

  deleteAlbum(id) {
    this.service.deleteAlbum(id).subscribe(
      (response) => response,
      (error) => console.log(error)
    )
    this.router.navigate(['/albums']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
