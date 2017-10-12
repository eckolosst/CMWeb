import { Component, OnInit } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { Router, ActivatedRoute} from '@angular/router'
import { FormGroup, FormControl, FormControlDirective, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';
declare var $: any;
import { Seccion } from '../models/seccion';
import { DataService } from '../services/data.service';



@Component({
   selector: 'main',
   templateUrl: 'main.template.html',
   providers: [DataService]
})

export class MainComponent implements OnInit{
        public secciones;
        public seleccion = -1;
        public errorMsg = '';
        public titulo: String;
        public tituloFijo: String;
        public contenido: String;
        // public buttonFC = new FormControl('', [Validators.required]);
        public tituloFC = new FormControl('', [Validators.required]);
        public seccionFC = new FormControl('', [Validators.required]);
        public myform = new FormGroup({titulo: this.tituloFC, seccion: this.seccionFC})

        constructor(
            private _route: ActivatedRoute,
            private _router: Router,
            public snackBar: MatSnackBar,
            private _dataService: DataService
        ){}

        ngOnInit():void{
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
            console.log(this.contenido);

            let data = new Seccion(this.titulo, this.titulo, this.contenido);
            let id = this.secciones[this.seleccion]._id;

            this._dataService.editSeccion(id, data).subscribe(
                result =>{
                      this.snackBar.open("Sección  "+this.tituloFijo.toUpperCase()+"  actualizada con éxito!", null,{
                      duration: 4000,
                      horizontalPosition: 'center',
                      verticalPosition: 'top',
                      extraClasses: ['success-snackbar']
                    });
                    //Hace que vuelva al "Panel Principal"
                    // this.seleccion = -1;
                },
                error =>{
                    console.log(<any>error);
                    this.snackBar.open("Error al Modificar la Sección. Intente nuevamente más tarde.", null,{
                      duration: 4000,
                      horizontalPosition: 'center',
                      verticalPosition: 'top',
                      extraClasses: ['success-snackbar']
                    });

                }
            );
            // Transformación String a HTML (para APP - NO BORRAR TODAVIA)
            // var $hs = $( "#hs" );
            // var htmlString = $.parseHTML( this.contenido );
            // $hs.append( htmlString );

            //Evita error cuando cambio de seción. Ver si hay otra solución.
            // this.seccionFC = new FormControl('', [Validators.required]);

        }

        llenar(i){
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

        back(){
            this.seleccion = -1;

            //Evita error cuando cambio de seción. Ver si hay otra solución.
            this.seccionFC = new FormControl('', [Validators.required]);
        }
}
