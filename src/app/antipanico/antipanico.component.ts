import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { SimpleTimer} from 'ng2-simple-timer';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'antipanico',
  templateUrl: './antipanico.component.html',
  styleUrls: ['./antipanico.component.css'],
  providers: [SimpleTimer, UserService]
})
export class AntipanicoComponent {
  public lat;
  public lng;
  public mlat;
  public mlng;

  constructor(
    private st: SimpleTimer,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

    this._route.params.subscribe(params => {
      this.mlat = parseInt(params['lat']);
      this.mlng = parseInt(params['lng']);
      });
  }



}
