import {MatPaginatorIntl} from '@angular/material';
import {Injectable} from '@angular/core';
@Injectable()
export class MatPaginatorIntlRu extends MatPaginatorIntl {
  itemsPerPageLabel = 'Записей на странице';
  nextPageLabel = 'Следующая страница';
  previousPageLabel = 'Предыдущая страница';
  lastPageLabel = 'Последняя страница';
  firstPageLabel = 'Первая страница';

}
