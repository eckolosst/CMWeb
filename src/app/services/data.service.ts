import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Seccion } from '../models/seccion';
import { GLOBAL } from '../global';

@Injectable()
export class DataService{
  public url: String;

  constructor(
    public _http: Http
  ){
    this.url = GLOBAL.url;
  }


  /*---------------------------------------------------------------------------*/
  /*                        Peticiones para Secciones                          */
  /*---------------------------------------------------------------------------*/
  getListaSecciones(){
    console.log("Entró");
    return this._http.get(this.url+"/titulos").map(res => res.json());
  }
  getSeccion(id){
    return this._http.get(this.url+"/seccion/"+id).map(res => res.json());
  }
  setSeccion(id){
    return this._http.get(this.url+"/seccion/"+id).map(res => res.json());
  }
}
