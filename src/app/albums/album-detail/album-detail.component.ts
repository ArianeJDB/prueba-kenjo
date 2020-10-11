import { Component, OnInit } from '@angular/core';
import { Albums } from 'src/app/models/albums.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  albums: Albums[];
  albumSelected: Albums[];
  albumData: {};
  id: string;
  constructor(
    private activatedRoute: ActivatedRoute,
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

  // gotToEditAlbum(id) {
  //   this.router.navigate(['albums/edit/' + id]);
  // }
}
