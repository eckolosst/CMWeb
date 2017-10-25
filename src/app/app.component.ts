import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router'
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
    public identity;

    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router
    ){}

    ngOnInit(){
        this.identity = this._userService.getIdentity();
    }

    ngDoCheck(){
        this.identity = this._userService.getIdentity();
    }

    logOut(){
        console.log(this.identity);
        localStorage.clear();
        this.identity = null;
        this._router.navigate(['/']);
    }
}
