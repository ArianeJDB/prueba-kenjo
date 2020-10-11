import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from 'src/app/albums.service';
import { Albums } from 'src/app/models/albums.model';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss']
})
export class EditAlbumComponent implements OnInit {
  title: string;
  coverUrl: string;
  year: number;
  genre: string;
  artistId: string;
  id: string;
  albums: Albums[];
  albumToEdit: Albums[];
  albumUpdated: Albums;


  constructor(
    private activatedRoute: ActivatedRoute,
    private service: AlbumsService
    ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.albums = JSON.parse(localStorage.getItem('albums'));
    this.filterAlbum()

  }


  filterAlbum() {
    this.albumToEdit = this.albums.filter(album => album._id === this.id);
    this.getAlbumData()

  }

  getAlbumData() {
    this.albumToEdit.forEach(album => {
      this.id = album._id;
      this.title = album.title;
      this.coverUrl = album.coverUrl;
      this.year = album.year;
      this.genre = album.genre;
      this.artistId = album.artistId;
    })
  }

  editAlbum(payload: Albums) {
    console.log('edit', payload)
    console.log('edit', this.id)

    this.service.editAlbum(this.id, payload).subscribe(
      (response) => this.albumUpdated = response,
      (error) => console.log(error)
    )
  }
}
