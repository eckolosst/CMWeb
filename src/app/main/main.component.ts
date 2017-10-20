import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router'
declare var $: any;


@Component({
   selector: 'main',
   templateUrl: 'main.template.html'
})

export class MainComponent{

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
    ){}

    in(option){

        if(option=="section"){
            console.log("Entró")
            this._router.navigate(['/sections']);
        }
        else{
            this._router.navigate(['/users']);
        }
    }
}
