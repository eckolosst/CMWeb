import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Sort } from '@angular/material';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';

@Component({
   selector: 'user',
   templateUrl: 'user.template.html',
   providers: [UserService]
})

export class UserComponent {
    public users;
    public sortedData;
    public nombre;
    public apellido;
    public email;
    public pass;
    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        public snackBar: MatSnackBar,
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
        let data = new User(this.email, this.pass, this.nombre, this.apellido);
        this._userService.register(data).subscribe(
            result =>{
                this.snackBar.open("Usuario creado con éxito!", null,{
                  duration: 4000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  extraClasses: ['success-snackbar']
                });
                this.cargar();
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

    atras(){
        this._router.navigate(['/main']);
    }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
