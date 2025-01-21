import { TestBed } from '@angular/core/testing';

import { CardCRUDService } from './card-crud.service';

describe('CardCRUDService', () => {
  let service: CardCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
