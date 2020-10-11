import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtistsService } from 'src/app/services/artists.service';
import { Artists } from 'src/app/models/artists.model';
import { NotificationBusService } from 'src/app/services/notification-bus.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  artists: Artists[];
  artistSelected: Artists[];
  id: string;
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
    this.artists = JSON.parse(localStorage.getItem('artists'));
    this.id = this.activatedRoute.snapshot.params.id;
    this.filterArtist();
    // this.getArtistById(this.id)
  }

  filterArtist() {
    this.artistSelected = this.artists.filter(artist => artist._id === this.id);
  }

  getArtistById(id) {
    this.service.getArtistById(id).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  deleteArtist(id) {
    try {
      this.service.deleteArtist(id).subscribe(
        (response) => response,
        (error) => console.log(error)
      );
      this.successMsg = 'The artist was deleted!';
      this.busService.showSuccess(this.successMsg, this.successMsg);
      this.router.navigate(['/artists']);
    } catch (error) {
      if (error.status === 500) {
        this.errorMsg = 'Oops! server error!';
        this.busService.showError(this.errorMsg, this.errorMsg);
      }
    }
  }

  goToEdit(id) {
    this.router.navigate(['artists/edit/' + id]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
