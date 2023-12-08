import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { IMediaDetailFormValue } from '@shared/interfaces/media-detail.form.interface';
import { IMediaDetail } from '@shared/interfaces/media-detail.response.interface';
import { firstValueFrom } from 'rxjs';
import { MediaDetailStore } from './media-detail.store';

@Injectable({
  providedIn: 'root',
})
export class MediaDetailService implements OnDestroy {
  private _apiKey = '8ea39b15';

  constructor(
    private _store: MediaDetailStore,
    private _http: HttpClient,
  ) {}

  async getDetail(formValue: Partial<IMediaDetailFormValue>): Promise<void> {
    try {
      this._store.setLoading(true);
      this._store.setError(null);

      const data = await firstValueFrom(this._getMediaDetail(formValue));

      this._store.update({ data });
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        this._store.setError(e.error.Error);
      }
    } finally {
      this._store.setLoading(false);
    }
  }

  ngOnDestroy() {
    this._store.destroy();
  }

  private _getMediaDetail(formValue: Partial<IMediaDetailFormValue>) {
    return this._http.get<IMediaDetail>('https://www.omdbapi.com', {
      params: {
        ...formValue,
        apiKey: this._apiKey,
      },
    });
  }
}
