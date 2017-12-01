import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
declare var $: any;


@Component({
   selector: 'main',
   templateUrl: 'main.template.html'
})
export class MainComponent{
    public menuPrincipal;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
    ){
      this.menuPrincipal = true;
    }

    in(option){

        if(option=="section"){
            this._router.navigate(['/sections']);
        }
        else{
            this._router.navigate(['/user']);
        }
    }

    ordenar(){
        this._router.navigate(['/orden']);
    }

    vigilar(){
        this._router.navigate(['/registro']);
    }

    change(){
      if(this.menuPrincipal){
        this.menuPrincipal = false;
      }
      else{
        this.menuPrincipal = true;
      }
    }
}
