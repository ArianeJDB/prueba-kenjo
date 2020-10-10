import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlbumsService } from 'src/app/albums.service';
import { Albums } from 'src/app/models/albums.model';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent implements OnInit {
  form: FormGroup;
  title: string;
  coverUrl: string;
  year: number;
  genre: string;
  artistId: string;
  errorMsg: string;
  successMsg: string;
  constructor(private service: AlbumsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      coverUrl: new FormControl('', [Validators.required]),
      year: new FormControl(null, [Validators.required]),
      genre: new FormControl('', [Validators.required]),
      artistId: new FormControl(null)
    });
  }

  createNewAlbum() {

    if (this.form.valid) {
      this.service.createNewAlbum(this.form.value).subscribe(data => data);
    }
    // this.successMsg = 'Bienvenido =)';
    // this.busService.showSuccess(this.successMsg, this.successMsg);
    // this.router.navigate(['users/user-list']);
  }
}
