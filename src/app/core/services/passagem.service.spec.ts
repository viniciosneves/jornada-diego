import { TestBed } from '@angular/core/testing';

import { PassagemService } from './passagem.service';

describe('PassagemService', () => {
  let service: PassagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
