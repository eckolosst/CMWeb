import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Sort } from '@angular/material';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormControlDirective, Validators } from '@angular/forms';
import { EditComponent } from './edit.component';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,15}$/;

@Component({
   selector: 'user',
   templateUrl: 'user.template.html',
   providers: [UserService]
})

export class UserComponent {
    public users;
    public userForm;
    public sortedData;
    public user: User = new User("","","","","admin",[]);
    public nombreFC = new FormControl('', [Validators.required]);
    public apellidoFC = new FormControl('', [Validators.required]);
    public emailFC = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
    public passFC = new FormControl('', [Validators.required, Validators.pattern(PASS_REGEX)]);
    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        public snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {}

    ngOnInit():void{
        this.cargar();
    }

    cargar(){
        this._userService.getListaUsuarios().subscribe(
            result =>{
                this.users = result.usuarios;
                this.sortedData = this.users.slice();
            },
            error =>{
                console.log(<any>error);
            }
        );
    }

    sortData(sort: Sort) {
        const data = this.users.slice();
        if (!sort.active || sort.direction == '') {
          this.sortedData = data;
          return;
        }

        this.sortedData = data.sort((a, b) => {
          let isAsc = sort.direction == 'asc';
          switch (sort.active) {
            case 'nombre': return compare(a.nombre, b.nombre, isAsc);
            case 'apellido': return compare(+a.apellido, +b.apellido, isAsc);
            case 'email': return compare(+a.email, +b.email, isAsc);
            case 'pass': return compare(+a.pass, +b.pass, isAsc);
            default: return 0;
          }
        });
    }

    crearUsuario(){
        this._userService.register(this.user).subscribe(
            result =>{
                // console.log(result);
                this.snackBar.open("Usuario creado con éxito!", null,{
                  duration: 4000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  extraClasses: ['success-snackbar']
                });
                this.cargar();
                // this.user = new User("","","","",[]);
                this.nombreFC = new FormControl('', [Validators.required]);
                this.apellidoFC = new FormControl('', [Validators.required]);
                this.emailFC = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
                this.passFC = new FormControl('', [Validators.required, Validators.pattern(PASS_REGEX)]);
            },
            error =>{
                console.log(<any>error);
                this.snackBar.open("Error al Crear el Usuario.", null,{
                  duration: 4000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  extraClasses: ['success-snackbar']
                });
            }
        );
    }

    eliminarUsuario(i){
        let id = this.users[i]._id;
        this._userService.deleteUser(id).subscribe(
            result =>{
                this.snackBar.open("Usuario eliminado con éxito!", null,{
                  duration: 4000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  extraClasses: ['success-snackbar']
                });
                this.cargar();
            },
            error =>{
                console.log(<any>error);
                this.snackBar.open("Error al Eliminar el Usuario.", null,{
                  duration: 4000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  extraClasses: ['success-snackbar']
                });
            }
        );
    }

    editar(data): void {
      this.userForm =  this.users[data];
      let dialogRef = this.dialog.open(EditComponent, {
        data: { nombre: this.userForm.nombre, apellido: this.userForm.apellido, pass: this.userForm.pass, id: this.userForm._id }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.cargar();
      });
    }

    atras(){
        this._router.navigate(['/main']);
    }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
