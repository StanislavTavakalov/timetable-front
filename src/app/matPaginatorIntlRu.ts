import {MatPaginatorIntl} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class MatPaginatorIntlRu extends MatPaginatorIntl {
  itemsPerPageLabel = 'Записей на странице';
  nextPageLabel = 'Следующая страница';
  previousPageLabel = 'Предыдущая страница';
  lastPageLabel = 'Последняя страница';
  firstPageLabel = 'Первая страница';
  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return startIndex + 1 + ' — ' + endIndex + ' из ' + length;
  };

}
