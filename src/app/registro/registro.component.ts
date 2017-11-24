import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
declare var $: any;
import { Seccion } from '../models/seccion';
import { DataService } from '../services/data.service';


@Component({
   selector: 'registro',
   templateUrl: 'registro.template.html',
   providers: [DataService]
})

export class RegistroComponent implements OnInit{
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
      this._dataService.getListaSecciones().subscribe(
          result =>{
              this.secciones = result.titulos;
          },
          error =>{
              console.log(<any>error);
          }
      );
    }

    // Regresa
    atras(){
        this._router.navigate(['/sections']);
    }

}
