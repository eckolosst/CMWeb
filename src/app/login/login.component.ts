import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute} from '@angular/router';
import { FormControl, FormControlDirective, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;

@Component({
   selector: 'login',
   templateUrl: 'login.template.html',
   providers: [UserService]
})

export class LoginComponent {
    public user: User;
    public identity;
    public token;
    public status: String;
    public emailFC = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
    public passFC = new FormControl('', [Validators.required, Validators.pattern(PASS_REGEX)]);
    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router) {
            this.user = new User('','','','','',[]);
        }

    login() {
        //Logueo de usuario y obtencion del objeto
        this._userService.singup(this.user).subscribe(
            response => {
                this.identity = response;
                if(!this.identity || !this.identity._id){
                    console.log('El usuario no se ha logueado coorectamente: id incorrecto')
                }else{
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    //Obtencion del token
                    this._userService.singup(this.user, 'true').subscribe(
                        response => {
                            this.token = response.token;
                            if(this.token.length <= 0){console.log('El token no se ha generado');}
                            else{
                                localStorage.setItem('token',this.token);
                                this.status = 'succes';
                                this._router.navigate(['/main']);
                            }
                        },
                        error => {console.log(<any> error);}
                    );
                }
            },
            error => {
                var errorMsg = <any>error;
                if(errorMsg != null){
                    var body = JSON.parse(error._body);
                    this.status = 'error';
                }
            }
        );
    }

/*Solo para debug
    sinLogin(){
        localStorage.setItem('identity', JSON.stringify({"name":'BETO',"apellido":'',"email":'',"pass":''}) );
        this._router.navigate(['/main']);
    }*/
}
