import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Query } from '@datorama/akita';
import { MediaDetailState, MediaDetailStore } from './media-detail.store';

@Injectable({ providedIn: 'root' })
export class MediaDetailQuery extends Query<MediaDetailState> {
  isLoading = toSignal(this.selectLoading());

  detail = toSignal(this.select(({ data }) => data));

  isFormSubmitted = toSignal(this.select(({ isFormSubmitted }) => isFormSubmitted));

  error = toSignal(this.selectError());

  constructor(protected override store: MediaDetailStore) {
    super(store);
  }
}
