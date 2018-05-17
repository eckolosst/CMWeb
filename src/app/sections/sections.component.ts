import { Component, OnInit } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { Router, ActivatedRoute} from '@angular/router'
import { FormGroup, FormControl, FormControlDirective, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';
declare var $: any;
import { Seccion } from '../models/seccion';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { ExitComponent } from './exit.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
   selector: 'sections',
   templateUrl: 'sections.template.html',
   providers: [DataService]
})

export class SectionsComponent implements OnInit{
    public secciones: any[];
    public seleccion;
    public titulo: String;
    public tituloFijo: String;
    public contenido: String;
    public tituloFC = new FormControl('', [Validators.required]);
    public seccionFC = new FormControl('', [Validators.required]);
    public myform = new FormGroup({titulo: this.tituloFC, seccion: this.seccionFC});
    public identity;
    public seccionMod = new Seccion("","","",null,"","");

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        public snackBar: MatSnackBar,
        private _dataService: DataService,
        private _userService: UserService,
        public dialog: MatDialog
    ){
        this.seleccion = -1;
    }

    ngOnInit():void{
      if(localStorage.getItem('identity')==null){
        this._router.navigate(['/']);
      }
      else{
        this.identity = this._userService.getIdentity()
        this.cargar();
      } 

    }

    // Busca en la BD los títulos de todas las secciones existentes, junto a sus ID, para llenar el listado
    cargar(){
        this._dataService.getListaSecciones().subscribe(
            result =>{
                this.secciones = result.titulos;
            },
            error =>{
                console.log(<any>error);
            }
        );
    }


    setSeccion() {
        let user_mod = this.identity.apellido.toUpperCase()+" "+this.identity.nombre;
        let fecha_mod = new Date().toString();

        // Toma los valores del formulario
        var data = new Seccion(this.titulo, this.contenido, this.titulo, null, fecha_mod, user_mod);
        console.log(data)
        if(this.seleccion!=-2){
            let id = this.secciones[this.seleccion]._id;
            data.orden = this.secciones[this.seleccion].orden;
            this._dataService.editSeccion(id, data).subscribe(
                result =>{
                    this.createSnackBar("Sección  "+this.tituloFijo.toUpperCase()+"  actualizada con éxito!")
                    //Hace que vuelva al "Panel Principal"
                    this.seleccion = -1;
                    //Recarga la lista de secciones, ver si se puede hacer de otra manera
                    this.cargar();
                    //Evita error en el Editor cuando cambio de sección.
                    this.seccionFC = new FormControl('', [Validators.required]);
                },
                error =>{
                    console.log(<any>error);
                    this.createSnackBar("Error al Eliminar la Sección.");
                }
            );
        }
        else{
            data.orden = this.secciones.length+1;
            this._dataService.createSeccion(data).subscribe(
                result =>{
                    this.createSnackBar("Sección  "+this.tituloFijo.toUpperCase()+"  creada con éxito!")
                    //Hace que vuelva al "Panel Principal"
                    this.seleccion = -1;
                    //Recarga la lista de secciones, ver si se puede hacer de otra manera
                    this.cargar();
                    //Evita error en el Editor cuando cambio de sección.
                    this.seccionFC = new FormControl('', [Validators.required]);
                },
                error =>{
                    console.log(<any>error);
                    this.createSnackBar("Error al Crear la Sección.")
                }
            );
        }
    }

    // Llena el formulario con los datos de la sección seleccionada o vacío si se quiere crear una nueva
    llenar(i){
        if(i != -2){
            this.seleccion = i;
            let sec = this.secciones[i]._id;

            this._dataService.getSeccion(sec).subscribe(
                result =>{
                    this.seccionMod = result.seccion;
                    this.titulo=this.seccionMod.tituloBtn;
                    this.tituloFijo=this.seccionMod.titulo;
                    this.contenido=this.seccionMod.contenido;
                },
                error =>{
                    console.log(<any>error);
                }
            );
        }
        else{
            this.seleccion = -2;
            this.titulo="";
            this.tituloFijo="Nueva Sección";
            this.contenido="";
        }
    }

    // Regresa a la pantalla de intrucciones
    back(){
        this.seleccion = -1;
        //Evita error en el Editor cuando cambio de sección.
        this.seccionFC = new FormControl('', [Validators.required]);
    }

    // Elimina una sección
    delete(): void {
      let id = this.secciones[this.seleccion]._id;
      let dialogRef = this.dialog.open(ExitComponent, {
        data: {id: id, name: this.secciones[this.seleccion].tituloBtn}
      });

      dialogRef.afterClosed().subscribe(
        result => {
          this.createSnackBar("Sección  "+this.tituloFijo.toUpperCase()+"  eliminada con éxito!");
          //Hace que vuelva al "Panel Principal"
          this.seleccion = -1;
          //Recarga la lista de secciones, ver si se puede hacer de otra manera
          this.cargar();
          //Evita error en el Editor cuando cambio de sección.
          this.seccionFC = new FormControl('', [Validators.required]);
        },
        error =>{
            console.log(<any>error);
            this.createSnackBar("Error al Eliminar la Sección.")
        }
      );
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

    atras(){
        this._router.navigate(['/main']);
    }

}
