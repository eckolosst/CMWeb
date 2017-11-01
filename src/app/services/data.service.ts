import { Injectable, Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Seccion } from '../models/seccion';
import { GLOBAL } from '../global';
import { UserService } from './user.service';

@Component({
   providers: [UserService]
})

@Injectable()
export class DataService{
  public url: String;

  constructor(
    private _userService: UserService,
    public _http: Http
  ){
    this.url = GLOBAL.url;
  }


  /*---------------------------------------------------------------------------*/
  /*                        Peticiones para Secciones                          */
  /*---------------------------------------------------------------------------*/
  getListaSecciones(){
    let headers = new Headers({"Content-Type":"application/json", 'Authorization': this._userService.getTokem()});
    return this._http.get(this.url+"/titulos",{headers: headers}).map(res => res.json());
  }
  getSeccion(id){
    let headers = new Headers({"Content-Type":"application/json", 'Authorization': this._userService.getTokem()});
    return this._http.get(this.url+"/seccion/"+id,{headers: headers}).map(res => res.json());
  }
  editSeccion(id, data){
    let headers = new Headers({"Content-Type":"application/json", 'Authorization': this._userService.getTokem()});
    return this._http.put(this.url+"/seccion/"+id,data,{headers: headers}).map(res => res.json());
  }
  deleteSeccion(id){
    let headers = new Headers({"Content-Type":"application/json", 'Authorization': this._userService.getTokem()});
    let options = new RequestOptions({headers: headers});
    return this._http.delete(this.url+"/seccion/"+id,options).map(res => res.json());
  }
  createSeccion(data){
    let params = JSON.stringify(data);
    let headers = new Headers({"Content-Type":"application/json", 'Authorization': this._userService.getTokem()});
    return this._http.post(this.url+"/seccion",params,{headers: headers}).map(res => res.json());
  }
}
