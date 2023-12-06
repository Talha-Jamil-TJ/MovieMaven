import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaListService } from '@store/media-list/media-list.service';

import { MediaPaginatorComponent } from './media-paginator.component';

describe('MediaPaginatorComponent', () => {
  let component: MediaPaginatorComponent;
  let fixture: ComponentFixture<MediaPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MediaPaginatorComponent,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: MediaListService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
