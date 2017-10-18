import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute} from '@angular/router'
import { FormControl, FormControlDirective, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;

@Component({
   selector: 'login',
   templateUrl: 'login.template.html',
   providers: [UserService]
})

export class LoginComponent {
    public user = new UserComponent('','');
    public errorMsg = '';
    public emailFC = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
    public passFC = new FormControl('', [Validators.required, Validators.pattern(PASS_REGEX)]);
    constructor(
        private _service:UserService,
        private _route: ActivatedRoute,
        private _router: Router) {}

    login() {
        if(!this._service.login(this.user)) {
            this.errorMsg = 'Falla en la autentificación! Intente nuevamente...';
            // this._router.navigate(['/main']);
        }
        this._router.navigate(['/main']);
    }
}
