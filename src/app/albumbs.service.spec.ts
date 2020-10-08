import { TestBed } from '@angular/core/testing';

import { AlbumbsService } from './albumbs.service';

describe('AlbumbsService', () => {
  let service: AlbumbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
