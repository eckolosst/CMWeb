import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
declare var $: any;
import { Seccion } from '../models/seccion';
import { UserService } from '../services/user.service'
import { DataService } from '../services/data.service';
import { SortablejsModule } from 'angular-sortablejs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';

@Component({
   selector: 'orden',
   templateUrl: 'orden.template.html',
   providers: [DataService]
})

export class OrdenComponent implements OnInit{
    public secciones: any[];
    public seccionesNew: any[];
    public seleccion;
    public titulo: String;
    public tituloFijo: String;
    public contenido: String;
    public identity;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        public snackBar: MatSnackBar,
        private _userService: UserService,
        private _dataService: DataService
    ){
        this.seleccion = -1;
    }

    ngOnInit():void{
      this.identity = this._userService.getIdentity()
      this._dataService.getListaSecciones().subscribe(
          result =>{
              this.secciones = result.titulos;
              this.seccionesNew =this.secciones.slice();
          },
          error =>{
              console.log(<any>error);
          }
      );
    }

    // Regresa
    atras(){
        this._router.navigate(['/main']);
    }

    ordenar(){
        let ver = 1;
        for(let i=0; i<this.seccionesNew.length;i++){
          if(this.secciones[i]._id != this.seccionesNew[i]._id){
            // Registra quien realizo el cambio
            let user_mod = this.identity.apellido.toUpperCase()+" "+this.identity.nombre;
            let fecha_mod = new Date().toString();

            this._dataService.editSeccion(this.seccionesNew[i]._id,{orden: i+1, fecha_mod: fecha_mod, user_mod: user_mod}).subscribe(
                result =>{
                    ver = ver * 1;
                },
                error =>{
                    ver = ver * 0;
                    console.log(<any>error);
                }
            );
          }
        }
        if(ver == 1){
          this.createSnackBar("Secciones ordenadas con éxito!")
          //Hace que vuelva al "Panel Principal"
          this._router.navigate(['/main']);
        }
        else{
          this.createSnackBar("Disculpe, ocurrió un error. Intente más tarde.")
          //Hace que vuelva al "Panel Principal"
          this._router.navigate(['/main']);
        }
    }

    // Muestra un mensaje
    createSnackBar(msj){
        this.snackBar.open(msj, null,{
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          extraClasses: ['success-snackbar']
        });
    }

}
