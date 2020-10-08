import { TestBed } from '@angular/core/testing';

import { AlbumbsProxyService } from './albumbs-proxy.service';

describe('AlbumbsProxyService', () => {
  let service: AlbumbsProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumbsProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
