import { Component, OnInit, Inject } from '@angular/core';
import { HomePageService } from '../../services/home-page.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { empty } from 'rxjs';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  constructor(
    private userService: HomePageService,
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  public removeUser(): void{
    this.userService.remove(this.data.id).subscribe(data => {
      console.log('Success deleted', data);
      this.successfullyDeleted();
      this.dialogRef.close();
      window.location.reload();
    },
    error => {
      console.log(error);
      this.handleError(error.status);
      return empty();
    })
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private handleError(status: number) {
    this.snackBar.open(`Erro: ${status} Tente novamente mais tarde.`, "OK", {
      duration: 5000
    });
  }


  private successfullyDeleted() {
    this.snackBar.open("Deletado com sucesso!.", "OK", {
      duration: 5000
    });
  }
}
