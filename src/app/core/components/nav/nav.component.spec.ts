import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    const titleElement = fixture.nativeElement.querySelector('#title');

    expect(titleElement.innerText).toEqual('Movie Maven');
  });

  it('should have correct List link label', () => {
    const link = fixture.nativeElement.querySelector('#list-link');

    expect(link.innerText).toEqual('List');
  });

  it('should have correct Detail link label', () => {
    const link = fixture.nativeElement.querySelector('#detail-link');

    expect(link.innerText).toEqual('Detail');
  });

  it('should have correct routerLink on #list-link', () => {
    const link = fixture.nativeElement.querySelector('#list-link');

    expect(link.getAttribute('href')).toEqual('/');
  });

  it('should have correct routerLink on #detail-link', () => {
    const link = fixture.nativeElement.querySelector('#detail-link');

    expect(link.getAttribute('href')).toEqual('/detail');
  });
});
