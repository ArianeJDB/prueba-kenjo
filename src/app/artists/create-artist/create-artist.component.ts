import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtistsService } from 'src/app/services/artists.service';
import { Artists } from 'src/app/models/artists.model';
import { NotificationBusService } from 'src/app/services/notification-bus.service';

@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.scss']
})
export class CreateArtistComponent implements OnInit, OnDestroy {
  @Input() idToEdit: string;
  @Input() nameToEdit: string;
  @Input() photoUrlToEdit: string;
  @Input() birthdateToEdit: string;
  @Input() deathDateToEdit: string;
  @Output() sendToEdit: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  name: string;
  photoUrl: string;
  birthdate: Date;
  deathDate: Date;
  page: string;
  errorMsg: string;
  successMsg: string;
  newArtist: Artists;
  sub: Subscription;

  constructor(
    private service: ArtistsService,
    private router: Router,
    private busService: NotificationBusService
  ) { }

  ngOnInit(): void {
    this.setPage();
    this.form = new FormGroup({
      name: new FormControl(this.nameToEdit || '', [Validators.required]),
      photoUrl: new FormControl(this.photoUrlToEdit || '', [Validators.required]),
      birthdate: new FormControl(this.birthdateToEdit || '', [Validators.required]),
      deathDate: new FormControl(this.deathDateToEdit || null)
    });
  }
  createNewArtist() {
    try {
      if (this.form.valid) {
        this.service.createNewArtist(this.form.value).subscribe(
          response => this.newArtist = response,
          error => console.log(error)
          );
      }
      this.successMsg = 'The artist was created! =)';
      this.busService.showSuccess(this.successMsg, this.successMsg);
      this.router.navigate(['/artists']);
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

  editArtist() {
    this.sendToEdit.emit(this.form.value);
  }

  setPage() {
    this.nameToEdit ? this.page = 'Edit' : this.page = 'Create';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
