import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientComponent } from './patient.component';

describe('PatientComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
