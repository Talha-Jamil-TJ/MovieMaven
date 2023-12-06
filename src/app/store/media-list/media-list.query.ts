import { computed, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Query } from '@datorama/akita';
import { extractLatestYear } from '@shared/helpers/extract-latest-year.helper';
import { Media } from '@shared/interfaces/media-list.response.interface';
import { MediaListState, MediaListStore } from './media-list.store';

@Injectable({ providedIn: 'root' })
export class MediaListQuery extends Query<MediaListState> {
  isLoading = toSignal(this.selectLoading());

  searchRecord = toSignal(this.select(({ data }) => data));

  isFormSubmitted = toSignal(this.select(({ isFormSubmitted }) => isFormSubmitted));

  mediaYears = computed(() =>
    Object.keys((this.searchRecord() ?? {}) as Record<string, Media[]>).sort(
      (a, b) => extractLatestYear(b) - extractLatestYear(a),
    ),
  );

  currentPage = toSignal(
    this.select(({ form }) => form?.page ?? 1),
    {
      initialValue: 1,
    },
  );

  totalItems = toSignal(
    this.select(({ totalItems }) => totalItems),
    {
      initialValue: 0,
    },
  );

  formValue = toSignal(this.select(({ form }) => form));

  error = toSignal(this.selectError());

  constructor(protected override store: MediaListStore) {
    super(store);
  }

  mediaFromYear = (year: string): Signal<Media[]> => computed(() => this.searchRecord()?.[year] ?? ([] as Media[]));
}
