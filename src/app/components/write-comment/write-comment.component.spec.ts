import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteCommentComponent } from './write-comment.component';

describe('WriteCommentComponent', () => {
  let component: WriteCommentComponent;
  let fixture: ComponentFixture<WriteCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
