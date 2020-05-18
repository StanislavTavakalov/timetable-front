import {Group} from './group.model';

export class Flow {
  public id: string;
  public description: string;
  public name: string;
  public groups: Group[];
}
