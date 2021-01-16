import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuffsComponent } from './stuffs.component';

describe('StuffsComponent', () => {
  let component: StuffsComponent;
  let fixture: ComponentFixture<StuffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuffsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
