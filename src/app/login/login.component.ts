import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    rForm: FormGroup;

    constructor(private _service:UserService, private fb:FormBuilder) {
        this.rForm = fb.group({
            'email':[null,Validators.required]
        });
    }

    login() {
        if(!this._service.login(this.user)) {
            this.errorMsg = 'Falla en la autentificación! Intente nuevamente...';
        }
    }
}
