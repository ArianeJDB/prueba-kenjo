import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlbumsService } from 'src/app/albums.service';
import { Albums } from 'src/app/models/albums.model';
import { NotificationBusService } from 'src/app/notification-bus.service';

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

  constructor(
    private service: AlbumsService,
    private router: Router,
    private busService: NotificationBusService
    ) { }

  ngOnInit(): void {
    this.setPage();
    this.form = new FormGroup({
      title: new FormControl(this.titleToEdit || '', [Validators.required]),
      coverUrl: new FormControl(this.coverUrlToEdit || '', [Validators.required]),
      year: new FormControl(this.yearToEdit || null, [Validators.required, Validators.max(2020)]),
      genre: new FormControl(this.genreToEdit || '', [Validators.required]),
      artistId: new FormControl(this.artistIdToEdit || null)
    });
  }

  createNewAlbum() {

    try {
      if (this.form.valid) {
        this.service.createNewAlbum(this.form.value).subscribe(
          response => this.newAlbum = response,
          error => console.log(error)
          );
      }
      this.successMsg = 'The album was created! =)';
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
  setPage() {
    this.titleToEdit ? this.page = 'Edit' : this.page = 'Create';
  }

  editAlbum() {
    this.sendToEdit.emit(this.form.value);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
