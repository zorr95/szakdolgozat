import { TestBed } from '@angular/core/testing';

import { TranslateService } from './translate.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

describe('TranslateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:  [HttpClientModule, IonicStorageModule.forRoot()]
  }));

  it('should be created', () => {
    const service: TranslateService = TestBed.get(TranslateService);
    expect(service).toBeTruthy();
  });
});
