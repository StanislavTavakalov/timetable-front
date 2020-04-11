import { Injectable } from '@angular/core';

@Injectable()
export class TransformService {

  static transformToMap(list: {id: string, [propName: string]: any}[]): Map<string, any> {
    const result = new Map<string, any>();
    if (list) {
      list.reduce((obj, current) => {
        obj.set(current.id, current);
        return obj;
      }, result);
    }
    return result;
  }

  static transformToMapBoolean(list: {id: string, [propName: string]: any}[]): Map<boolean, any> {
    const result = new Map<boolean, any>();
    if (list) {
      list.reduce((obj, current) => {
        obj.set(false, current);
        return obj;
      }, result);
    }
    return result;
  }

}
