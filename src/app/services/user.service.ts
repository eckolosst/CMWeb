import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';

@Injectable()
export class UserService {
    public url: String;
    public identity;
    public token;

    constructor(private _http:Http){
        this.url = GLOBAL.url;
    }

    register(user_to_register){
        let params = JSON.stringify(user_to_register);
        let headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.getTokem()});
        return this._http.post(this.url+'/registro/', params, {headers:headers})
                         .map(res => res.json());
    }

    singup(user_to_login, gettoken = null){
        if(gettoken != null){
            user_to_login.gettoken = gettoken;
        }
        let params = JSON.stringify(user_to_login);
        let headers =  new Headers({'Content-Type': 'application/json'});
        return  this._http.post(this.url+'/usuarioLog/web', params, {headers:headers})
                          .map(res => res.json());
    }

    getIdentity(){
        let identityIn;
        try{
            identityIn = JSON.parse(localStorage.getItem('identity'));
        }
        catch(ex){
            console.log('no se ha logueado nadie aun')
        }

        if(identityIn != 'undefined'){
            this.identity = identityIn;
        }
        else{
            this.identity = null;
        }
        return this.identity;
    }

    getTokem(){
        let tokenIn = localStorage.getItem('token');
        if(tokenIn != 'undefined'){
            this.token = tokenIn;
        }
        else{
            this.token = null;
        }
        return this.token
    }

    getListaUsuarios(){
        let headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.getTokem()});
        return this._http.get(this.url+'/usuario', {headers:headers}).map(res => res.json());
    }

    getSeguimiento(id){
        let headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.getTokem()});
        return this._http.get(this.url+'/seguimiento/'+id, {headers:headers}).map(res => res.json());
    }

    deleteUser(id){
      let headers = new Headers({'Content-Type':'application/json', 'Authorization': this.getTokem()});
      let options = new RequestOptions({headers: headers});
      return this._http.delete(this.url+"/usuario/"+id,options).map(res => res.json());
    }

    changeUser(id, data){
      let headers = new Headers({"Content-Type":"application/json", 'Authorization': this.getTokem()});
      return this._http.put(this.url+"/usuario/"+id,data,{headers: headers}).map(res => res.json());
    }
}
