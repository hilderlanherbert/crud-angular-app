import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericCrudService } from 'src/app/shared/repository/generic-crud-service';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HomePageService extends GenericCrudService<User> {

  constructor(http: HttpClient) {
    super(http, `${environment.API}/people`)
  }
}
