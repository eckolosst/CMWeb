import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
declare var $: any;
import { Seccion } from '../models/seccion';
import { DataService } from '../services/data.service';


@Component({
   selector: 'info',
   templateUrl: 'info.template.html',
   providers: [DataService]
})

export class InfoComponent implements OnInit{
    public secciones;
    public seleccion;
    public titulo: String;
    public tituloFijo: String;
    public contenido: String;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _dataService: DataService
    ){
        this.seleccion = -1;
    }

    ngOnInit():void{
      this._dataService.getInfo().subscribe(
          result =>{
              this.secciones = result.secciones;
          },
          error =>{
              console.log(<any>error);
          }
      );
    }

    // Regresa a la pantalla de intrucciones
    back(){
        this.seleccion = -1;
    }

    // Regresa al Home
    atras(){
        this._router.navigate(['/home']);
    }

    // Llena el formulario con los datos de la sección seleccionada o vacío si se quiere crear una nueva
    llenar(i){
        this.seleccion = i;
        let sec = this.secciones[i];
        this.titulo=sec.tituloBtn;
        this.tituloFijo=sec.titulo;
        this.contenido=sec.contenido;

    }
}
