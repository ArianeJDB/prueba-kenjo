import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlbumsService } from 'src/app/albums.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Albums } from 'src/app/models/albums.model';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent implements OnInit, OnDestroy {
  @Input() idToEdit: string;
  @Input() titleToEdit: string;
  @Input() coverUrlToEdit: string;
  @Input() yearToEdit: string;
  @Input() genreToEdit: string;
  @Input() artistIdToEdit: string;
  @Output() sendToEdit: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  title: string;
  coverUrl: string;
  year: number;
  genre: string;
  artistId: string;
  errorMsg: string;
  successMsg: string;
  newAlbum: Albums;
  page: string;
  sub: Subscription;

  constructor(private service: AlbumsService) { }

  ngOnInit(): void {
    this.setPage()
    this.form = new FormGroup({
      title: new FormControl(this.titleToEdit || '', [Validators.required]),
      coverUrl: new FormControl(this.coverUrlToEdit || '', [Validators.required]),
      year: new FormControl(this.yearToEdit || null, [Validators.required]),
      genre: new FormControl(this.genreToEdit || '', [Validators.required]),
      artistId: new FormControl(this.artistIdToEdit || null)
    });
  }

  createNewAlbum() {

    if (this.form.valid) {
      this.service.createNewAlbum(this.form.value).subscribe(
        response => this.newAlbum = response,
        error => console.log(error)
        );
    }
    // this.successMsg = 'Bienvenido =)';
    // this.busService.showSuccess(this.successMsg, this.successMsg);
    // this.router.navigate(['users/user-list']);
  }
  setPage() {
    console.log('ppp', this.titleToEdit)
    this.titleToEdit ? this.page = 'Edit' : this.page = 'Create';
    console.log('ppp', this.page)
 
  }

  editAlbum() {
    this.sendToEdit.emit(this.form.value)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
