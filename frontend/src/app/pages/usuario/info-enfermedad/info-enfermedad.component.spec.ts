import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEnfermedadComponent } from './info-enfermedad.component';

describe('InfoEnfermedadComponent', () => {
  let component: InfoEnfermedadComponent;
  let fixture: ComponentFixture<InfoEnfermedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEnfermedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEnfermedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
