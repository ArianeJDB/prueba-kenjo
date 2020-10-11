import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ArtistsService } from 'src/app/artists.service';
import { Artists } from 'src/app/models/artists.model';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.scss']
})
export class ArtistsListComponent implements OnInit, OnDestroy {
  artists$: Observable<Artists[]>;
  artists: Artists[];
  sub: Subscription;

  constructor(
    private service: ArtistsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.artists$ = this.service.getArtists();
    this.sub = this.artists$.subscribe(
      (response) => {
        this.artists = response;
        localStorage.setItem('artists', JSON.stringify(response));
      },
      (error) => console.log(error)
    );
  }
  goToDetail(id): any {
    this.router.navigate(['artists/detail/' + id]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
