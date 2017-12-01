import { Component, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormControlDirective, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,15}$/;

@Component({
  selector: 'edit',
  templateUrl: 'edit.template.html',
  providers: [UserService]
})
export class EditComponent {
  public pass = false;
  public nombreFC;
  public apellidoFC;
  public passFC;
  public password;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    public _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.nombreFC = new FormControl('', [Validators.required]);
      this.apellidoFC = new FormControl('', [Validators.required]);
      this.passFC = new FormControl('', [Validators.required, Validators.pattern(PASS_REGEX)]);
    }


  editar(){
    let id = this.data.id;
    delete this.data.id;
    if(this.pass)
      this.data.pass = this.password;
    else
      delete this.data.pass;
    this._userService.changeUser(id, this.data).subscribe(
        result =>{
            this.dialogRef.close();
        },
        error =>{
            console.log(<any>error);
        }
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  changePass(){
    if(this.pass){
        this.pass = false;
    }
    else{
        this.pass = true;
    }
  }
}
