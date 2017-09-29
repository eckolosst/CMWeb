import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { UserService } from '../services/user.service';
import { FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
   selector: 'login',
   templateUrl: 'login.template.html',
   providers: [UserService]
})

export class LoginComponent {
    public user = new UserComponent('','');
    public errorMsg = '';

    constructor(private _service:UserService) { }

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);

    login() {
        if(!this._service.login(this.user)) {
            this.errorMsg = 'Falla en la autentificación! Intente nuevamente...';
        }
    }
}
