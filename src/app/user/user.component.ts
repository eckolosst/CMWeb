import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'user',
   templateUrl: 'user.template.html',
})

export class UserComponent {
    constructor(public username: string, public password: string) { }

    ngOnInit() {
    }

}
