import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AlbumbsService } from 'src/app/albumbs.service';
import { Albums } from 'src/app/models/albums.model';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {

  albums$: Observable<Albums[]>;
  sub: Subscription
  constructor(private service: AlbumbsService) { }

  ngOnInit(): void {
    this.albums$ = this.service.getAlbums()
  }

}
