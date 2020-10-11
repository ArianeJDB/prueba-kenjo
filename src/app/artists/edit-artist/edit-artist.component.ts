import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtistsService } from 'src/app/artists.service';
import { Artists } from 'src/app/models/artists.model';
import { NotificationBusService } from 'src/app/notification-bus.service';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.scss']
})
export class EditArtistComponent implements OnInit, OnDestroy {
  id: string;
  name: string;
  photoUrl: string;
  birthdate: string;
  deathDate: any;
  artists: Artists[];
  artistToEdit: Artists[];
  artistUpdated: Artists;
  sub: Subscription;
  errorMsg: string;
  successMsg: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ArtistsService,
    private busService: NotificationBusService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.artists = JSON.parse(localStorage.getItem('artists'));
    this.filterArtist();
  }

  filterArtist() {
    this.artistToEdit = this.artists.filter(artist => artist._id === this.id);
    this.getArtistData();
  }

  getArtistData() {
    this.artistToEdit.forEach(artist => {
      this.id = artist._id;
      this.name = artist.name;
      this.photoUrl = artist.photoUrl;
      this.birthdate = artist.birthdate;
      this.deathDate = artist.deathDate;
    });
  }

  editArtist(payload) {
    try {
      this.service.editArtist(this.id, payload).subscribe(
        (response) =>  this.artistUpdated = response,
        (error) => console.log(error)
      )
      this.successMsg = 'The artist is updated!';
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

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
