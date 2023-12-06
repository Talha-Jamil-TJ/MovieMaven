import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IMediaSearchFormValue } from '@shared/interfaces/media-list.form.interface';
import { Media } from '@shared/interfaces/media-list.response.interface';

export interface MediaListState {
  data: Record<string, Media[]> | null;
  form: Partial<IMediaSearchFormValue> | null;
  isFormSubmitted: boolean;
  error: string | null;
  totalItems: number;
}

export const createInitialState = (): MediaListState => ({
  isFormSubmitted: false,
  form: { page: 1 },
  totalItems: 0,
  error: null,
  data: null,
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'media-list' })
export class MediaListStore extends Store<MediaListState> {
  constructor() {
    super(createInitialState());
  }
}
