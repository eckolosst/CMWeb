import { Injectable } from '@angular/core';
import { UserComponent } from "../user/user.component";
import { Router } from '@angular/router';

// Provisional, en un futuro iría en la BD
var users = [
  new UserComponent('admin','admin'),
  new UserComponent('admin1','admin1')
];

@Injectable()
export class UserService {

  constructor(private _router: Router) { }


/*---------------------------------------------------------------------------*/
/*                        Peticiones para Usuarios                           */
/*---------------------------------------------------------------------------*/

  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['/login']);
  }

  login(user) {
    let authenticatedUser = users.find(u => u.email === user.username);
    if (authenticatedUser && authenticatedUser.password === user.password){
      localStorage.setItem("user", authenticatedUser.email);
      this._router.navigate(['/home']);
      return true;
    }
    return false;
  }

  checkCredentials() {
    if (localStorage.getItem("user") === null){
      this._router.navigate(['/login']);
    }
  }
}
