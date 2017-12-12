import { Component, Inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormControlDirective, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,15}$/;

@Component({
  selector: 'exit',
  template: `<h1 mat-dialog-title>Eliminar Sección</h1>
            <div mat-dialog-content>
              <p>¿Realmente Desea Eliminar la Sección <br><b>{{data.name}}</b>?</p>
            </div>
            <div class="text-center">
              <br>
              <button mat-raised-button (click)="eliminar()" color="accent">Eliminar</button>
              <button mat-raised-button (click)="onNoClick()" color="warn">Cancelar</button>
            </div>`,
  providers: [DataService]
})
export class ExitComponent {

  constructor(
    public dialogRef: MatDialogRef<ExitComponent>,
    public _dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  eliminar(){
    let id = this.data.id;
    this._dataService.deleteSeccion(id).subscribe(
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
}
