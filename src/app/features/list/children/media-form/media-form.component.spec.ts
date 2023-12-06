import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaDetailQuery } from '@store/media-detail/media-detail.query';
import { MediaListService } from '@store/media-list/media-list.service';

import { MediaFormComponent } from './media-form.component';

describe('MediaFormComponent', () => {
  let component: MediaFormComponent;
  let fixture: ComponentFixture<MediaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaFormComponent, RouterTestingModule, NoopAnimationsModule],
      providers: [
        {
          provide: MediaListService,
          useValue: {
            setIsFormSubmitted: (bool: boolean) => null,
          },
        },
        MediaDetailQuery,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component', () => {
    it('should call _initForm() when ngOnInit() is called', () => {
      const spy = spyOn<any>(component, '_initForm');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    });

    it('should call _subscribeToYearControlChanges() when ngOnInit() is called', () => {
      const spy = spyOn<any>(component, '_subscribeToYearControlChanges');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    });

    it('should reset type control when clearTypeSelection() is called', () => {
      const spy = spyOn(component.form.controls.type, 'reset');

      component.clearTypeSelection();

      expect(spy).toHaveBeenCalled();
    });

    it('should set form when _initForm() is called', () => {
      component.form = null as any;

      component['_initForm']();

      expect(component.form).toBeTruthy();
    });

    it('should subscribe on yearControl when _subscribeToYearControlChanges() is called', () => {
      const spy = spyOn(component.yearControl.valueChanges, 'subscribe');

      component['_subscribeToYearControlChanges']();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    it('should render .title component', () => {
      const element = fixture.nativeElement.querySelector('.title');

      expect(element).toBeTruthy();
    });

    it('should render .media-type component', () => {
      const element = fixture.nativeElement.querySelector('.media-type');

      expect(element).toBeTruthy();
    });

    it('should render .year component', () => {
      const element = fixture.nativeElement.querySelector('.year');

      expect(element).toBeTruthy();
    });

    it('should render .submit button', () => {
      const element = fixture.nativeElement.querySelector('.submit');

      expect(element).toBeTruthy();
    });

    it('should call onSearch() when .submit button is clicked', () => {
      const spy = spyOn(component, 'onSearch');

      const element = fixture.nativeElement.querySelector('.submit');

      element.click();

      expect(spy).toHaveBeenCalled();
    });

    it('should disable .submit button when isLoading() is true', () => {
      component.isLoading = signal(true);

      fixture.detectChanges();

      const element = fixture.nativeElement.querySelector('.submit');

      expect(element.disabled).toBeTrue();
    });

    it('should not disable .submit button when isLoading() is false', () => {
      component.isLoading = signal(false);

      fixture.detectChanges();

      const element = fixture.nativeElement.querySelector('.submit');

      expect(element.disabled).toBeFalse();
    });
  });
});
