import { Component, OnInit } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { Router, ActivatedRoute} from '@angular/router'
import { FormGroup, FormControl, FormControlDirective, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';
declare var $: any;
import { Seccion } from '../models/seccion';
import { DataService } from '../services/data.service';


@Component({
   selector: 'sections',
   templateUrl: 'sections.template.html',
   providers: [DataService]
})

export class SectionsComponent implements OnInit{
    public secciones;
    public seleccion;
    public titulo: String;
    public tituloFijo: String;
    public contenido: String;
    public tituloFC = new FormControl('', [Validators.required]);
    public seccionFC = new FormControl('', [Validators.required]);
    public myform = new FormGroup({titulo: this.tituloFC, seccion: this.seccionFC});


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        public snackBar: MatSnackBar,
        private _dataService: DataService
    ){
        this.seleccion = -1;
    }

    ngOnInit():void{
        this.cargar();
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
        // console.log(this.contenido);

        // Toma los valores del formulario
        var data = new Seccion(this.titulo, this.contenido, this.titulo);

        if(this.seleccion!=-2){
            let id = this.secciones[this.seleccion]._id;

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
                    let res = result.seccion;
                    this.titulo=res.tituloBtn;
                    this.tituloFijo=res.titulo;
                    this.contenido=res.contenido;
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
    delete(){
        let id = this.secciones[this.seleccion]._id;

        this._dataService.deleteSeccion(id).subscribe(
            result =>{
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

    ordenar(){
        this._router.navigate(['/orden']);
    }

    vigilar(){
        this._router.navigate(['/registro']);
    }
}
