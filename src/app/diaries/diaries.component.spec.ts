import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiariesComponent } from './diaries.component';

describe('DiariesComponent', () => {
  let component: DiariesComponent;
  let fixture: ComponentFixture<DiariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiariesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
