import { Injectable } from '@angular/core';
import { UserList } from '../interfaces/user-list';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key: string): UserList[] {
    return JSON.parse(localStorage.getItem(key))
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }
}
