import {Deanery} from './deanery.model';
import {Lectern} from './lectern.model';

export class User {
  public id: string;
  public username: string;
  public password: string;
  public deanery: Deanery;
  public lectern: Lectern;
}
