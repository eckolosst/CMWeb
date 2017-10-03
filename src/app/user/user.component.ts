import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'user',
   templateUrl: 'user.template.html',
})

export class UserComponent {
    constructor(public email: string, public password: string) { }

    ngOnInit() {
    }

}
