import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { groupMoviesByYear } from '@shared/helpers/group-movies-by-year.helper';
import { IMediaSearchFormValue } from '@shared/interfaces/media-list.form.interface';
import {
  IMediaListResponse,
  Media,
} from '@shared/interfaces/media-list.response.interface';
import { firstValueFrom } from 'rxjs';
import { MediaListQuery } from './media-list.query';
import { MediaListStore } from './media-list.store';

@Injectable({
  providedIn: 'root',
})
export class MediaListService implements OnDestroy {
  formValue = this._query.formValue;
  groupingWorker!: Worker;
  isWorkerSupported: boolean;
  private _apiKey = '8ea39b15';

  constructor(
    private _store: MediaListStore,
    private _query: MediaListQuery,
    private _http: HttpClient,
  ) {
    this.isWorkerSupported = typeof Worker != 'undefined';
    this._setupGroupingWorker();
  }

  setIsFormSubmitted(isFormSubmitted: boolean): void {
    this._store.update({ isFormSubmitted });
  }

  async updateFilter(value: Partial<IMediaSearchFormValue>): Promise<void> {
    this._store.update({ form: { ...value } });

    await this.search();
  }

  async updatePage(page: number): Promise<void> {
    this._store.update({ form: { ...this.formValue(), page } });

    await this.search();
  }

  async search(): Promise<void> {
    try {
      this._store.setLoading(true);
      this._store.setError(null);

      const response = await firstValueFrom(
        this._http.get<IMediaListResponse>('https://www.omdbapi.com', {
          params: {
            apiKey: this._apiKey,
            ...this.formValue(),
          },
        }),
      );

      if (this.isWorkerSupported) {
        this.groupingWorker.postMessage(response.Search);
      } else {
        const data = this._groupMediaByYear(response.Search as Media[]);
        this._store.update({ data });
      }

      this._store.update({ totalItems: parseInt(response.totalResults) ?? 0 });
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        this._store.setError(e.error.Error);
      }
    } finally {
      this._store.setLoading(false);
    }
  }

  ngOnDestroy() {
    this.groupingWorker?.terminate();
    this._store.destroy();
  }

  private _setupGroupingWorker(): void {
    if (this.isWorkerSupported) {
      this.groupingWorker = new Worker(
        new URL('./web-workers/media-group.worker.ts', import.meta.url),
      );

      this.groupingWorker.onmessage = ({
        data,
      }: MessageEvent<Record<string, Media[]>>) => {
        this._store.update({ data });
      };

      this.groupingWorker.onerror = (error) => {
        this._store.setError(error.message);
      };
    }
  }

  private _groupMediaByYear(mediaArr: Media[]): Record<string, Media[]> {
    return groupMoviesByYear(mediaArr);
  }
}
