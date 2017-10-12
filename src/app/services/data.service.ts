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
    return this._http.get(this.url+"/titulos").map(res => res.json());
  }
  getSeccion(id){
    return this._http.get(this.url+"/seccion/"+id).map(res => res.json());
  }
  editSeccion(id, data){
    let params = JSON.stringify(data)
    let headers = new Headers({"Content-Type":"application/json"});
    return this._http.put(this.url+"/seccion/"+id,params,{headers: headers}).map(res => res.json());
  }
}
