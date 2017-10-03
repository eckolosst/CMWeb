import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { UserService } from '../services/user.service';
import { FormControl, FormControlDirective, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
   selector: 'login',
   templateUrl: 'login.template.html',
   providers: [UserService]
})

export class LoginComponent {
    public user = new UserComponent('','');
    public errorMsg = '';
    public email;
    public emailFC = new FormControl('',[
        Validators.required,
        Validators.pattern(EMAIL_REGEX)
    ]);

    constructor(private _service:UserService) {    }

    login() {
        if(!this._service.login(this.user)) {
            this.errorMsg = 'Falla en la autentificación! Intente nuevamente...';
        }
    }
}
