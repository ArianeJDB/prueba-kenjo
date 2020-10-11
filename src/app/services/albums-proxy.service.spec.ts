import { TestBed } from '@angular/core/testing';

import { AlbumsProxyService } from './albums-proxy.service';

describe('AlbumsProxyService', () => {
  let service: AlbumsProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumsProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
