import { TestBed } from '@angular/core/testing';

import { ReadItemService } from './read-item.service';

describe('ReadItemService', () => {
  let service: ReadItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
