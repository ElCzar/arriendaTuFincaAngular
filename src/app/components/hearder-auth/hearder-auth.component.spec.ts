import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HearderAuthComponent } from './hearder-auth.component';

describe('HearderAuthComponent', () => {
  let component: HearderAuthComponent;
  let fixture: ComponentFixture<HearderAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HearderAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HearderAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
