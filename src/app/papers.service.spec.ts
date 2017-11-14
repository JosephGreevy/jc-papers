import { TestBed, inject } from '@angular/core/testing';

import { PapersService } from './papers.service';

describe('PapersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PapersService]
    });
  });

  it('should be created', inject([PapersService], (service: PapersService) => {
    expect(service).toBeTruthy();
  }));
});
