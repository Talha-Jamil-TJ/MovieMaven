import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IMediaDetail } from '@shared/interfaces/media-detail.response.interface';

export interface MediaDetailState {
  data: IMediaDetail | null;
  isFormSubmitted: boolean;
  error: string | null;
}

export const createInitialState = (): MediaDetailState => ({
  isFormSubmitted: false,
  error: null,
  data: null,
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'media-detail' })
export class MediaDetailStore extends Store<MediaDetailState> {
  constructor() {
    super(createInitialState());
  }
}
