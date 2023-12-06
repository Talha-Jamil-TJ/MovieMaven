import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Query } from '@datorama/akita';
import { filter, map } from 'rxjs';
import { MediaDetailState, MediaDetailStore } from './media-detail.store';

@Injectable({ providedIn: 'root' })
export class MediaDetailQuery extends Query<MediaDetailState> {
  isLoading = toSignal(this.selectLoading());

  detailEntries = toSignal(
    this.select(({ data }) => data).pipe(
      filter(Boolean),
      map((data) => Object.entries(data) as [string, string][]),
    ),
    {
      initialValue: [],
    },
  );

  error = toSignal(this.selectError());

  constructor(protected override store: MediaDetailStore) {
    super(store);
  }
}
