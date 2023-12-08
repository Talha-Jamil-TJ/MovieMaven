import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MediaDetailQuery } from './media-detail.query';
import { MediaDetailService } from './media-detail.service';
import { MediaDetailStore } from './media-detail.store';

describe('MediaDetailService', () => {
  let service: MediaDetailService;
  let store: MediaDetailStore;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MediaDetailStore, MediaDetailQuery],
    }).compileComponents();

    service = TestBed.inject(MediaDetailService);
    store = TestBed.inject(MediaDetailStore);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call store.setLoading() when getDetail() is called', async () => {
    spyOn(service['_http'], 'get').and.returnValue(of({}));
    spyOn(store, 'setLoading');

    await service.getDetail({});

    expect(store.setLoading).toHaveBeenCalledTimes(2);
  });

  it('should call store.setError(null) when getDetail() is called', async () => {
    spyOn(service['_http'], 'get').and.returnValue(of({}));
    spyOn(store, 'setError');

    await service.getDetail({});

    expect(store.setError).toHaveBeenCalledWith(null);
  });

  it('should make correct GET request when getDetail() is called', async () => {
    service['_getMediaDetail']({}).subscribe();

    const req = httpTestingController.expectOne(
      'https://www.omdbapi.com?apiKey=8ea39b15',
    );

    expect(req.request.method).toEqual('GET');

    req.flush({});
  });
});
