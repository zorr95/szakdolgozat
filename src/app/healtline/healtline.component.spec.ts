import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HealtlineComponent } from './healtline.component';

describe('HealtlineComponent', () => {
  let component: HealtlineComponent;
  let fixture: ComponentFixture<HealtlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealtlineComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HealtlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
