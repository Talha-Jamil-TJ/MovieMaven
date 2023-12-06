import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPaginatorComponent } from './media-paginator.component';

describe('MediaPaginatorComponent', () => {
  let component: MediaPaginatorComponent;
  let fixture: ComponentFixture<MediaPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaPaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
