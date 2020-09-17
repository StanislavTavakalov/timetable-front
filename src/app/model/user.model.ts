import {UserRoles} from './user-roles.model';


export class User {
  public id: string;
  public username: string;
  public userRoles: UserRoles[];
}
