import { TestBed } from '@angular/core/testing';

import { LibretimeService } from './libretime.service';

describe('LibretimeService', () => {
  let service: LibretimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibretimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
