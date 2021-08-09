import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user.model';
import { HomePageService } from './services/home-page.service';
import { Observable, Subject, empty } from 'rxjs';
import { UserFormComponent } from './components/user-form/user-form.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'birth_at', 'actions'];

  users$: Observable<User[]>;
  error$ = new Subject<boolean>();


  constructor(public dialog: MatDialog, private userService: HomePageService, private snackBar: MatSnackBar) {

    this.users$ = this.userService.list()
    .pipe(
      catchError(error => {
        console.log(error);
        this.handleError(error.status)
        this.error$.next(true);
        return empty();
      })
    );
  }

  ngOnInit(): void {}

  public createDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px'
    });
  }

  public editDialog(element:User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px', data: element
    });
  }

  public deleteDialog(element:User): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '400px', data: element
    });
  }

  private handleError(status: number) {
    this.snackBar.open(`Erro: ${status} Tente novamente mais tarde.`, "OK", {
      duration:5000
    });
  }

}
