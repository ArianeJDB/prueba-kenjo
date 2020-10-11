import { TestBed } from '@angular/core/testing';

import { ArtistsProxyService } from './artists-proxy.service';

describe('ArtistsProxyService', () => {
  let service: ArtistsProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistsProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
