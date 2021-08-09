import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePageService } from '../../services/home-page.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { empty } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: HomePageService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data ? this.data.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      email: [this.data ? this.data.email : '', [Validators.required, Validators.email]],
      phone: [this.data ? this.data.phone : '', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      birth_at: [this.data ? this.data.birth_at : '', [Validators.required]],
    })
  }

  private submit(){
    if(this.form.valid){
      this.createUser()
    }
  }

  public createUser(): void {
    if(this.form.valid) {
      this.userService.create(this.form.value).subscribe(data => {
        console.log('Success created', data);
        this.successfullyCreated();
        this.reset();
        
      },
      error => {
        console.log(error);
        this.handleError(error.status);
        return empty();
      })
    } else {
      this.invalidForm();
    }
  }

  public editUser(): void {
    if(this.form.valid){
      this.userService.update(this.form.value, this.data['id']).subscribe(data => {
        console.log('Success updated', data);
        this.successfullyUpdated();
        this.reset();
      },
      error => {
        console.log(error);
        this.handleError(error.status);
        return empty();
      })
    } else {
      this.invalidForm();
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private reset(): void {
    this.form.reset();
    this.dialogRef.close();
    window.location.reload()
  }

  private handleError(status: number) {
    this.snackBar.open(`Erro: ${status} Tente novamente mais tarde.`, "OK", {
      duration: 5000
    });
  }

  private successfullyCreated() {
    this.snackBar.open("Criado com sucesso!.", "OK", {
      duration: 5000
    });
  }

  private successfullyUpdated () {
    this.snackBar.open("Editado com sucesso!.", "OK", {
      duration: 5000
    })
  }

  private invalidForm () {
    this.snackBar.open("Formulário inválido.", "OK", {
      duration: 5000
    });
  }
}
